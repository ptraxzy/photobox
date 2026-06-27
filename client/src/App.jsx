import React from 'react';
import { BoothProvider, useBooth } from './context/BoothContext';
import Header from './components/common/Header';
import LandingPage from './pages/LandingPage';
import FrameGalleryPage from './pages/FrameGalleryPage';
import BoothPage from './pages/BoothPage';
import EditorPage from './pages/EditorPage';
import ResultPage from './pages/ResultPage';

function AppContent() {
  const { page } = useBooth();

  // Render current page based on state router
  const renderPage = () => {
    switch (page) {
      case 'landing':
        return <LandingPage />;
      case 'gallery':
        return <FrameGalleryPage />;
      case 'booth':
        return <BoothPage />;
      case 'editor':
        return <EditorPage />;
      case 'result':
        return <ResultPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      <Header />
      
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      <footer className="app-footer">
        <div className="container">
          <div className="footer-logo">SnapVibe ✦ Studio</div>
          <p style={{ fontSize: '13px', marginBottom: '8px' }}>
            © {new Date().getFullYear()} SnapVibe. Dibuat dengan penuh 💖 untuk momen spesialmu.
          </p>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Privasi Terjamin: Seluruh proses foto dan editing berjalan di dalam browsermu. Kami tidak menyimpan fotomu di server kami.
          </p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BoothProvider>
      <AppContent />
    </BoothProvider>
  );
}
