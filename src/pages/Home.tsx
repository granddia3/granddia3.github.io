import Header from '../components/Header';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h3>Alt Links:</h3>
          <a href="granddia3.github.io">Alt Link 1</a>
         <p><a href="granddia3.github.io/alt-link1">Alt Link 2</a></p>
          <p><h2 className="font-mono font-black text-2xl uppercase tracking-tighter">GAMES</h2></p>
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
    </div>
  );
}
