import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock } from 'lucide-react';
import { PASSCODE } from '../constants';

// Fix for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSCODE) {
      onUnlock();
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff0f3] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-rose-200 animate-pulse">
           <Heart size={64} fill="currentColor" />
        </div>
        <div className="absolute bottom-20 right-20 text-rose-100 animate-bounce">
           <Heart size={96} fill="currentColor" />
        </div>
        <div className="absolute top-1/2 left-1/3 text-rose-50">
           <Heart size={128} fill="currentColor" />
        </div>
      </div>

      <MotionDiv 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center p-8 max-w-md w-full"
      >
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-white rounded-full shadow-lg text-rose-400">
            <Lock size={32} />
          </div>
        </div>

        <h1 className="font-cursive text-6xl md:text-7xl text-rose-500 mb-2">To my love</h1>
        <p className="font-serif-display text-rose-800/60 mb-8 italic">A little corner of the internet, just for you.</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <div className="relative">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter passcode"
              className={`
                px-6 py-3 rounded-full text-center text-lg tracking-widest outline-none transition-all duration-300 shadow-sm
                ${error ? 'bg-red-50 border-2 border-red-300 text-red-500 placeholder-red-300' : 'bg-white/80 border-2 border-white focus:border-rose-300 text-rose-900 placeholder-rose-300'}
              `}
              maxLength={6}
            />
          </div>
          
          <button 
            type="submit"
            className="px-8 py-2 bg-rose-400 hover:bg-rose-500 text-white rounded-full font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Open Letter
          </button>
        </form>
      </MotionDiv>
    </div>
  );
};

export default LockScreen;