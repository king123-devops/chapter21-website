import { Link } from 'react-router-dom';
import TheLetter from '../components/TheLetter';

export default function TheLetterPage() {
  return (
    <div className="min-h-screen relative pt-24 md:pt-32 pb-10 md:pb-20 px-2 md:px-4">
      <div className="fixed top-8 left-6 md:left-8 z-50">
        <Link to="/experience" className="text-secondary hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest text-xs font-medium bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/80 shadow-md">
          <span className="text-lg">&larr;</span> Return
        </Link>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <TheLetter />
      </div>
    </div>
  );
}
