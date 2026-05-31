import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAudioTrack } from './GlobalAudioPlayer';

export default function StarConstellation() {
  useAudioTrack('/perfect.mp3', 0, true);

  const [reasons, setReasons] = useState([]);
  const [selectedReasonIndex, setSelectedReasonIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded reasons
  const hardcodedReasons = [
    "The way your laugh is instantly contagious.",
    "How you completely change the energy of a room just by walking into it.",
    "Your elite, unmatched sense of humor.",
    "The fact that you are effortlessly gorgeous, even when you aren't trying.",
    "Your specific taste in music (and how you playfully judge mine).",
    "The way your eyes light up when you talk about something you're passionate about.",
    "How the last 28 days have easily been the highlight of my year.",
    "Your absolute 10/10 aesthetic and the way you carry yourself.",
    "The little expressions you make when you are thinking or confused.",
    "The genuine kindness you show to the people around you.",
    "The way you can go from completely chill to chaotic in two seconds.",
    "How ridiculously easy it is to talk to you for hours without getting bored.",
    "Your incredibly strong (and sometimes questionable) opinions on random food combinations.",
    "The fact that you don't even fully realize how amazing you actually are.",
    "How seeing a notification with your name on my phone instantly makes me smile.",
    "Your intelligence and the unique way your mind works.",
    "The way you make everyone around you feel comfortable and seen.",
    "Your smile. (It honestly deserves its own category).",
    "How you handle life with such grace, even when things get stressful.",
    "The fact that out of everyone in the world, the universe decided our paths should cross on May 11th.",
    "Because there is literally no one else like you. Happy 21st Birthday."
  ].map((msg, i) => ({ id: i, message: msg }));

  useEffect(() => {
    setReasons(hardcodedReasons);
    setLoading(false);
  }, []);

  // 21 perfectly spaced, massive shining stars
  const starPositions = useMemo(() => {
    return [
      { top: '15%', left: '15%' }, { top: '12%', left: '45%' }, { top: '18%', left: '80%' },
      { top: '28%', left: '8%' },  { top: '32%', left: '35%' }, { top: '25%', left: '60%' }, { top: '30%', left: '90%' },
      { top: '45%', left: '20%' }, { top: '50%', left: '50%' }, { top: '42%', left: '75%' },
      { top: '65%', left: '12%' }, { top: '68%', left: '40%' }, { top: '60%', left: '68%' }, { top: '55%', left: '90%' },
      { top: '82%', left: '25%' }, { top: '88%', left: '55%' }, { top: '78%', left: '82%' },
      { top: '40%', left: '5%' }, { top: '20%', left: '25%' }, { top: '75%', left: '60%' }, { top: '85%', left: '10%' }
    ].map((pos) => ({
      ...pos,
      size: Math.random() * 12 + 24, // 24px to 36px - elegant single star
      delay: Math.random() * 3,
    }));
  }, []);

  // 50 tiny ambient background stars
  const ambientStars = useMemo(() => {
    return Array.from({ length: 60 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-rose-950 overflow-hidden flex flex-col items-center font-sans">
      
      {/* Soft twilight cosmic glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none z-0"></div>
      
      {/* Tiny Ambient Stars */}
      {ambientStars.map((star, i) => (
        <motion.div
          key={`ambient-${i}`}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + star.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bg-white rounded-full z-0"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
        />
      ))}

      <div className="absolute top-8 left-8 z-50">
        <Link to="/experience" className="text-pink-200 hover:text-white transition-colors flex items-center gap-2 text-sm italic tracking-wider bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-lg">
          <span>&larr; Return</span>
        </Link>
      </div>

      <div className="absolute top-16 z-20 text-center pointer-events-none w-full px-4">
        <h1 className="text-4xl md:text-5xl text-pink-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] font-light tracking-wide">
          21 Reasons You Are Perfect
        </h1>
        <p className="text-pink-200/80 text-lg mt-3 font-light italic">Select a star in the twilight sky</p>
      </div>

      {loading ? null : (
        <>
          {/* Render the Huge Shiny Stars */}
          {reasons.map((reason, index) => {
            const pos = starPositions[index] || starPositions[0];
            return (
              <motion.div
                key={reason.id || index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
                transition={{ 
                  duration: 3 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: pos.delay,
                  ease: "easeInOut"
                }}
                className="absolute cursor-pointer group z-10 flex items-center justify-center w-24 h-24 -ml-12 -mt-12"
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedReasonIndex(index)}
              >
                {/* Elegant 4-Point Sparkle Star */}
                <svg 
                  width={pos.size} 
                  height={pos.size} 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="text-yellow-100 drop-shadow-[0_0_12px_rgba(253,224,71,0.9)] group-hover:text-white group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,1)] transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12 z-20"
                >
                  <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
                </svg>
              </motion.div>
            );
          })}
        </>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedReasonIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/80 backdrop-blur-xl"
            onClick={() => setSelectedReasonIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white/10 backdrop-blur-3xl border border-white/20 p-10 md:p-16 rounded-[2.5rem] max-w-lg w-full shadow-[0_30px_80px_rgba(0,0,0,0.5)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[2.5rem]"></div>

              <button 
                onClick={() => setSelectedReasonIndex(null)}
                className="absolute top-6 right-8 text-white/50 hover:text-white transition-colors text-3xl font-light z-50"
              >
                &times;
              </button>
              
              {/* Corner Tied Heart Balloons */}
              <div className="absolute top-0 left-0 pointer-events-none z-50">
                {/* Heart Balloon 1 (Tilted Right) */}
                <motion.div 
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: 'bottom center' }}
                  className="absolute -top-[80px] -left-[20px]"
                >
                  <svg width="80" height="120" viewBox="0 0 60 100" fill="none" className="drop-shadow-xl text-rose-400">
                     <path d="M30 45 C 0 45, 0 0, 30 15 C 60 0, 60 45, 30 45 Z" fill="currentColor"/>
                     {/* String tying to the absolute corner of the modal */}
                     <path d="M30 45 Q 25 70 20 100" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                  </svg>
                </motion.div>
                
                {/* Heart Balloon 2 (Tilted Left) */}
                <motion.div 
                  animate={{ rotate: [2, -4, 2] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{ transformOrigin: 'bottom center' }}
                  className="absolute -top-[60px] left-[15px]"
                >
                  <svg width="60" height="90" viewBox="0 0 60 100" fill="none" className="drop-shadow-lg text-pink-300">
                     <path d="M30 45 C 0 45, 0 0, 30 15 C 60 0, 60 45, 30 45 Z" fill="currentColor"/>
                     {/* String tying back to the same origin */}
                     <path d="M30 45 Q 20 70 -15 100" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                  </svg>
                </motion.div>

                {/* The Little Bow/Knot at the corner */}
                <div className="absolute top-[2px] left-[2px] w-2 h-2 bg-white/60 rounded-full blur-[1px]"></div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-pink-300/80 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4 text-center">
                  ✦ Star No. {String(selectedReasonIndex + 1).padStart(2, '0')} ✦
                </p>
                <h2 className="text-3xl md:text-4xl text-rose-100 mb-8 text-center drop-shadow-sm font-sans italic font-light leading-tight">
                  One of the many reasons I adore you...
                </h2>
                
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-pink-300/40 to-transparent mb-10"></div>
                
                <p className="text-rose-50 text-xl md:text-2xl leading-relaxed font-light text-center whitespace-pre-wrap px-2 italic font-sans">
                  {reasons[selectedReasonIndex].message}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
