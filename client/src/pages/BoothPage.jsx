import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useBooth, API_BASE_URL } from '../context/BoothContext';
import { Camera, Upload, RefreshCw, ChevronLeft, ArrowRight, Play } from 'lucide-react';

export default function BoothPage() {
  const { 
    selectedFrame, 
    capturedPhotos, 
    setCapturedPhoto, 
    setPage, 
    resetBooth 
  } = useBooth();

  const [stream, setStream] = useState(null);
  const [activeSlot, setActiveSlot] = useState(0);
  const [cameraAllowed, setCameraAllowed] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [isShooting, setIsShooting] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Booth dimensions scaling factor for rendering preview
  const displayWidth = selectedFrame 
    ? Math.min(selectedFrame.width, windowWidth - 48) 
    : 200;
  const scale = selectedFrame ? displayWidth / selectedFrame.width : 0.5;
  const displayHeight = selectedFrame ? selectedFrame.height * scale : 600;

  // Initialize camera stream
  useEffect(() => {
    if (!selectedFrame) return;

    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user' 
          },
          audio: false
        });
        setStream(mediaStream);
        setCameraAllowed(true);
      } catch (err) {
        console.warn('Webcam access denied or unavailable. Falling back to local upload:', err);
        setCameraAllowed(false);
      }
    }

    // Find the first empty slot to set active
    const firstEmpty = capturedPhotos.findIndex(p => p === null);
    if (firstEmpty !== -1) {
      setActiveSlot(firstEmpty);
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedFrame]);

  // Handle setting stream when active slot changes, camera is allowed, and video ref element mounts
  useEffect(() => {
    if (stream && videoRef.current) {
      if (videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
      }
      videoRef.current.play().catch(err => console.log("Webcam play failed:", err));
    }
  }, [stream, cameraAllowed, activeSlot]);

  // Capture the photo from the video feed
  const capturePhoto = () => {
    if (!videoRef.current || !selectedFrame) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const slot = selectedFrame.slots[activeSlot];

    // Set canvas dimensions to slot aspect ratio for high quality
    canvas.width = slot.width * 2;
    canvas.height = slot.height * 2;

    const ctx = canvas.getContext('2d');
    
    // Draw mirrored image (standard for selfie booth)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    // Calculate crop coordinates from video stream to fill the slot exactly (cover)
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const videoAspect = videoWidth / videoHeight;
    const slotAspect = slot.width / slot.height;

    let sx = 0, sy = 0, sWidth = videoWidth, sHeight = videoHeight;

    if (videoAspect > slotAspect) {
      // Video is wider than slot - crop sides
      sWidth = videoHeight * slotAspect;
      sx = (videoWidth - sWidth) / 2;
    } else {
      // Video is taller than slot - crop top/bottom
      sHeight = videoWidth / slotAspect;
      sy = (videoHeight - sHeight) / 2;
    }

    ctx.drawImage(
      video,
      sx, sy, sWidth, sHeight, // Source video crop
      0, 0, canvas.width, canvas.height // Destination canvas size
    );

    // Save image to the context store
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedPhoto(activeSlot, dataUrl);

    // Trigger flash animation
    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 500);

    // Look for next empty slot
    const nextEmpty = capturedPhotos.map((p, idx) => idx === activeSlot ? dataUrl : p).findIndex(p => p === null);
    if (nextEmpty !== -1) {
      setActiveSlot(nextEmpty);
    } else {
      // All slots full
      setActiveSlot(-1);
    }
  };

  // Run automated countdown capture sequence
  const startCaptureSequence = () => {
    if (isShooting || activeSlot === -1) return;
    setIsShooting(true);

    let count = 3;
    setCountdown(count);

    const timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        setCountdown(null);
        capturePhoto();
        setIsShooting(false);
      }
    }, 1000);
  };

  // Automated shoot-all sequence
  const startShootAllSequence = async () => {
    if (isShooting) return;
    
    // Find first empty slot, or start from 0
    let currentEmpty = capturedPhotos.findIndex(p => p === null);
    if (currentEmpty === -1) {
      // Reset all slots to shoot all from scratch
      for (let i = 0; i < selectedFrame.photo_slot_count; i++) {
        setCapturedPhoto(i, null);
      }
      currentEmpty = 0;
    }

    setActiveSlot(currentEmpty);
    runAutoShot(currentEmpty);
  };

  const runAutoShot = (slotIdx) => {
    setIsShooting(true);
    let count = 3;
    setCountdown(count);

    const timer = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        setCountdown(null);

        // Perform capture
        if (videoRef.current && selectedFrame) {
          const video = videoRef.current;
          const canvas = document.createElement('canvas');
          const slot = selectedFrame.slots[slotIdx];
          canvas.width = slot.width * 2;
          canvas.height = slot.height * 2;
          const ctx = canvas.getContext('2d');
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);

          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;
          const videoAspect = videoWidth / videoHeight;
          const slotAspect = slot.width / slot.height;
          let sx = 0, sy = 0, sWidth = videoWidth, sHeight = videoHeight;
          if (videoAspect > slotAspect) {
            sWidth = videoHeight * slotAspect;
            sx = (videoWidth - sWidth) / 2;
          } else {
            sHeight = videoWidth / slotAspect;
            sy = (videoHeight - sHeight) / 2;
          }

          ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/png');
          setCapturedPhoto(slotIdx, dataUrl);

          // Flash
          setIsFlashActive(true);
          setTimeout(() => setIsFlashActive(false), 500);

          // Setup next shot after a small delay
          const nextSlot = slotIdx + 1;
          if (nextSlot < selectedFrame.photo_slot_count) {
            setTimeout(() => {
              setActiveSlot(nextSlot);
              runAutoShot(nextSlot);
            }, 1500);
          } else {
            setTimeout(() => {
              setIsShooting(false);
              setActiveSlot(-1);
            }, 1000);
          }
        }
      }
    }, 1000);
  };

  // Local file upload handling for fallback/upload state
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCapturedPhoto(activeSlot, event.target.result);
      // Advance to next slot
      const nextEmpty = capturedPhotos.map((p, idx) => idx === activeSlot ? event.target.result : p).findIndex(p => p === null);
      if (nextEmpty !== -1) {
        setActiveSlot(nextEmpty);
      } else {
        setActiveSlot(-1);
      }
    };
    reader.readAsDataURL(file);
  };

  // Retake photo slot helper
  const handleRetake = (idx) => {
    setCapturedPhoto(idx, null);
    setActiveSlot(idx);
  };

  if (!selectedFrame) return null;

  const isAllFilled = capturedPhotos.every(p => p !== null);

  return (
    <div className="container page-transition" style={{ paddingBottom: '60px' }}>
      {/* Back to Gallery Link */}
      <button 
        onClick={resetBooth}
        className="btn btn-secondary"
        style={{ margin: '24px 0 12px', padding: '8px 16px', borderRadius: '12px', border: 'none' }}
      >
        <ChevronLeft size={16} />
        Kembali ke Galeri
      </button>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px' }}>Capture Booth</h1>
        <p>Bergaya & ambil jepretan terbaikmu. Ikuti countdown timer!</p>
      </div>

      <div className="booth-layout">
        
        {/* Left Column: Live Frame Preview Container */}
        <div className="booth-preview-column">
          <div 
            className="live-frame-container" 
            style={{ 
              width: `${displayWidth}px`, 
              height: `${displayHeight}px`,
              backgroundColor: selectedFrame.bgColor
            }}
          >
            {/* Flash screen overlay effect */}
            <div className={`flash-effect ${isFlashActive ? 'flash-active' : ''}`} />

            {/* Countdown Overlay */}
            {countdown !== null && (
              <div className="countdown-overlay">
                <span className="countdown-number">{countdown}</span>
              </div>
            )}

            {/* Render Slot Pictures under the cutout overlay */}
            <div className="booth-slot-underlay-wrapper">
              {selectedFrame.slots.map((slot, idx) => {
                const isCurrentActive = idx === activeSlot;
                const photo = capturedPhotos[idx];

                // Calculate CSS placement relative to container scale
                const slotStyle = {
                  left: `${slot.x * scale}px`,
                  top: `${slot.y * scale}px`,
                  width: `${slot.width * scale}px`,
                  height: `${slot.height * scale}px`,
                  borderRadius: `${20 * scale}px`,
                  overflow: 'hidden'
                };

                return (
                  <div key={idx} style={{ position: 'absolute', ...slotStyle }}>
                    {/* 1. Captured Image */}
                    {photo && (
                      <>
                        <img 
                          src={photo} 
                          className="captured-slot-img"
                          style={{ width: '100%', height: '100%' }}
                          alt={`Slot ${idx + 1}`}
                        />
                        {/* Hover action to retake individual slot */}
                        {!isShooting && (
                          <button
                            className="slot-action-btn"
                            style={{ bottom: '8px', right: '8px' }}
                            onClick={() => handleRetake(idx)}
                            title="Retake slot ini"
                          >
                            <RefreshCw size={14} />
                          </button>
                        )}
                      </>
                    )}

                    {/* 3. Empty slot indicator */}
                    {!photo && !isCurrentActive && (
                      <div 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          background: 'rgba(0,0,0,0.05)', 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center', 
                          justifyContent: 'center',
                          color: selectedFrame.textColor,
                          opacity: 0.5,
                          fontSize: '12px',
                          fontWeight: 'bold',
                          gap: '6px'
                        }}
                      >
                        <Camera size={18} />
                        <span>Slot {idx + 1}</span>
                      </div>
                    )}

                    {/* 4. Active camera selector but camera blocked */}
                    {isCurrentActive && !cameraAllowed && (
                      <div 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          background: 'rgba(0,0,0,0.1)', 
                          display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'center', 
                          justifyContent: 'center',
                          padding: '12px',
                          color: '#ca4b8c',
                          textAlign: 'center',
                          fontSize: '11px',
                          gap: '4px'
                        }}
                      >
                        <Upload size={16} />
                        <span style={{ fontWeight: '600' }}>Pilih Foto</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* 2. Single Live Video Stream element dynamically positioned */}
              {activeSlot !== -1 && cameraAllowed && (
                <div 
                  className="live-feed-slot" 
                  style={{ 
                    border: 'none', 
                    position: 'absolute',
                    left: `${selectedFrame.slots[activeSlot].x * scale}px`,
                    top: `${selectedFrame.slots[activeSlot].y * scale}px`,
                    width: `${selectedFrame.slots[activeSlot].width * scale}px`,
                    height: `${selectedFrame.slots[activeSlot].height * scale}px`,
                    borderRadius: `${20 * scale}px`,
                    overflow: 'hidden',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}
                >
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="live-feed-video"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>

            {/* PNG transparent frame cutout on top */}
            <div className="booth-slot-overlay-wrapper">
              <img 
                src={`${API_BASE_URL}${selectedFrame.overlay_image_url}`} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                alt="Frame Overlay"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Controls Panel */}
        <div className="booth-controls-column glass-panel">
          <h3 style={{ fontSize: '22px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
            Kontrol Kamera
          </h3>

          {/* Active Status Box */}
          <div style={{ background: 'rgba(255,255,255,0.5)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
            {activeSlot !== -1 ? (
              <p style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                📷 Siap mengambil foto untuk <span style={{ color: 'var(--brand-pink-dark)' }}>Slot {activeSlot + 1}</span>
              </p>
            ) : (
              <p style={{ fontWeight: '600', color: '#16a34a' }}>
                ✓ Semua slot foto telah terisi!
              </p>
            )}
          </div>

          {/* Camera Capture buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cameraAllowed ? (
              <>
                <button
                  className="btn btn-primary"
                  onClick={startCaptureSequence}
                  disabled={isShooting || activeSlot === -1}
                  style={{ gap: '12px', padding: '16px' }}
                >
                  <Play size={20} />
                  Ambil Foto (Slot {activeSlot + 1})
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={startShootAllSequence}
                  disabled={isShooting}
                  style={{ gap: '12px' }}
                >
                  <Camera size={16} />
                  Automated Multi-Shot (Semua Slot)
                </button>
              </>
            ) : (
              <div className="camera-fallback-banner">
                <p style={{ fontSize: '14px', margin: 0 }}>
                  Akses kamera ditolak atau tidak didukung di browser ini. Anda dapat mengunggah file foto secara manual.
                </p>
              </div>
            )}
            
            {/* File Upload Fallback Trigger */}
            {activeSlot !== -1 && (
              <div>
                <button
                  className="btn btn-secondary"
                  style={{ width: '100%', gap: '10px' }}
                  onClick={() => fileInputRef.current.click()}
                  disabled={isShooting}
                >
                  <Upload size={16} />
                  Unggah Foto untuk Slot {activeSlot + 1}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="upload-fallback-input"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>
            )}
          </div>

          {/* Frame Info Summary */}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)' }}>TEMPLATE PILIHAN:</span>
            <p style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-dark)' }}>{selectedFrame.name}</p>
            <p style={{ fontSize: '13px' }}>Layout: {selectedFrame.layout_type.toUpperCase()} ({selectedFrame.photo_slot_count} Slot Foto)</p>
          </div>

          {/* Continue Action */}
          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px', borderRadius: '16px', gap: '8px' }}
              disabled={!isAllFilled || isShooting}
              onClick={() => setPage('editor')}
            >
              Lanjut ke Editor
              <ArrowRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
