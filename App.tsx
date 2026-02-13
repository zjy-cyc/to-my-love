import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LockScreen from './components/LockScreen';
import StatsSection from './components/StatsSection';
import LetterSection from './components/LetterSection';
import DiarySection from './components/DiarySection';
import CountdownSection from './components/CountdownSection';
import MapSection from './components/MapSection';
import IntroSequence from './components/IntroSequence';

// Fix for TypeScript errors with framer-motion props
const MotionDiv = motion.div as any;
const MotionMain = motion.main as any;

enum ViewState {
  LOCKED,
  INTRO,
  MAIN
}

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LOCKED);
  const [currentSection, setCurrentSection] = useState(0);

  const handleUnlock = () => {
    setViewState(ViewState.INTRO);
  };

  const handleIntroComplete = () => {
    setViewState(ViewState.MAIN);
  };

  const handleNext = () => {
    // Increased max section to 4 because we added CountdownSection
    setCurrentSection((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="h-full w-full overflow-hidden bg-stone-50">
      <AnimatePresence mode="wait">
        {viewState === ViewState.LOCKED && (
          <MotionDiv
            key="lock"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full"
          >
            <LockScreen onUnlock={handleUnlock} />
          </MotionDiv>
        )}

        {viewState === ViewState.INTRO && (
          <MotionDiv
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full"
          >
            <IntroSequence onComplete={handleIntroComplete} />
          </MotionDiv>
        )}

        {viewState === ViewState.MAIN && (
          <MotionMain 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-screen w-full overflow-hidden relative"
          >
            <div 
              className="h-full w-full transition-transform duration-1000 cubic-bezier(0.65, 0, 0.35, 1)"
              style={{ transform: `translateY(-${currentSection * 100}%)` }}
            >
              {/* Section 1: Stats */}
              <div className="h-full w-full relative">
                <StatsSection onNext={handleNext} />
              </div>
              
              {/* Section 2: Letter */}
              <div className="h-full w-full relative">
                <LetterSection onNext={handleNext} onPrev={handlePrev} />
              </div>

              {/* Section 3: Travel Diary */}
              <div className="h-full w-full relative">
                <DiarySection onNext={handleNext} onPrev={handlePrev} />
              </div>

              {/* Section 4: Countdown (New) */}
              <div className="h-full w-full relative">
                <CountdownSection onNext={handleNext} onPrev={handlePrev} />
              </div>

              {/* Section 5: Map */}
              <div className="h-full w-full relative">
                <MapSection onPrev={handlePrev} />
              </div>
            </div>
          </MotionMain>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;