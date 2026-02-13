import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MousePointer2, Image } from 'lucide-react';
import { DIARY_ENTRIES } from '../constants';
import { SectionProps } from '../types';

// Fix for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const DiarySection: React.FC<SectionProps> = ({ onNext, onPrev }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastEntry = currentIndex === DIARY_ENTRIES.length - 1;

  const nextEntry = (e: React.MouseEvent) => {
    // Prevent trigger if clicking navigation buttons
    if ((e.target as HTMLElement).closest('button')) return;
    
    if (currentIndex < DIARY_ENTRIES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const entry = DIARY_ENTRIES[currentIndex];

  return (
    <section 
      onClick={nextEntry}
      className={`h-full w-full relative flex flex-col items-center justify-center transition-colors duration-1000 overflow-hidden cursor-pointer ${entry.color}`}
    >
      {/* Decorative background number */}
      <div className="absolute -right-10 top-20 text-[20rem] font-serif-display text-black/5 pointer-events-none select-none leading-none">
        {currentIndex + 1}
      </div>

      {/* Navigation - Top (Always Visible) */}
      <MotionButton
        onClick={(e: React.MouseEvent) => { e.stopPropagation(); onPrev?.(); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
        className="absolute top-4 left-1/2 -translate-x-1/2 p-2 bg-white/40 hover:bg-white/80 rounded-full text-stone-500 backdrop-blur-sm cursor-pointer transition-all z-20 hover:scale-110 border border-white/50 shadow-sm"
      >
        <ChevronUp size={20} />
      </MotionButton>

      {/* Main Content */}
      <div className="w-full max-w-4xl px-6 relative z-10 pointer-events-none flex flex-col items-center">
        <AnimatePresence mode="wait">
            <MotionDiv
                key={currentIndex}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center text-center"
            >
                {/* Polaroid Frame */}
                <div 
                    className={`bg-white p-3 pb-10 md:p-4 md:pb-14 shadow-xl ${currentIndex % 2 === 0 ? '-rotate-2' : 'rotate-2'} mb-8 max-w-[260px] md:max-w-xs w-full transition-transform duration-700 hover:rotate-0`}
                >
                    <div className="aspect-[4/5] w-full bg-stone-200 overflow-hidden relative flex items-center justify-center text-stone-400">
                        {entry.image ? (
                            <img src={entry.image} alt={entry.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center">
                                <Image className="mb-2 opacity-50" size={32} />
                                <span className="text-[10px] uppercase tracking-widest opacity-50 font-medium">Add Photo</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-w-xl">
                    <motion.span 
                        className="inline-block text-stone-500 font-serif-display uppercase tracking-widest text-xs mb-3 border-b border-stone-300 pb-1"
                    >
                        {entry.date}
                    </motion.span>
                    
                    <h2 className="font-serif-display text-4xl md:text-5xl text-stone-800 mb-6 leading-tight">
                        {entry.title}
                    </h2>
                    
                    <p className="font-light text-lg text-stone-600 leading-relaxed italic">
                        "{entry.content}"
                    </p>
                </div>
            </MotionDiv>
        </AnimatePresence>
      </div>

      {/* Tap Hint (Only visible if not last entry) */}
      {!isLastEntry && (
        <MotionDiv 
            className="absolute bottom-12 flex flex-col items-center text-stone-400 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
        >
            <span className="text-xs uppercase tracking-widest mb-2">Tap to continue</span>
            <MousePointer2 size={16} className="animate-bounce" />
        </MotionDiv>
      )}

      {/* Navigation - Bottom (Only Visible on Last Entry) */}
      {isLastEntry && (
        <MotionButton
            onClick={(e: React.MouseEvent) => { 
                e.stopPropagation(); 
                if (onNext) onNext();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 5, 0] }}
            transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 bg-white/40 hover:bg-white/80 rounded-full text-rose-500 backdrop-blur-sm cursor-pointer transition-all z-50 hover:scale-110 border border-white/50 shadow-sm"
        >
            <ChevronDown size={24} />
        </MotionButton>
      )}
    </section>
  );
};

export default DiarySection;