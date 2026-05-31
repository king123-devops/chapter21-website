import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Countdown from './pages/Countdown';
import MainExperience from './pages/MainExperience';
import StarConstellation from './components/StarConstellation';
import TimelineExperience from './components/TimelineExperience';
import TheLetterPage from './pages/TheLetterPage';
import BokehBackground from './components/BokehBackground';
import { GlobalAudioProvider } from './components/GlobalAudioPlayer';

function App() {
  return (
    <GlobalAudioProvider>
      <Router>
        <div className="min-h-screen text-secondary font-sans antialiased selection:bg-accent/30 relative">
          {/* Global ambient background rendered behind everything */}
          <BokehBackground />
          
          <Routes>
            <Route path="/" element={<Countdown />} />
            <Route path="/experience" element={<MainExperience />} />
            <Route path="/wishes" element={<StarConstellation />} />
            <Route path="/timeline" element={<TimelineExperience />} />
            <Route path="/letter" element={<TheLetterPage />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </GlobalAudioProvider>
  );
}

export default App;
