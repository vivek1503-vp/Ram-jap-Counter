/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower2, X, RotateCcw, Info } from 'lucide-react';

// Constants
const BEADS_COUNT = 108;
const SAFFRON = '#FF9933';
const RUDRAKSH_COLOR = '#8B4513';

export default function App() {
  const [showCounter, setShowCounter] = useState(false);
  const [count, setCount] = useState(0);
  const [malaCount, setMalaCount] = useState(0);
  const [isVibrating, setIsVibrating] = useState(false);

  // Calculate bead positions once
  const beadPositions = useMemo(() => {
    const positions = [];
    const radius = 140; // Radius of the circle
    const centerX = 150;
    const centerY = 150;

    for (let i = 0; i < BEADS_COUNT; i++) {
      const angle = (i / BEADS_COUNT) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      positions.push({ x, y });
    }
    return positions;
  }, []);

  const handleIncrement = () => {
    if (count + 1 >= BEADS_COUNT) {
      setCount(0);
      setMalaCount(prev => prev + 1);
    } else {
      setCount(prev => prev + 1);
    }
    
    // Simple haptic feedback simulation
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 100);
  };

  const resetCounter = () => {
    if (window.confirm('Are you sure you want to reset the counts?')) {
      setCount(0);
      setMalaCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-bhagva font-serif text-white overflow-hidden flex flex-col items-center justify-between py-10">
      {/* Ornaments */}
      <div className="fixed top-1/2 left-10 -translate-y-1/2 text-[120px] opacity-10 pointer-events-none select-none">ॐ</div>
      <div className="fixed top-1/2 right-10 -translate-y-1/2 text-[120px] opacity-10 pointer-events-none select-none">ॐ</div>

      <AnimatePresence mode="wait">
        {!showCounter ? (
          /* Landing Page */
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl px-6 text-center"
            id="landing-page"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-12"
            >
              <h1 className="text-6xl font-bold mb-4 tracking-[4px] uppercase drop-shadow-lg">श्री राम जय राम</h1>
              <p className="text-xl opacity-90 italic tracking-[2px]">Universal Chant Counter</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCounter(true)}
              className="bg-white text-bhagva px-12 py-5 rounded-full text-2xl font-bold shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:bg-orange-50 transition-all flex items-center gap-3"
              id="start-counting-btn"
            >
              Ram Ram Counting
            </motion.button>
          </motion.div>
        ) : (
          /* Counter Interface */
          <motion.div
            key="counter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-between flex-1 w-full py-4"
            id="counter-overlay"
          >
            {/* Header */}
            <div className="text-center w-full px-6">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setShowCounter(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  id="close-btn"
                >
                  <X size={28} />
                </button>
                <h1 className="text-4xl font-bold tracking-[4px] uppercase">श्री राम जय राम</h1>
                <button
                  onClick={resetCounter}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  id="reset-btn"
                >
                  <RotateCcw size={24} />
                </button>
              </div>
              <p className="text-sm opacity-90 italic tracking-[2px]">Universal Chant Counter</p>
            </div>

            {/* Stats Display */}
            <div className="text-center z-10">
              <motion.div
                key={count}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-[110px] font-bold leading-none mb-2"
                id="current-count"
              >
                {count}
              </motion.div>
              
              <div className="text-2xl bg-white/20 px-6 py-2 rounded-full border border-white inline-block mb-8">
                <span id="mala-count">
                  Mala Count: {malaCount.toString().padStart(2, '0')}
                </span>
              </div>

              {/* Interaction Area */}
              <div className="relative w-[480px] h-[480px] flex items-center justify-center mx-auto">
                {/* Rudraksh Mala Ring */}
                <div className="absolute inset-0 rounded-full border-[12px] border-dotted border-rudraksh shadow-[inset_0_0_20px_rgba(0,0,0,0.1),0_0_15px_rgba(0,0,0,0.1)] animate-rotate-slow" />
                
                {/* Gold Accent Ring */}
                <div className="absolute -inset-2 rounded-full border-2 border-gold opacity-30" />

                {/* Main Counting Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  animate={isVibrating ? { x: [0, -2, 2, -2, 2, 0] } : {}}
                  onClick={handleIncrement}
                  className="w-[280px] h-[280px] bg-[radial-gradient(circle_at_30%_30%,#FF4444,var(--color-crimson))] border-[12px] border-white rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.3),inset_0_-10px_20px_rgba(0,0,0,0.2)] flex items-center justify-center text-white z-10 transition-transform active:scale-95"
                  id="count-trigger-btn"
                >
                  <span className="text-5xl font-black tracking-widest drop-shadow-md">RAM</span>
                </motion.button>

                {/* Visual Beads (SVG Overlay) */}
                <svg width="480" height="480" className="absolute inset-0 pointer-events-none z-20">
                  {beadPositions.map((pos, i) => {
                    // Scale positions from 300x300 to 480x480
                    const scale = 480 / 300;
                    const x = pos.x * scale;
                    const y = pos.y * scale;
                    return (
                      <motion.circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={i <= count ? 6 : 4}
                        fill={i <= count ? '#8B4513' : '#FFFFFF'}
                        initial={false}
                        animate={{
                          scale: i === count ? 1.8 : 1,
                          opacity: i <= count ? 1 : 0.3
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Footer Nav */}
            <div className="w-full flex justify-around px-24 mt-8">
              <div className="text-sm uppercase tracking-[2px] font-bold opacity-80 border-b-2 border-transparent pb-1 cursor-pointer hover:opacity-100">Home</div>
              <div className="text-sm uppercase tracking-[2px] font-bold opacity-100 border-b-2 border-white pb-1 cursor-pointer">Ram Ram Counting</div>
              <div className="text-sm uppercase tracking-[2px] font-bold opacity-80 border-b-2 border-transparent pb-1 cursor-pointer hover:opacity-100">History</div>
              <div className="text-sm uppercase tracking-[2px] font-bold opacity-80 border-b-2 border-transparent pb-1 cursor-pointer hover:opacity-100">Settings</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
