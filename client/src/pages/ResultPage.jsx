import React, { useEffect } from 'react';
import { useBooth } from '../context/BoothContext';
import confetti from 'canvas-confetti';
import { Download, Share2, RefreshCw, Sparkles } from 'lucide-react';

export default function ResultPage() {
  const { finalCompositeImage, selectedFrame, resetBooth, setPage } = useBooth();

  // Burst confetti celebration on load
  useEffect(() => {
    if (!finalCompositeImage) return;

    // Standard school pride fire burst
    const end = Date.now() + (1.5 * 1000);
    const colors = ['#ca4b8c', '#7c3aed', '#ffd166', '#2563eb'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, [finalCompositeImage]);

  // Handle image download
  const handleDownload = () => {
    if (!finalCompositeImage || !selectedFrame) return;

    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '');
    link.download = `snapvibe-${selectedFrame.slug}-${timestamp}.png`;
    link.href = finalCompositeImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle sharing via Web Share API
  const handleShare = async () => {
    if (!finalCompositeImage) return;

    // Convert dataURL to Blob/File for sharing
    try {
      const res = await fetch(finalCompositeImage);
      const blob = await res.blob();
      const file = new File([blob], 'snapvibe-photo.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Foto SnapVibe Saya',
          text: 'Lihat jepretan aesthetic photobox virtual saya dari SnapVibe! ✨📸'
        });
      } else {
        // Fallback: Copy link/notify
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          alert('Link aplikasi disalin ke clipboard! Bagikan link ini ke temanmu.');
        } else {
          alert('Browser Anda tidak mendukung fitur sharing.');
        }
      }
    } catch (err) {
      console.error('Sharing failed:', err);
    }
  };

  if (!finalCompositeImage) {
    // If user somehow accesses result page directly, redirect back
    useEffect(() => {
      setPage('gallery');
    }, []);
    return null;
  }

  return (
    <div className="container result-layout page-transition">
      
      <div style={{ textAlign: 'center' }}>
        <span className="hero-badge">
          <Sparkles size={14} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />
          Yay! Foto Kamu Sudah Jadi
        </span>
        <h1 style={{ fontSize: '36px', marginTop: '12px' }}>Karya Indahmu</h1>
        <p>Unduh sekarang dan bagikan momen serumu dengan dunia!</p>
      </div>

      {/* Renders completed image */}
      <div className="result-image-card">
        <img src={finalCompositeImage} alt="SnapVibe Final Result" />
      </div>

      {/* Share / Download / Reset Actions */}
      <div className="result-actions">
        <button 
          className="btn btn-primary" 
          onClick={handleDownload}
          style={{ padding: '16px 32px', borderRadius: '16px', gap: '10px' }}
        >
          <Download size={20} />
          Unduh Foto (PNG)
        </button>

        <button 
          className="btn btn-secondary" 
          onClick={handleShare}
          style={{ padding: '16px 24px', borderRadius: '16px', gap: '10px' }}
        >
          <Share2 size={20} />
          Bagikan Moment
        </button>

        <button 
          className="btn btn-secondary" 
          onClick={() => {
            resetBooth();
            setPage('gallery');
          }}
          style={{ padding: '16px 24px', borderRadius: '16px', gap: '10px' }}
        >
          <RefreshCw size={20} />
          Mulai Foto Baru
        </button>
      </div>

    </div>
  );
}
