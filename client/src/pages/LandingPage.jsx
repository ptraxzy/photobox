import React from 'react';
import { useBooth } from '../context/BoothContext';
import { Camera, Sparkles, Smile, Heart, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const { setPage } = useBooth();

  return (
    <div className="container page-transition">
      <section className="hero-section">
        <span className="hero-badge">
          <Sparkles size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />
          Photo Booth Virtual Gratis & Aesthetic
        </span>
        
        <h1 className="hero-title">
          Capture Moments,<br />Anywhere You Are.
        </h1>
        
        <p className="hero-subtitle">
          SnapVibe adalah photo booth online & virtual terbaik. Ambil foto langsung melalui kamera laptop atau HP, pakai frame aesthetic bergaya Korea, tambahkan filter & stiker gemas, lalu langsung download hasilnya.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setPage('gallery')}
          >
            Mulai Foto Sekarang
            <ArrowRight size={18} />
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Cara Kerja
          </button>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="glass-panel" style={{ margin: '40px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Bagaimana Cara Kerjanya?</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 36px' }}>Cukup ikuti 3 langkah mudah ini untuk membuat foto aesthetic ala photobox di mall secara langsung.</p>
        
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <h3>Pilih Frame Favorit</h3>
            <p>Telusuri galeri template kami yang aesthetic. Tersedia dalam gaya Korea, minimalis polaroid, wedding, dan birthday.</p>
          </div>
          
          <div className="step-card">
            <span className="step-number">02</span>
            <h3>Ambil Foto (Multi-Shot)</h3>
            <p>Izinkan akses kamera browser, ikuti timer countdown otomatis 3 detik, dan pose terbaikmu untuk setiap slot foto!</p>
          </div>
          
          <div className="step-card">
            <span className="step-number">03</span>
            <h3>Edit & Download</h3>
            <p>Tambahkan filter vintage/B&W, tempelkan stiker gemas, tulis teks, lalu download hasil akhir resolusi tinggi secara gratis.</p>
          </div>
        </div>
      </section>

      {/* Categories Spotlight */}
      <section style={{ margin: '60px 0 80px' }}>
        <div className="trending-header">
          <div>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Pilihan Tema Populer</h2>
            <p>Temukan template yang dirancang khusus untuk setiap momen bahagiamu.</p>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={() => setPage('gallery')}
            style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '14px' }}
          >
            Lihat Semua
          </button>
        </div>

        <div className="frames-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          <div 
            className="glass-panel frame-card" 
            onClick={() => setPage('gallery')}
            style={{ padding: '24px', cursor: 'pointer', background: 'rgba(255,214,232,0.6)' }}
          >
            <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ca4b8c', marginBottom: '16px' }}>
              <Heart size={28} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Korean Style</h3>
            <p style={{ fontSize: '14px' }}>Strip 4-kotak aesthetic dengan perpaduan warna pastel yang lembut.</p>
          </div>

          <div 
            className="glass-panel frame-card" 
            onClick={() => setPage('gallery')}
            style={{ padding: '24px', cursor: 'pointer', background: 'rgba(214,228,255,0.6)' }}
          >
            <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: '16px' }}>
              <Camera size={28} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Vintage Polaroid</h3>
            <p style={{ fontSize: '14px' }}>Frame satu foto retro bergaya film instan yang klasik dan timeless.</p>
          </div>

          <div 
            className="glass-panel frame-card" 
            onClick={() => setPage('gallery')}
            style={{ padding: '24px', cursor: 'pointer', background: 'rgba(243,214,255,0.6)' }}
          >
            <div style={{ background: '#fff', padding: '16px', borderRadius: '16px', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', marginBottom: '16px' }}>
              <Smile size={28} />
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Event Special</h3>
            <p style={{ fontSize: '14px' }}>Template meriah khusus untuk perayaan pernikahan dan pesta ulang tahun.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
