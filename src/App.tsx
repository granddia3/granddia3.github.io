import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import GamePlayer from './components/GamePlayer';
import AIChat from './components/AIChat';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-[#00FF00] selection:text-black">
        <Header />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Home />
                </motion.div>
              } />
              <Route path="/play/:id" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <GamePlayer />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <AIChat />
      </div>
    </Router>
  );
}
