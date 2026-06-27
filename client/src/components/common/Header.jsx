import React from 'react';
import { useBooth } from '../../context/BoothContext';
import { Camera, RefreshCw } from 'lucide-react';

export default function Header() {
  const { page, setPage, resetBooth } = useBooth();

  return (
    <header className="app-header">
      <div className="container header-content">
        <a 
          href="#" 
          className="logo-link"
          onClick={(e) => {
            e.preventDefault();
            resetBooth();
            setPage('landing');
          }}
        >
          <div className="logo-icon">
            <Camera size={20} />
          </div>
          <span>SnapVibe</span>
        </a>

        <nav className="nav-links">
          <a 
            href="#" 
            className={`nav-link ${page === 'landing' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setPage('landing'); }}
          >
            Beranda
          </a>
          <a 
            href="#" 
            className={`nav-link ${page === 'gallery' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setPage('gallery'); }}
          >
            Galeri Frame
          </a>
          {page !== 'landing' && page !== 'gallery' && (
            <button 
              className="btn btn-secondary" 
              onClick={resetBooth}
              style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '13px' }}
            >
              <RefreshCw size={14} />
              Reset Sesi
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
