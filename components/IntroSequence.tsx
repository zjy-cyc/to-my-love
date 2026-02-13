import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudRain, Heart, Mail, Sparkles } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

type ThemeType = 'warm' | 'sad' | 'love';

// Fix for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;

const slides: { text: string; theme: ThemeType; duration: number }[] = [
  {
    text: "你好宝宝",
    theme: "warm",
    duration: 3500
  },
  {
    text: "很遗憾我们不能一起过情人节",
    theme: "sad",
    duration: 4000
  },
  {
    text: "但我准备了一份小礼物，一封我亲手写的信",
    theme: "love",
    duration: 4500
  }
];

// --- Background Components ---

const WarmBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-amber-100 to-orange-50 overflow-hidden">
    <MotionDiv 
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className="absolute -top-32 -right-32 text-orange-400/20"
    >
      <Sun size={400} />
    </MotionDiv>
    {[...Array(6)].map((_, i) => (
      <MotionDiv
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], y: -50 }}
        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        className="absolute"
        style={{ left: `${15 + i * 15}%`, top: `${30 + (i % 3) * 20}%` }}
      >
        <Sparkles className="text-amber-500/40" size={24} />
      </MotionDiv>
    ))}
  </div>
);

const SadBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-stone-400 to-stone-600 overflow-hidden">
    {/* Rain Drops */}
    {[...Array(20)].map((_, i) => (
      <MotionDiv
        key={i}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: '110vh', opacity: [0, 0.4, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
        className="absolute w-0.5 bg-stone-300/30 rounded-full"
        style={{ 
            left: `${Math.random() * 100}%`, 
            height: `${Math.random() * 20 + 10}px` 
        }}
      />
    ))}
    <div className="absolute top-10 left-10 text-stone-300/20">
      <CloudRain size={120} />
    </div>
  </div>
);

const LoveBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-tr from-rose-300 via-pink-200 to-rose-100 overflow-hidden">
    {[...Array(10)].map((_, i) => (
      <MotionDiv
        key={i}
        initial={{ y: '100vh', opacity: 0, scale: 0.5 }}
        animate={{ y: '-10vh', opacity: [0, 0.6, 0], scale: 1.2, x: Math.sin(i) * 50 }}
        transition={{ duration: 5, repeat: Infinity, delay: i * 0.4 }}
        className="absolute text-rose-500/20"
        style={{ left: `${Math.random() * 100}%` }}
      >
        <Heart fill="currentColor" size={30 + Math.random() * 40} />
      </MotionDiv>
    ))}
  </div>
);

// --- Main Component ---

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < slides.length - 1) {
        setIndex(index + 1);
      } else {
        onComplete();
      }
    }, slides[index].duration);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  const currentSlide = slides[index];

  return (
    <div className="h-full w-full relative overflow-hidden flex items-center justify-center">
      {/* Background Layer */}
      <AnimatePresence mode="wait">
        <MotionDiv
          key={`bg-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          {currentSlide.theme === 'warm' && <WarmBackground />}
          {currentSlide.theme === 'sad' && <SadBackground />}
          {currentSlide.theme === 'love' && <LoveBackground />}
        </MotionDiv>
      </AnimatePresence>

      {/* Content Layer */}
      <AnimatePresence mode="wait">
        <MotionDiv
          key={`text-${index}`}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-xl px-8 text-center"
        >
          {currentSlide.theme === 'warm' && (
            <h1 className="text-4xl md:text-6xl font-serif-display font-bold text-orange-900/80 drop-shadow-sm">
              {currentSlide.text}
            </h1>
          )}
          
          {currentSlide.theme === 'sad' && (
            <h1 className="text-2xl md:text-4xl font-sans font-light text-stone-100 tracking-wider leading-relaxed">
              {currentSlide.text}
            </h1>
          )}

          {currentSlide.theme === 'love' && (
            <div className="flex flex-col items-center">
              <MotionDiv
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mb-8 bg-white/90 p-5 rounded-full shadow-xl text-rose-500 backdrop-blur-sm"
              >
                <Mail size={48} className="fill-rose-100" />
              </MotionDiv>
              <h1 className="text-3xl md:text-5xl font-handwriting font-bold text-rose-800 drop-shadow-sm leading-relaxed">
                {currentSlide.text}
              </h1>
            </div>
          )}
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};

export default IntroSequence;