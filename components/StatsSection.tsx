import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Clock, Heart } from 'lucide-react';
import { DATES } from '../constants';
import { DateMetrics, SectionProps } from '../types';

// Fix for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const StatsSection: React.FC<SectionProps> = ({ onNext }) => {
  const [metrics, setMetrics] = useState<DateMetrics>({
    daysSinceMet: 0,
    daysTogether: 0,
    daysSinceLastMet: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const oneDay = 1000 * 60 * 60 * 24;

      setMetrics({
        daysSinceMet: Math.floor((now - DATES.firstMet.getTime()) / oneDay),
        daysTogether: Math.floor((now - DATES.together.getTime()) / oneDay),
        daysSinceLastMet: Math.floor((now - DATES.lastMet.getTime()) / oneDay),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000 * 60); 
    return () => clearInterval(timer);
  }, []);

  const Card = ({ title, days, icon: Icon, delay }: { title: string; days: number; icon: any; delay: number }) => (
    <MotionDiv 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white/60 backdrop-blur-sm p-5 md:p-8 rounded-3xl shadow-xl border border-white/50 flex flex-col items-center justify-center text-center group hover:bg-white/80 transition-all duration-300"
    >
      <div className="mb-4 p-3 bg-rose-100 rounded-full text-rose-500 group-hover:scale-110 transition-transform">
        <Icon size={20} />
      </div>
      <h3 className="text-rose-900/70 font-serif-display text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2">{title}</h3>
      <div className="font-handwriting text-4xl md:text-6xl text-rose-600">
        {days} <span className="text-xl text-rose-400">days</span>
      </div>
    </MotionDiv>
  );

  return (
    <section className="h-full w-full relative flex flex-col items-center justify-center bg-gradient-to-b from-[#fff0f3] to-[#ffe5ec] p-6 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto z-10 flex flex-col items-center">
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-cursive text-5xl md:text-7xl text-rose-600 mb-4">Our Journey</h2>
          <div className="h-0.5 w-16 bg-rose-300 mx-auto rounded-full"></div>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          <Card 
            title="Since We First Met" 
            days={metrics.daysSinceMet} 
            icon={Calendar}
            delay={0.2} 
          />
          <Card 
            title="Been Together" 
            days={metrics.daysTogether} 
            icon={Heart}
            delay={0.4} 
          />
          <Card 
            title="Since We Last Met" 
            days={metrics.daysSinceLastMet} 
            icon={Clock}
            delay={0.6} 
          />
        </div>
      </div>

      {/* Navigation - Bottom Only */}
      <MotionButton
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 bg-white/40 hover:bg-white/80 rounded-full text-rose-400 backdrop-blur-sm cursor-pointer transition-all z-20 hover:scale-110 border border-white/50 shadow-sm"
      >
        <ChevronDown size={24} />
      </MotionButton>
    </section>
  );
};

export default StatsSection;