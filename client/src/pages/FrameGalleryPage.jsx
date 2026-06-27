import React, { useState, useEffect } from 'react';
import { useBooth, API_BASE_URL } from '../context/BoothContext';
import { Search, Loader2 } from 'lucide-react';

function FrameCard({ frame, selectFrame }) {
  const [imgFailed, setImgFailed] = useState(false);

  let slotText = `${frame.photo_slot_count} Foto`;
  if (frame.layout_type === 'single') slotText = 'Polaroid (1 Foto)';
  else if (frame.layout_type === 'grid_2x2') slotText = 'Grid (4 Foto)';
  else if (frame.layout_type === 'strip_4') slotText = 'Strip (4 Foto)';

  return (
    <div
      className="glass-panel frame-card"
      onClick={() => selectFrame(frame)}
    >
      <div className="frame-card-preview" style={{ background: frame.bgColor }}>
        {!imgFailed ? (
          <img 
            src={`${API_BASE_URL}${frame.thumbnail_url}`}
            alt={frame.name}
            className="frame-svg-embed"
            onError={() => setImgFailed(true)}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <div 
            style={{ 
              width: '100%', 
              height: '100%', 
              border: `6px solid ${frame.textColor}`, 
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '12px',
              color: frame.textColor
            }}
            className="frame-local-preview-fallback"
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {Array(frame.photo_slot_count).fill(null).map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    border: `2px dashed ${frame.textColor}`, 
                    borderRadius: '4px',
                    opacity: 0.4,
                    flex: '1 1 30%',
                    aspectRatio: frame.layout_type === 'single' ? '1/1' : '4/3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px'
                  }}
                >
                  📷
                </div>
              ))}
            </div>
            <span style={{ fontSize: '10px', fontWeight: '800', textAlign: 'center', letterSpacing: '1px' }}>SNAPVIBE</span>
          </div>
        )}
      </div>
      
      <div className="frame-info">
        <div className="frame-meta-row">
          <h4 style={{ fontSize: '16px', fontWeight: '700' }}>{frame.name}</h4>
          <span className="frame-badge">{slotText}</span>
        </div>
        <p style={{ fontSize: '12px' }}>Dipakai {frame.download_count || 0} kali</p>
      </div>
    </div>
  );
}

export default function FrameGalleryPage() {
  const { categories, frames, selectFrame, loading } = useBooth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategorySlug, setActiveCategorySlug] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter frames based on active category tab and search input
  const filteredFrames = frames.filter(frame => {
    const matchesSearch = frame.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          frame.slug.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategorySlug === 'all') return matchesSearch;
    
    const targetCategory = categories.find(c => c.slug === activeCategorySlug);
    const matchesCategory = targetCategory ? frame.category_id === targetCategory.id : true;

    return matchesSearch && matchesCategory;
  });

  // Reset pagination on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeCategorySlug]);

  const totalPages = Math.ceil(filteredFrames.length / itemsPerPage);
  const paginatedFrames = filteredFrames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container gallery-section page-transition">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '8px' }}>Pilih Frame Terbaikmu</h1>
        <p>Ribuan kombinasi moment seru menantimu. Cari dan temukan layout yang cocok.</p>
      </div>

      {/* Search & Tabs Controls */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Category Tabs */}
          <div className="gallery-filters" style={{ margin: 0, border: 'none', padding: 0 }}>
            <button
              className={`filter-chip ${activeCategorySlug === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategorySlug('all')}
            >
              Semua
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-chip ${activeCategorySlug === category.slug ? 'active' : ''}`}
                onClick={() => setActiveCategorySlug(category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '260px' }} className="text-input-row">
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} 
            />
            <input
              type="text"
              placeholder="Cari template frame..."
              className="text-input-box"
              style={{ paddingLeft: '38px', borderRadius: '100px', width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* Loading state indicator */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '16px' }}>
          <Loader2 size={40} className="animate-spin" style={{ color: 'var(--brand-purple-dark)' }} />
          <p>Memuat galeri frame aesthetic...</p>
        </div>
      ) : (
        <>
          {filteredFrames.length === 0 ? (
            <div className="empty-gallery-state page-transition">
              <span className="empty-state-emoji">🔍✨</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700' }}>Waduh, frame belum tersedia...</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Kami tidak menemukan template frame dengan nama atau kategori tersebut.
              </p>
              <button 
                className="btn btn-secondary" 
                onClick={() => { setSearchTerm(''); setActiveCategorySlug('all'); }}
                style={{ marginTop: '8px', padding: '8px 20px', borderRadius: '100px', fontSize: '13px' }}
              >
                Lihat Semua Frame
              </button>
            </div>
          ) : (
            <>
              <div className="frames-grid">
                {paginatedFrames.map(frame => (
                  <FrameCard 
                    key={frame.id} 
                    frame={frame} 
                    selectFrame={selectFrame} 
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginTop: '48px', 
                  gap: '16px' 
                }}>
                  <p style={{ fontSize: '13px', color: '#666' }}>
                    Menampilkan <strong>{Math.min((currentPage - 1) * itemsPerPage + 1, filteredFrames.length)}</strong> - <strong>{Math.min(currentPage * itemsPerPage, filteredFrames.length)}</strong> dari <strong>{filteredFrames.length}</strong> template frame
                  </p>
                  
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage(p => Math.max(p - 1, 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="filter-chip"
                      style={{ 
                        borderRadius: '100px', 
                        padding: '8px 16px',
                        opacity: currentPage === 1 ? 0.4 : 1,
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      &larr; Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`filter-chip ${currentPage === page ? 'active' : ''}`}
                        style={{
                          width: '40px',
                          height: '40px',
                          padding: 0,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage(p => Math.min(p + 1, totalPages));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="filter-chip"
                      style={{ 
                        borderRadius: '100px', 
                        padding: '8px 16px',
                        opacity: currentPage === totalPages ? 0.4 : 1,
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Next &rarr;
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
