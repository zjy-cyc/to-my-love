import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Heart, Sparkles, Star } from 'lucide-react';
import { LETTER_CONTENT } from '../constants';
import { SectionProps } from '../types';

// Fix for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const LetterSection: React.FC<SectionProps> = ({ onNext, onPrev }) => {
  return (
    <section className="h-full w-full relative flex flex-col items-center justify-center bg-rose-50 overflow-hidden">
      {/* Background Ambience - Full Screen Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/60 via-pink-50 to-orange-50/40 pointer-events-none" />
      
      {/* Background Decor - Scribbles & Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        {/* Large Circle Scribble Top Left */}
        <svg className="absolute -top-20 -left-20 w-96 h-96 text-rose-200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 100C40 100 20 160 80 170C140 180 180 130 160 70C140 10 70 30 50 80C30 130 90 190 150 160" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="10 10" />
        </svg>

        {/* Squiggly Lines Right Side */}
        <svg className="absolute top-1/3 -right-20 w-64 h-64 text-orange-200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 Q 25 25 40 50 T 70 50 T 100 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 70 Q 25 45 40 70 T 70 70 T 100 70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Heart Scribble Bottom Left */}
        <svg className="absolute -bottom-10 left-10 w-64 h-64 text-rose-300/50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 80 Q 10 50 20 30 Q 30 10 50 30 Q 70 10 80 30 Q 90 50 50 80 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Floating Stars/Sparkles */}
        {[...Array(8)].map((_, i) => (
           <MotionDiv
             key={i}
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8], rotate: [0, 90, 0] }}
             transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
             className="absolute text-yellow-500/30"
             style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
           >
             <Star size={16 + Math.random() * 24} fill="currentColor" />
           </MotionDiv>
        ))}
      </div>

      {/* Navigation - Top */}
      <MotionButton
        onClick={onPrev}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
        className="absolute top-6 left-1/2 -translate-x-1/2 p-2 text-rose-400 hover:text-rose-600 cursor-pointer z-30 hover:scale-110 transition-transform"
      >
        <ChevronUp size={32} />
      </MotionButton>

      {/* Main Content Area - Full Screen Text */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-10 overflow-hidden">
        <MotionDiv 
            className="w-full max-w-4xl max-h-full overflow-y-auto no-scrollbar flex flex-col items-center text-center py-10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            {/* Decorative Heart Top */}
            <div className="mb-6">
                <Heart className="text-rose-500 fill-rose-500/20" size={40} strokeWidth={1.5} />
            </div>

            <div className="prose prose-xl md:prose-2xl max-w-none px-4">
                <p className="font-handwriting text-3xl md:text-5xl leading-[1.6] md:leading-[1.8] text-rose-900 drop-shadow-sm whitespace-pre-line font-medium">
                    {LETTER_CONTENT}
                </p>
            </div>
            
            {/* Bottom Signature Decoration */}
            <div className="mt-12 flex items-center justify-center gap-3 opacity-60">
                <div className="h-px w-12 bg-rose-400"></div>
                <Sparkles size={16} className="text-rose-500" />
                <div className="h-px w-12 bg-rose-400"></div>
            </div>
        </MotionDiv>
      </div>

      {/* Navigation - Bottom */}
      <MotionButton
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-rose-400 hover:text-rose-600 cursor-pointer z-30 hover:scale-110 transition-transform"
      >
        <ChevronDown size={32} />
      </MotionButton>
    </section>
  );
};

export default LetterSection;