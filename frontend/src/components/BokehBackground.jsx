import { useEffect, useState } from 'react';

export default function BokehBackground() {
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    // Generate 15 soft, dreamy orbs
    const colors = ['bg-pink-300', 'bg-yellow-100', 'bg-white', 'bg-rose-200'];
    const newOrbs = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 10, // 10rem to 25rem
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: Math.random() * 20 + 20, // 20s to 40s
      animationDelay: Math.random() * -20, // Negative delay to start smoothly
    }));
    setOrbs(newOrbs);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-gradient-to-br from-rose-50 via-pink-100 to-rose-200">
      {/* Texture overlay for that premium romantic feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-30 mix-blend-multiply pointer-events-none"></div>
      
      {/* Floating Bokeh Orbs */}
      {orbs.map(orb => (
        <div
          key={orb.id}
          className={`absolute rounded-full opacity-40 blur-[70px] ${orb.color}`}
          style={{
            width: `${orb.size}rem`,
            height: `${orb.size}rem`,
            top: orb.top,
            left: orb.left,
            animation: `float ${orb.animationDuration}s infinite ease-in-out alternate`,
            animationDelay: `${orb.animationDelay}s`,
          }}
        ></div>
      ))}

      {/* Pure CSS Ambient Background Animation */}
      <style>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}
