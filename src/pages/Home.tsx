import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-mono font-black text-2xl uppercase tracking-tighter">GAMES</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
          
          {/* Skeleton cards for variety */}
          {[1,2].map(i => (
            <div key={i} className="brutalist-card bg-neutral-100 border-neutral-200 shadow-none border-dashed p-4 flex flex-col items-center justify-center opacity-40 grayscale h-[380px]">
               <div className="w-12 h-12 bg-neutral-300 mb-4 animate-pulse" />
               <div className="w-24 h-4 bg-neutral-300 mb-2 animate-pulse" />
               <div className="w-32 h-3 bg-neutral-300 animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-32 pt-16 border-t-2 border-black/5 flex flex-col md:flex-row items-center justify-between gap-8 pb-12 opacity-50">
        <div className="font-mono text-[10px] font-bold uppercase tracking-widest">
          &copy; 2024 Classroom
        </div>
        <div className="flex gap-8">
           <a href="#" className="font-mono text-[10px] font-bold uppercase hover:text-black">Privacy_Protocol</a>
           <a href="#" className="font-mono text-[10px] font-bold uppercase hover:text-black">Terms_Of_Service</a>
           <a href="#" className="font-mono text-[10px] font-bold uppercase hover:text-black">Contact_Admin</a>
        </div>
      </footer>
    </div>
  );
}
