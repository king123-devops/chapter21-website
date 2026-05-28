import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MainExperience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="z-10 max-w-6xl w-full py-12 md:py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16 md:mb-24 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans text-secondary mb-6 drop-shadow-sm tracking-wide leading-tight">
            To the Girl Who Makes the World Brighter
          </h1>
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-primary/40"></div>
            <span className="text-primary/60 text-lg md:text-xl font-sans italic">✦</span>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-primary/40"></div>
          </div>
          <p className="text-lg md:text-2xl text-primary font-sans italic font-light max-w-3xl mx-auto leading-relaxed">
            I couldn't wrap up the world, so I built this little corner of the internet just to celebrate you.
          </p>
        </motion.div>
        
        {/* Mobile stacking: flex-col, Desktop: grid-cols-3 */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-12 px-2 md:px-4">
          
          {/* Card 1: The Chapters */}
          <motion.div variants={itemVariants}>
            <Link to="/timeline" className="block group h-full outline-none">
              <div className="h-full flex flex-col items-center text-center bg-white/40 backdrop-blur-xl px-6 md:px-8 py-10 md:py-16 rounded-[2rem] border border-white/60 shadow-[0_10px_40px_rgb(0,0,0,0.05)] hover:bg-white/60 hover:shadow-[0_20px_60px_rgba(190,18,60,0.15)] transition-all duration-700 hover:-translate-y-2 md:hover:-translate-y-3 relative overflow-hidden">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-rose-100/80 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-rose-200 transition-all duration-700 shadow-sm">
                  {/* Elegant Hourglass Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 drop-shadow-sm">
                    <path d="M5 22h14" />
                    <path d="M5 2h14" />
                    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
                    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-sans text-secondary group-hover:text-primary transition-colors duration-500 mb-3 md:mb-4">
                  Suspended in Time
                </h2>
                <p className="text-secondary/80 font-light text-base md:text-lg italic leading-relaxed">
                  A look back at the beautiful story that led to today.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Card 2: 21 Reasons */}
          <motion.div variants={itemVariants}>
            <Link to="/wishes" className="block group h-full outline-none">
              <div className="h-full flex flex-col items-center text-center bg-white/40 backdrop-blur-xl px-6 md:px-8 py-10 md:py-16 rounded-[2rem] border border-white/60 shadow-[0_10px_40px_rgb(0,0,0,0.05)] hover:bg-white/60 hover:shadow-[0_20px_60px_rgba(190,18,60,0.15)] transition-all duration-700 hover:-translate-y-2 md:hover:-translate-y-3 relative overflow-hidden">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-indigo-100/80 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-indigo-200 transition-all duration-700 shadow-sm">
                  {/* Glowing Star Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.6)]">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-sans text-secondary group-hover:text-indigo-900 transition-colors duration-500 mb-3 md:mb-4">
                  21 Reasons
                </h2>
                <p className="text-secondary/80 font-light text-base md:text-lg italic leading-relaxed">
                  21 massive glowing stars, each holding a reason why you are absolutely perfect.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Card 3: The Letter */}
          <motion.div variants={itemVariants}>
            <Link to="/letter" className="block group h-full outline-none">
              <div className="h-full flex flex-col items-center text-center bg-white/40 backdrop-blur-xl px-6 md:px-8 py-10 md:py-16 rounded-[2rem] border border-white/60 shadow-[0_10px_40px_rgb(0,0,0,0.05)] hover:bg-white/60 hover:shadow-[0_20px_60px_rgba(190,18,60,0.15)] transition-all duration-700 hover:-translate-y-2 md:hover:-translate-y-3 relative overflow-hidden">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-pink-200/80 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-pink-300 transition-all duration-700 shadow-sm">
                  {/* Minimalist Envelope with Heart Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    <path d="M12 14.5 a 1.5 1.5 0 0 0 -1.5 -1.5 a 1.5 1.5 0 0 0 -1.5 1.5 c 0 1.5 3 3.5 3 3.5 c 0 0 3 -2 3 -3.5 a 1.5 1.5 0 0 0 -1.5 -1.5 a 1.5 1.5 0 0 0 -1.5 1.5 Z" fill="currentColor" stroke="none"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-sans text-secondary group-hover:text-primary transition-colors duration-500 mb-3 md:mb-4">
                  The Letter
                </h2>
                <p className="text-secondary/80 font-light text-base md:text-lg italic leading-relaxed">
                  My final message to you on your special day. A declaration of love.
                </p>
              </div>
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
