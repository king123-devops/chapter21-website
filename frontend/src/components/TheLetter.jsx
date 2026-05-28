import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TheLetter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const letterText = `My dearest,

As you step into this beautiful new chapter of your life,
I want you to know how incredibly proud I am of the person you've become.

Every laugh, every tear, and every moment we've shared over these past years
has only made me realize how profoundly lucky I am to have you by my side.

You are a rare kind of magic.

The way you care, the way you love, the way you light up any room—
it makes the world a much better place just because you're in it.

As you turn 21, I promise to be here for every new adventure,
every late-night conversation, and every dream you choose to chase.

This is your year. The world is yours.

I love you, more than words could ever possibly express.`;

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isInView) return;
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      setDisplayedText(letterText.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex >= letterText.length) {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, 45); 

    return () => clearInterval(intervalId);
  }, [isInView, letterText]);

  return (
    <div className="w-full flex justify-center py-10 md:py-20" ref={ref}>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        // Mobile 95% width, maxes out at 3xl on desktop
        className="w-[95%] md:w-full md:max-w-3xl bg-white/70 backdrop-blur-3xl p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-white shadow-[0_20px_60px_rgba(190,18,60,0.1)] relative overflow-hidden transition-colors duration-700"
      >
        {/* Subtle, elegant double inner border for premium stationery feel */}
        <div className="absolute inset-3 md:inset-5 border border-primary/20 rounded-[1.5rem] md:rounded-[2.5rem] pointer-events-none"></div>
        <div className="absolute inset-4 md:inset-6 border border-primary/10 rounded-[1.2rem] md:rounded-[2.2rem] pointer-events-none"></div>

        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-rose-200/50 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-pink-200/50 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="text-secondary font-light text-lg md:text-2xl leading-relaxed italic whitespace-pre-wrap font-sans">
            {displayedText}
            <span className="inline-block w-[2px] h-[1em] bg-primary/70 ml-1 animate-pulse align-middle translate-y-[2px]"></span>
          </div>

          {!isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="mt-16 md:mt-20 pt-8 md:pt-10 text-center border-t border-primary/10 relative"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans text-primary animate-pulse-slow drop-shadow-sm leading-tight">
                Happy Birthday,<br className="block md:hidden" /> My Love.
              </h2>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
