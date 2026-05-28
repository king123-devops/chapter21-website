import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Countdown() {
  const navigate = useNavigate();
  
  const [targetDate] = useState(() => {
    return new Date('2026-06-08T00:00:00').getTime(); 
  });
  
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        if (!isUnlocked) {
          setIsUnlocked(true);
          setTimeout(() => setIsFadingOut(true), 6000);
          setTimeout(() => navigate('/experience'), 8000);
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());
    if (!isUnlocked) {
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
      return () => clearInterval(timer);
    }
  }, [targetDate, isUnlocked, navigate]);

  const padZero = (num) => String(num).padStart(2, '0');

  const floatingElements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 90 + 5}%`,
    left: `${Math.random() * 90 + 5}%`,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 5,
    type: Math.random() > 0.5 ? '✦' : '♥'
  }));

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          key="countdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          // Background classes removed so the global BokehBackground shines through
          className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative transparent"
        >
          {floatingElements.map(el => (
            <motion.div
              key={el.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.1, 0.4, 0.1], y: [-10, 10, -10] }}
              transition={{ duration: 6 + el.delay, repeat: Infinity, delay: el.delay }}
              className="absolute pointer-events-none text-primary/20 select-none drop-shadow-sm"
              style={{ top: el.top, left: el.left, fontSize: `${el.size}rem` }}
            >
              {el.type}
            </motion.div>
          ))}

          <div className="z-30 flex flex-col items-center max-w-4xl w-full relative">
            {isUnlocked ? (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="text-center px-4"
              >
                <div className="mb-10 flex justify-center">
                  <span className="text-5xl md:text-6xl text-primary/80 animate-pulse">✨</span>
                </div>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-sans text-primary mb-8 drop-shadow-md leading-tight">
                  Happy 21st <br /> Birthday
                </h1>
                <p className="text-2xl md:text-5xl text-secondary font-sans italic font-light drop-shadow-sm mt-6">
                  Welcome to the world, my love.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center"
              >
                {/* Seamlessly Blended Image using CSS Mask */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="mb-14 relative"
                >
                  <img 
                    src="/parents.png" 
                    alt="Birthday Illustration" 
                    className="w-80 h-80 object-cover mx-auto opacity-80 mix-blend-darken"
                    style={{ 
                      WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)',
                      maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)' 
                    }} 
                  />
                </motion.div>

                {/* Timer - Fully mobile responsive sizing */}
                <div className="flex justify-center items-start gap-3 md:gap-10 text-4xl md:text-8xl font-sans font-light text-primary drop-shadow-sm">
                  <div className="flex flex-col items-center">
                    <span>{padZero(timeLeft.days)}</span>
                    <span className="text-[0.65rem] md:text-sm tracking-[0.4em] mt-4 md:mt-6 uppercase text-primary/70 font-medium">Days</span>
                  </div>
                  <span className="opacity-30 animate-pulse-slow mt-1 md:mt-4">:</span>
                  <div className="flex flex-col items-center">
                    <span>{padZero(timeLeft.hours)}</span>
                    <span className="text-[0.65rem] md:text-sm tracking-[0.4em] mt-4 md:mt-6 uppercase text-primary/70 font-medium">Hrs</span>
                  </div>
                  <span className="opacity-30 animate-pulse-slow mt-1 md:mt-4">:</span>
                  <div className="flex flex-col items-center">
                    <span>{padZero(timeLeft.minutes)}</span>
                    <span className="text-[0.65rem] md:text-sm tracking-[0.4em] mt-4 md:mt-6 uppercase text-primary/70 font-medium">Mins</span>
                  </div>
                  <span className="opacity-30 animate-pulse-slow mt-1 md:mt-4">:</span>
                  <div className="flex flex-col items-center">
                    <span>{padZero(timeLeft.seconds)}</span>
                    <span className="text-[0.65rem] md:text-sm tracking-[0.4em] mt-4 md:mt-6 uppercase text-primary/70 font-medium">Secs</span>
                  </div>
                </div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 2 }}
                  className="mt-12 md:mt-16 text-lg md:text-3xl text-secondary font-sans italic tracking-wide text-center px-4"
                >
                  Counting down to the moment the world got a little brighter.
                </motion.p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
