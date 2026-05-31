import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAudioTrack } from './GlobalAudioPlayer';

export default function AuraCanvas() {
  useAudioTrack('/love.mp3', 30, true);

  const containerRef = useRef(null);

  const polaroids = [
    { 
      id: 1, 
      src: '/photo1.png', 
      rotate: -6, 
      top: '12%', 
      left: '8%', 
      text: 'Your laugh is incredibly contagious.',
      caption: 'pure elegance'
    },
    { 
      id: 2, 
      src: '/photo2.png', 
      rotate: 4, 
      top: '35%', 
      left: '50%', 
      text: 'The best 28 days.',
      caption: 'that smile'
    },
    { 
      id: 3, 
      src: '/photo3.png', 
      rotate: -4, 
      top: '60%', 
      left: '15%', 
      text: 'You make everything brighter.',
      caption: 'stunning aura'
    },
    { 
      id: 4, 
      src: '/photo4.png', 
      rotate: 7, 
      top: '75%', 
      left: '55%', 
      text: 'Every single moment is magic.',
      caption: 'breathtaking' 
    },
    { 
      id: 5, 
      src: '/photo5.png', 
      rotate: 5, 
      top: '15%', 
      left: '75%', 
      text: 'I love the way you see the world.',
      caption: 'So chic'
    },
    { 
      id: 6, 
      src: '/photo6.png', 
      rotate: -3, 
      top: '45%', 
      left: '80%', 
      text: 'To many more beautiful memories.',
      caption: 'timeless beauty'
    },
  ];

  return (
    <div className="min-h-screen bg-transparent relative flex flex-col overflow-hidden">
      
      {/* Return button */}
      <div className="absolute top-8 left-6 md:left-8 z-50">
        <Link to="/experience" className="text-secondary hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest text-xs font-medium bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/80 shadow-md">
          <span className="text-lg">&larr;</span> Return
        </Link>
      </div>

      {/* The Aura Canvas Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen min-h-[70vh] flex-1 overflow-hidden"
      >
        {/* 1. The 'Aura' Fluid Background */}
        <motion.div
          animate={{ x: [0, 80, -40, 0], y: [0, -80, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem] bg-pink-300/40 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -100, 60, 0], y: [0, 100, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] bg-rose-200/50 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, 60, -80, 0], y: [0, 120, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/3 w-[20rem] h-[20rem] md:w-[35rem] md:h-[35rem] bg-purple-200/40 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
        />

        {/* 2. The Hidden Glowing Notes (Background Layer) */}
        {polaroids.map((item) => (
          <div 
            key={`note-${item.id}`}
            className="absolute z-10 font-sans italic text-xl md:text-3xl text-secondary drop-shadow-[0_0_15px_rgba(255,255,255,1)] font-light select-none px-4"
            style={{ 
              top: `calc(${item.top} + 20px)`, // Slightly offset so the photo naturally covers it
              left: `calc(${item.left} + 15px)` 
            }}
          >
            {item.text}
          </div>
        ))}

        {/* 3. The Zero-Gravity Draggable Polaroids (Foreground Layer) */}
        {polaroids.map((item) => (
          <motion.div
            key={`photo-${item.id}`}
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 100 }}
            initial={{ rotate: item.rotate, top: item.top, left: item.left, zIndex: 20 }}
            animate={{ 
              y: [0, -10, 0], 
              rotate: [item.rotate, item.rotate + 1.5, item.rotate],
              zIndex: 20
            }}
            transition={{ 
              y: { duration: 4 + item.id * 0.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5 + item.id * 0.5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute w-48 md:w-64 bg-[#fdfbf7] p-3 md:p-4 rounded-sm shadow-[0_20px_40px_rgba(0,0,0,0.2)] cursor-grab border border-black/5"
            style={{ touchAction: 'none' }} // Crucial to prevent mobile scrolling while dragging
          >
            <div className="w-full aspect-square bg-rose-50 overflow-hidden relative shadow-inner">
              <img 
                src={item.src} 
                alt="Memory" 
                className="w-full h-full object-cover pointer-events-none select-none filter contrast-[1.05] sepia-[0.1]"
              />
              {/* Subtle vintage glass overlay inside the polaroid */}
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/10 via-transparent to-amber-100/10 mix-blend-overlay pointer-events-none"></div>
            </div>
            
            {/* Handwriting Caption */}
            <div className="w-full flex items-center justify-center pt-4 md:pt-6 pb-2 text-center">
              <span className="font-['Caveat'] text-3xl md:text-4xl text-neutral-800 rotate-[-2deg] opacity-90 leading-none">
                {item.caption}
              </span>
            </div>
          </motion.div>
        ))}
        
        {/* Subtle hint to drag */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-0 text-center w-full px-4 pointer-events-none opacity-40">
          <h2 className="text-xl md:text-2xl text-secondary font-sans italic tracking-wide">
            Pull apart the memories...
          </h2>
        </div>
      </div>
    </div>
  );
}
