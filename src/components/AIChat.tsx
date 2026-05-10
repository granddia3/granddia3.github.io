import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MinusCircle, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ai, ACADEMIC_SYSTEM_PROMPT } from '../services/gemini';

interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Yo! I\'m the Academic Analyst. I can solve homework from text or images. Hit me with your math, science, or history questions.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const fileToPart = async (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve({
          inlineData: {
            data: base64,
            mimeType: file.type
          }
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage = input.trim();
    const currentImage = selectedImage;
    const currentPreview = imagePreview;

    setInput('');
    setSelectedImage(null);
    setImagePreview(null);
    
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMessage || (currentImage ? '[Analysis Request]' : ''), 
      image: currentPreview || undefined 
    }]);
    setIsLoading(true);

    try {
      const parts: any[] = [];
      if (currentImage) {
        const imagePart = await fileToPart(currentImage);
        parts.push(imagePart);
      }
      if (userMessage) {
        parts.push({ text: userMessage });
      }

      // Manual history management
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [
          ...history,
          { role: 'user', parts }
        ],
        config: {
          systemInstruction: ACADEMIC_SYSTEM_PROMPT,
          temperature: 0.2,
        }
      });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'My brain glitched. Try again?' }]);
    } catch (error: any) {
      console.error('AI Error:', error);
      let errorMsg = 'Connection lost. I might be blocked by the firewall or rate-limited.';
      
      if (error?.message?.includes('API key')) {
        errorMsg = 'AI Configuration Error: Invalid or missing API key.';
      } else if (error?.status === 429) {
        errorMsg = 'Rate limit reached. Please wait a moment.';
      }

      setMessages(prev => [...prev, { role: 'model', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col"
          >
            {/* Header */}
            <div className="bg-black text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#00FF00]" />
                <span className="font-mono font-black uppercase text-sm tracking-tighter">AI_ASSISTANT v1.0</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-[#00FF00] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow p-4 overflow-y-auto space-y-4 font-mono text-sm hide-scrollbar"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 border-2 border-black space-y-2 ${
                      m.role === 'user' 
                        ? 'bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                        : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    {m.image && (
                      <img src={m.image} alt="User upload" className="w-full h-auto border-2 border-black" />
                    )}
                    {m.text && (
                      <div className="prose prose-sm prose-neutral max-w-none prose-p:leading-relaxed prose-pre:bg-black prose-pre:text-white prose-pre:p-2 prose-pre:border-2 prose-pre:border-black prose-code:text-pink-600 prose-code:bg-neutral-100 prose-code:px-1 prose-code:rounded">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="px-3 py-2 bg-neutral-50 border-t-2 border-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={imagePreview} className="w-10 h-10 object-cover border border-black" alt="Preview" />
                  <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-tight">Ready to analyze...</span>
                </div>
                <button onClick={() => { setSelectedImage(null); setImagePreview(null); }} className="p-1 hover:bg-neutral-200">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t-2 border-black flex gap-2">
              <input 
                type="file" 
                accept="image/*" 
                hidden 
                ref={fileInputRef} 
                onChange={handleImageChange}
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white border-2 border-black p-2 hover:bg-neutral-100 transition-colors"
                title="Add Homework Image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPaste={(e) => {
                  const items = e.clipboardData.items;
                  for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                      const file = items[i].getAsFile();
                      if (file) {
                        setSelectedImage(file);
                        const reader = new FileReader();
                        reader.onloadend = () => setImagePreview(reader.result as string);
                        reader.readAsDataURL(file);
                        break;
                      }
                    }
                  }
                }}
                placeholder="Ask for help..."
                className="flex-grow bg-neutral-100 border-2 border-black p-2 font-mono text-sm focus:outline-none focus:bg-white"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-[#00FF00] border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white p-4 rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-white flex items-center justify-center relative group"
      >
        {isOpen ? <MinusCircle /> : <MessageCircle className="group-hover:text-[#00FF00]" />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-[#00FF00] text-black text-[10px] font-black px-1 border-2 border-black">
            AI
          </span>
        )}
      </motion.button>
    </div>
  );
}
