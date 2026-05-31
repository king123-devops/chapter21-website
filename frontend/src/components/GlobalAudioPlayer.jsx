import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext(null);

export const useAudioContext = () => useContext(AudioContext);

/**
 * Hook for pages to request a specific track.
 */
export function useAudioTrack(src, startTime = 0, shouldPlay = true) {
  const context = useAudioContext();
  
  useEffect(() => {
    if (context && shouldPlay && src) {
      context.setTrack(src, startTime);
    }
  }, [src, startTime, shouldPlay, context]);
}

export function GlobalAudioProvider({ children }) {
  const audioRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const fadeIntervalRef = useRef(null);

  // When a page requests a new track
  const setTrack = (newSrc, startTime = 0) => {
    if (currentSrc === newSrc) return; // Already playing this track

    const audio = audioRef.current;
    if (!audio) return;

    // If it's the first track or we're not currently playing, just switch
    if (!currentSrc || !isPlaying) {
      audio.src = newSrc;
      audio.currentTime = startTime;
      audio.volume = isMuted ? 0 : 1;
      setCurrentSrc(newSrc);
      
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(e => {
          console.log("Play failed:", e);
          setIsPlaying(false);
        });
      return;
    }

    // Crossfade: Fade out, switch track, fade in
    fadeAudio(0, 1000, () => {
      audio.src = newSrc;
      audio.currentTime = startTime;
      setCurrentSrc(newSrc);
      
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          fadeAudio(isMuted ? 0 : 1, 1000);
        })
        .catch(e => {
          console.log("Play failed after fade:", e);
          setIsPlaying(false);
        });
    });
  };

  const fadeAudio = (targetVolume, duration, onComplete) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted && targetVolume > 0) {
      // If we are muted, don't fade in volume
      if (onComplete) onComplete();
      return;
    }

    clearInterval(fadeIntervalRef.current);
    const startVolume = audio.volume;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      let newVol = startVolume + (volumeStep * currentStep);
      
      if (newVol > 1) newVol = 1;
      if (newVol < 0) newVol = 0;
      
      audio.volume = newVol;

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        audio.volume = targetVolume;
        if (onComplete) onComplete();
      }
    }, stepTime);
  };

  // Autoplay and interaction unlocker
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        
        // Try to play if a source exists and it's not currently playing
        const audio = audioRef.current;
        if (audio && currentSrc && audio.paused) {
          audio.play()
            .then(() => setIsPlaying(true))
            .catch(e => console.log("Play on interaction failed:", e));
        }
        
        cleanup();
      }
    };

    const events = ['click', 'touchstart', 'keydown'];
    const cleanup = () => {
      events.forEach(event => document.removeEventListener(event, handleInteraction));
    };

    events.forEach(event => document.addEventListener(event, handleInteraction));

    return cleanup;
  }, [hasInteracted, currentSrc]);

  // Handle Mute Toggle
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // If it's not playing (due to autoplay block), clicking should play and unmute
    if (!isPlaying) {
      setIsMuted(false);
      audio.volume = 1;
      if (currentSrc) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log(e));
      }
      return;
    }

    // If it IS playing, toggle mute state
    if (isMuted) {
      setIsMuted(false);
      audio.volume = 1;
    } else {
      setIsMuted(true);
      audio.volume = 0;
    }
  };

  return (
    <AudioContext.Provider value={{ setTrack }}>
      {children}
      
      {/* Global Constant Mute Button */}
      <div className="fixed top-8 right-6 md:right-8 z-[100] flex items-center">
        <style>{`
          @keyframes soundWave {
            0% { transform: scaleY(0.25); }
            100% { transform: scaleY(1); }
          }
          .animate-wave-1 { animation: soundWave 0.6s infinite ease-in-out alternate; }
          .animate-wave-2 { animation: soundWave 0.8s infinite ease-in-out alternate; }
          .animate-wave-3 { animation: soundWave 0.5s infinite ease-in-out alternate; }
          .animate-wave-4 { animation: soundWave 0.7s infinite ease-in-out alternate; }
        `}</style>

        <button
          onClick={toggleMute}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/40 backdrop-blur-md hover:bg-white/60 border border-white/60 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none cursor-pointer"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
          <audio ref={audioRef} loop autoPlay />
          
          {isPlaying && !isMuted ? (
            /* Animated Audio Wave */
            <div className="flex items-end gap-[2px] md:gap-[3px] h-3 md:h-4">
              <span className="w-[2px] md:w-[3px] h-full bg-rose-400 rounded-full origin-bottom animate-wave-1" style={{ animationDelay: '0.1s' }} />
              <span className="w-[2px] md:w-[3px] h-full bg-rose-400 rounded-full origin-bottom animate-wave-2" style={{ animationDelay: '0.3s' }} />
              <span className="w-[2px] md:w-[3px] h-full bg-rose-400 rounded-full origin-bottom animate-wave-3" style={{ animationDelay: '0.5s' }} />
              <span className="w-[2px] md:w-[3px] h-full bg-rose-400 rounded-full origin-bottom animate-wave-4" style={{ animationDelay: '0.2s' }} />
            </div>
          ) : (
            /* Muted Speaker Icon */
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary/70 group-hover:text-rose-400 transition-colors md:w-[18px] md:h-[18px]">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
      </div>
    </AudioContext.Provider>
  );
}
