import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, CalendarHeart } from 'lucide-react';
import { DATES } from '../constants';
import { SectionProps } from '../types';

// Fix for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const CountdownSection: React.FC<SectionProps> = ({ onNext, onPrev }) => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +DATES.nextMeeting - +new Date();
      if (difference > 0) {
        // Use ceil to round up partial days (e.g. if it's tomorrow, show 1 or 2 depending on hour, usually ceil is best for 'days until')
        setDaysLeft(Math.ceil(difference / (1000 * 60 * 60 * 24)));
      } else {
        setDaysLeft(0);
      }
    };

    calculateTimeLeft();
    // Update less frequently (every hour) since we only show days
    const timer = setInterval(calculateTimeLeft, 1000 * 60 * 60); 

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-full w-full relative flex flex-col items-center justify-center bg-[#fff0f5] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-rose-300/20 rounded-full blur-3xl"></div>
          <svg className="absolute top-20 left-10 w-32 h-32 text-rose-300/10" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 90 Q10 50 20 30 Q30 10 50 30 Q70 10 80 30 Q90 50 50 90" />
          </svg>
      </div>

      {/* Navigation - Top */}
      <MotionButton
        onClick={onPrev}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{ delay: 0.5, duration: 2, repeat: Infinity }}
        className="absolute top-6 left-1/2 -translate-x-1/2 p-2 text-rose-300 hover:text-rose-500 cursor-pointer z-30 transition-transform hover:scale-110"
      >
        <ChevronUp size={28} />
      </MotionButton>

      <div className="z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-lg">
        
        <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/50 border border-rose-200 text-rose-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                <CalendarHeart size={14} />
                <span>Countdown</span>
            </div>
            
            <h2 className="font-serif-display text-4xl md:text-5xl text-rose-900/80 mb-2">Until I hold you again</h2>
            <p className="text-rose-400 font-medium tracking-wide">February 20, 2026</p>
        </MotionDiv>

        {/* Big Number Display */}
        <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative py-4"
        >
            <div className="text-[10rem] md:text-[14rem] leading-none font-handwriting text-rose-500 drop-shadow-sm font-bold select-none">
                {daysLeft}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-6 md:-mt-10">
                <span className="text-xl md:text-3xl font-serif-display italic text-rose-400 bg-[#fff0f5] px-6 py-1 rounded-full whitespace-nowrap">days left</span>
            </div>
        </MotionDiv>

        <MotionDiv 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 md:mt-24"
        >
            <p className="text-rose-800/60 font-serif-display italic leading-relaxed text-lg px-6">
                "Our next adventure."
            </p>
        </MotionDiv>

      </div>

      {/* Navigation - Bottom */}
      <MotionButton
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-rose-300 hover:text-rose-500 cursor-pointer z-30 transition-transform hover:scale-110"
      >
        <ChevronDown size={28} />
      </MotionButton>
    </section>
  );
};

export default CountdownSection;