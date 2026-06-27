import React, { useState, useEffect, useRef } from 'react';
import { useBooth, API_BASE_URL } from '../context/BoothContext';
import { drawComposite } from '../utils/canvasComposer';
import { Trash2, Type, Smile, Sparkles, Wand2, RefreshCw, Loader2, ArrowRight } from 'lucide-react';

export default function EditorPage() {
  const {
    selectedFrame,
    capturedPhotos,
    activeFilter,
    setActiveFilter,
    placedStickers,
    addSticker,
    updateSticker,
    deleteSticker,
    placedTexts,
    addText,
    updateText,
    deleteText,
    selectedElementId,
    setSelectedElementId,
    setFinalCompositeImage,
    setPage
  } = useBooth();

  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState('#ca4b8c');
  const [isExporting, setIsExporting] = useState(false);
  const containerRef = useRef(null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Booth dimensions scaling factor for rendering canvas preview
  const displayWidth = selectedFrame 
    ? Math.min(selectedFrame.width, windowWidth - 48) 
    : 200;
  const scale = selectedFrame ? displayWidth / selectedFrame.width : 0.5;
  const displayHeight = selectedFrame ? selectedFrame.height * scale : 550;

  // Add custom text handler
  const handleAddText = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    addText(textInput, textColor);
    setTextInput('');
  };

  // Generic interaction handler for Drag, Resize, and Rotate actions
  const startInteraction = (e, item, action) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedElementId(item.id);

    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    const startX = clientX;
    const startY = clientY;
    const initialX = item.x;
    const initialY = item.y;
    const initialScale = item.scale;
    const initialRotation = item.rotation;

    // Center coordinates in canvas space
    const centerCanvasX = item.x;
    const centerCanvasY = item.y;

    const onMove = (moveEvent) => {
      let moveClientX = moveEvent.clientX;
      let moveClientY = moveEvent.clientY;
      if (moveEvent.touches && moveEvent.touches.length > 0) {
        moveClientX = moveEvent.touches[0].clientX;
        moveClientY = moveEvent.touches[0].clientY;
      } else if (moveEvent.changedTouches && moveEvent.changedTouches.length > 0) {
        moveClientX = moveEvent.changedTouches[0].clientX;
        moveClientY = moveEvent.changedTouches[0].clientY;
      }
      
      const dx = (moveClientX - startX) / scale;
      const dy = (moveClientY - startY) / scale;

      const updateFn = item.type === 'sticker' ? updateSticker : updateText;

      if (action === 'drag') {
        updateFn(item.id, { x: initialX + dx, y: initialY + dy });
      } else if (action === 'resize') {
        // Calculate new scale based on dragging vector size
        const factor = Math.max(0.3, Math.min(3.0, initialScale + dx * 0.008));
        updateFn(item.id, { scale: factor });
      } else if (action === 'rotate') {
        // Calculate angles relative to element center
        const centerScreenX = (centerCanvasX * scale) + (containerRef.current ? containerRef.current.getBoundingClientRect().left : 0);
        const centerScreenY = (centerCanvasY * scale) + (containerRef.current ? containerRef.current.getBoundingClientRect().top : 0);

        const currentAngle = Math.atan2(moveClientY - centerScreenY, moveClientX - centerScreenX);
        const startAngle = Math.atan2(startY - centerScreenY, startX - centerScreenX);
        const diffDegrees = (currentAngle - startAngle) * (180 / Math.PI);

        updateFn(item.id, { rotation: initialRotation + diffDegrees });
      }
    };

    const onEnd = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  };

  // Compile final image and go to result page
  const handleExport = async () => {
    if (!selectedFrame || isExporting) return;
    setIsExporting(true);

    try {
      const compositeUrl = await drawComposite({
        frame: selectedFrame,
        photos: capturedPhotos,
        filter: activeFilter,
        stickers: placedStickers,
        texts: placedTexts
      });
      setFinalCompositeImage(compositeUrl);

      // Increment frame download count in API
      try {
        await fetch(`${API_BASE_URL}/api/frames/${selectedFrame.id}/download`, {
          method: 'POST'
        });
      } catch (err) {
        console.warn('Analytics increment failed:', err);
      }

      setPage('result');
    } catch (err) {
      console.error('Failed to compile composite image:', err);
      alert('Gagal menyusun foto. Silakan coba kembali.');
    } finally {
      setIsExporting(false);
    }
  };

  // Define css image filters for live canvas previews
  const getFilterStyle = () => {
    if (activeFilter === 'instant-soft') return 'brightness(1.1) contrast(0.9) saturate(1.05)';
    if (activeFilter === 'warm-film') return 'sepia(35%) contrast(1.05) saturate(110%) brightness(102%)';
    if (activeFilter === 'muted-cream') return 'sepia(20%) contrast(90%) brightness(105%) saturate(85%) hue-rotate(-10deg)';
    if (activeFilter === 'pastel-soft') return 'brightness(105%) saturate(115%) contrast(95%) hue-rotate(5deg)';
    if (activeFilter === 'retro-matte') return 'contrast(80%) brightness(105%) saturate(90%) sepia(10%)';
    if (activeFilter === 'soft-grain') return 'contrast(85%) brightness(110%) saturate(95%)';
    if (activeFilter === 'soft-mono') return 'grayscale(100%) contrast(90%) brightness(105%)';
    if (activeFilter === 'film-noir') return 'grayscale(100%) contrast(140%) brightness(90%)';
    return 'none';
  };

  if (!selectedFrame) return null;

  return (
    <div className="container page-transition" style={{ paddingBottom: '80px' }}>
      {isExporting && (
        <div className="export-loading-overlay">
          <div className="export-loading-spinner" />
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-dark)' }}>
            Sedang Menyusun Momen Indahmu...
          </h2>
        </div>
      )}
      
      <div style={{ textAlign: 'center', margin: '24px 0' }}>
        <h1 style={{ fontSize: '32px' }}>Aesthetic Editor</h1>
        <p>Hias fotomu dengan filter, stiker lucu, dan tulisan cantik.</p>
      </div>

      <div className="editor-layout">
        
        {/* Left Column: Canvas Preview Board */}
        <div className="canvas-container">
          <div
            ref={containerRef}
            className="editor-interactive-canvas-wrapper"
            style={{
              width: `${displayWidth}px`,
              height: `${displayHeight}px`,
              backgroundColor: selectedFrame.bgColor
            }}
            onClick={() => setSelectedElementId(null)}
          >
            
            {/* 1. Captured Photo Slots with CSS Filter Applied */}
            {selectedFrame.slots.map((slot, idx) => {
              const photo = capturedPhotos[idx];
              const slotStyle = {
                position: 'absolute',
                left: `${slot.x * scale}px`,
                top: `${slot.y * scale}px`,
                width: `${slot.width * scale}px`,
                height: `${slot.height * scale}px`,
                borderRadius: `${20 * scale}px`,
                overflow: 'hidden'
              };

              return (
                <div key={idx} style={slotStyle}>
                  {photo && (
                    <img
                      src={photo}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: 'scaleX(-1)', // Mirrored selfie
                        filter: getFilterStyle()
                      }}
                      alt={`Captured Slot ${idx + 1}`}
                    />
                  )}
                </div>
              );
            })}

            {/* 2. Transparency cutout frame SVG layer */}
            <div className="booth-slot-overlay-wrapper">
              <img
                src={`${API_BASE_URL}${selectedFrame.overlay_image_url}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                alt="Frame Overlay"
              />
            </div>

            {/* 3. Drag and Drop Stickers Layer */}
            {placedStickers.map(sticker => {
              const isActive = selectedElementId === sticker.id;
              
              const stickerStyle = {
                left: `${(sticker.x) * scale}px`,
                top: `${(sticker.y) * scale}px`,
                width: `${100 * scale}px`,
                height: `${100 * scale}px`,
                transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale})`,
                zIndex: isActive ? 40 : 30
              };

              return (
                <div
                  key={sticker.id}
                  className={`editor-interactive-element ${isActive ? 'active' : ''}`}
                  style={stickerStyle}
                  onMouseDown={(e) => startInteraction(e, sticker, 'drag')}
                  onTouchStart={(e) => startInteraction(e, sticker, 'drag')}
                >
                  <img
                    src={sticker.url}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }}
                    alt={sticker.name}
                  />

                  {/* Drag Action Handles */}
                  {isActive && (
                    <>
                      <button
                        className="element-control-btn element-delete-btn"
                        onClick={(e) => { e.stopPropagation(); deleteSticker(sticker.id); }}
                      >
                        ×
                      </button>
                      <button
                        className="element-control-btn element-resize-btn"
                        onMouseDown={(e) => startInteraction(e, sticker, 'resize')}
                        onTouchStart={(e) => startInteraction(e, sticker, 'resize')}
                      >
                        ⤲
                      </button>
                      <button
                        className="element-control-btn element-rotate-btn"
                        onMouseDown={(e) => startInteraction(e, sticker, 'rotate')}
                        onTouchStart={(e) => startInteraction(e, sticker, 'rotate')}
                      >
                        ↻
                      </button>
                    </>
                  )}
                </div>
              );
            })}

            {/* 4. Drag and Drop Texts Layer */}
            {placedTexts.map(txt => {
              const isActive = selectedElementId === txt.id;
              
              const textStyle = {
                left: `${(txt.x) * scale}px`,
                top: `${(txt.y) * scale}px`,
                transform: `translate(-50%, -50%) rotate(${txt.rotation}deg) scale(${txt.scale})`,
                zIndex: isActive ? 42 : 32,
                cursor: 'move'
              };

              return (
                <div
                  key={txt.id}
                  className={`editor-interactive-element ${isActive ? 'active' : ''}`}
                  style={textStyle}
                  onMouseDown={(e) => startInteraction(e, txt, 'drag')}
                  onTouchStart={(e) => startInteraction(e, txt, 'drag')}
                >
                  <span
                    className="editor-custom-text-node"
                    style={{
                      color: txt.color,
                      fontSize: '22px'
                    }}
                  >
                    {txt.text}
                  </span>

                  {/* Handles */}
                  {isActive && (
                    <>
                      <button
                        className="element-control-btn element-delete-btn"
                        onClick={(e) => { e.stopPropagation(); deleteText(txt.id); }}
                      >
                        ×
                      </button>
                      <button
                        className="element-control-btn element-resize-btn"
                        onMouseDown={(e) => startInteraction(e, txt, 'resize')}
                        onTouchStart={(e) => startInteraction(e, txt, 'resize')}
                      >
                        ⤲
                      </button>
                      <button
                        className="element-control-btn element-rotate-btn"
                        onMouseDown={(e) => startInteraction(e, txt, 'rotate')}
                        onTouchStart={(e) => startInteraction(e, txt, 'rotate')}
                      >
                        ↻
                      </button>
                    </>
                  )}
                </div>
              );
            })}

          </div>
        </div>

        {/* Right Column: Customization Controls Panel */}
        <div className="editor-controls-column glass-panel">
          
          {/* 1. PHOTO FILTERS TAB */}
          <div className="control-section">
            <span className="control-section-title">
              <Wand2 size={14} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
              Pilih Filter Foto
            </span>
            <div className="filter-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[
                { id: 'normal', name: 'Original', gradient: 'linear-gradient(135deg, #e0e0e0, #888888)' },
                { id: 'instant-soft', name: 'Instant Soft', gradient: 'linear-gradient(135deg, #fffcf0, #ffd3b6)' },
                { id: 'warm-film', name: 'Warm Film', gradient: 'linear-gradient(135deg, #ffeaa7, #d88d55)' },
                { id: 'muted-cream', name: 'Muted Cream', gradient: 'linear-gradient(135deg, #f7f1e3, #8c7f68)' },
                { id: 'pastel-soft', name: 'Pastel Soft', gradient: 'linear-gradient(135deg, #ffeef8, #d49aeb)' },
                { id: 'retro-matte', name: 'Retro Matte', gradient: 'linear-gradient(135deg, #e2d4f0, #8b7d99)' },
                { id: 'soft-grain', name: 'Soft Grain', gradient: 'linear-gradient(135deg, #fafafa, #b5b5b5)' },
                { id: 'soft-mono', name: 'Soft Mono', gradient: 'linear-gradient(135deg, #eaeaea, #555555)' },
                { id: 'film-noir', name: 'Film Noir', gradient: 'linear-gradient(135deg, #888888, #111111)' }
              ].map(f => (
                <button
                  key={f.id}
                  className={`filter-btn ${activeFilter === f.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f.id)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '10px 4px', height: 'auto' }}
                >
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: f.gradient, border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                  <span style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. STICKER SELECTOR */}
          <div className="control-section">
            <span className="control-section-title">
              <Smile size={14} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
              Tambah Stiker Lucu
            </span>
            <p style={{ fontSize: '12px', marginBottom: '8px' }}>Pilih stiker di bawah ini untuk ditempelkan ke foto.</p>
            
            <div className="sticker-scroll-row">
              {['heart', 'sparkle', 'smile', 'cat-ears', 'sunglasses', 'crown'].map(name => (
                <button
                  key={name}
                  className="sticker-item-btn"
                  onClick={() => addSticker(name)}
                >
                  <img
                    src={`${API_BASE_URL}/api/stickers/${name}`}
                    className="sticker-svg-icon"
                    alt={name}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 3. CUSTOM TEXT TOOL */}
          <div className="control-section">
            <span className="control-section-title">
              <Type size={14} style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }} />
              Tambah Tulisan Custom
            </span>
            
            <form onSubmit={handleAddText} className="text-input-row" style={{ flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Ketik kata-kata manis..."
                  className="text-input-box"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px', borderRadius: '12px' }}>
                  Tambah
                </button>
              </div>

              {/* Color dot presets */}
              <div className="color-dot-row">
                {[
                  '#ca4b8c', // Brand Pink
                  '#7c3aed', // Purple
                  '#2563eb', // Blue
                  '#ffffff', // White
                  '#111111', // Black
                  '#ca8b1d', // Gold
                  '#ca1d1d'  // Red
                ].map(c => (
                  <button
                    type="button"
                    key={c}
                    className={`color-dot ${textColor === c ? 'active' : ''}`}
                    style={{ backgroundColor: c, border: c === '#ffffff' ? '2px solid #ccc' : '2px solid #fff' }}
                    onClick={() => setTextColor(c)}
                  />
                ))}
              </div>
            </form>
          </div>

          {/* Drag tips info */}
          <div style={{ marginTop: '12px', fontSize: '11px', background: 'rgba(255,255,255,0.4)', padding: '12px', borderRadius: '12px', color: 'var(--text-muted)' }}>
            💡 <strong>Tips:</strong> Klik stiker/tulisan yang sudah ditempel untuk memunculkan tombol hapus (×), putar (↻), atau atur ukuran (⤲).
          </div>

          {/* Export Action Button */}
          <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px', borderRadius: '16px', gap: '8px' }}
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Membuat Hasil Akhir...
                </>
              ) : (
                <>
                  Ekspor Foto
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
