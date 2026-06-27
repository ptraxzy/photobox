import React, { createContext, useContext, useState, useEffect } from 'react';

const BoothContext = createContext();

export const API_BASE_URL = 'http://localhost:5001';

export function BoothProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [frames, setFrames] = useState([]);
  const [stickersList, setStickersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to read from sessionStorage
  const getSessionItem = (key, defaultValue) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // Active Booth State
  const [page, setPage] = useState(() => getSessionItem('sv_page', 'landing'));
  const [selectedFrame, setSelectedFrame] = useState(() => getSessionItem('sv_selectedFrame', null));
  const [capturedPhotos, setCapturedPhotos] = useState(() => getSessionItem('sv_capturedPhotos', []));
  const [activeFilter, setActiveFilter] = useState(() => getSessionItem('sv_activeFilter', 'normal'));
  
  // Editor State
  const [placedStickers, setPlacedStickers] = useState(() => getSessionItem('sv_placedStickers', []));
  const [placedTexts, setPlacedTexts] = useState(() => getSessionItem('sv_placedTexts', []));
  const [selectedElementId, setSelectedElementId] = useState(null); // No need to persist selection
  
  // Final Result State
  const [finalCompositeImage, setFinalCompositeImage] = useState(() => getSessionItem('sv_finalCompositeImage', null));

  // Sync state changes to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('sv_page', JSON.stringify(page));
  }, [page]);

  useEffect(() => {
    sessionStorage.setItem('sv_selectedFrame', JSON.stringify(selectedFrame));
  }, [selectedFrame]);

  useEffect(() => {
    sessionStorage.setItem('sv_capturedPhotos', JSON.stringify(capturedPhotos));
  }, [capturedPhotos]);

  useEffect(() => {
    sessionStorage.setItem('sv_activeFilter', JSON.stringify(activeFilter));
  }, [activeFilter]);

  useEffect(() => {
    sessionStorage.setItem('sv_placedStickers', JSON.stringify(placedStickers));
  }, [placedStickers]);

  useEffect(() => {
    sessionStorage.setItem('sv_placedTexts', JSON.stringify(placedTexts));
  }, [placedTexts]);

  useEffect(() => {
    sessionStorage.setItem('sv_finalCompositeImage', JSON.stringify(finalCompositeImage));
  }, [finalCompositeImage]);

  // Fetch initial metadata from Server API
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Categories
        const catRes = await fetch(`${API_BASE_URL}/api/categories`);
        const cats = await catRes.json();
        setCategories(cats);

        // Frames
        const frameRes = await fetch(`${API_BASE_URL}/api/frames`);
        const fms = await frameRes.json();
        setFrames(fms);

        // Stickers
        const stickRes = await fetch(`${API_BASE_URL}/api/stickers`);
        const sticks = await stickRes.json();
        setStickersList(sticks);
      } catch (err) {
        console.error('Error fetching SnapVibe metadata:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // When a frame is selected, initialize the captured photos array matching the slot count
  const selectFrame = (frame) => {
    setSelectedFrame(frame);
    setCapturedPhotos(Array(frame.photo_slot_count).fill(null));
    // Clear previous edits
    setActiveFilter('normal');
    setPlacedStickers([]);
    setPlacedTexts([]);
    setSelectedElementId(null);
    setFinalCompositeImage(null);
    setPage('booth'); // Auto advance to capture booth
  };

  const resetBooth = () => {
    setSelectedFrame(null);
    setCapturedPhotos([]);
    setActiveFilter('normal');
    setPlacedStickers([]);
    setPlacedTexts([]);
    setSelectedElementId(null);
    setFinalCompositeImage(null);
    setPage('gallery');
  };

  const setCapturedPhoto = (index, dataUrl) => {
    setCapturedPhotos(prev => {
      const copy = [...prev];
      copy[index] = dataUrl;
      return copy;
    });
  };

  // Sticker actions
  const addSticker = (name) => {
    const newSticker = {
      id: `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'sticker',
      name,
      url: `${API_BASE_URL}/api/stickers/${name}`,
      x: 100, // Initial center coordinates
      y: 100,
      scale: 1.0,
      rotation: 0 // In degrees
    };
    setPlacedStickers(prev => [...prev, newSticker]);
    setSelectedElementId(newSticker.id);
  };

  const updateSticker = (id, updates) => {
    setPlacedStickers(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteSticker = (id) => {
    setPlacedStickers(prev => prev.filter(item => item.id !== id));
    if (selectedElementId === id) setSelectedElementId(null);
  };

  // Text actions
  const addText = (text, color = '#ca4b8c') => {
    const newText = {
      id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: 'text',
      text,
      color,
      x: 150,
      y: 200,
      scale: 1.0,
      rotation: 0
    };
    setPlacedTexts(prev => [...prev, newText]);
    setSelectedElementId(newText.id);
  };

  const updateText = (id, updates) => {
    setPlacedTexts(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteText = (id) => {
    setPlacedTexts(prev => prev.filter(item => item.id !== id));
    if (selectedElementId === id) setSelectedElementId(null);
  };

  return (
    <BoothContext.Provider
      value={{
        categories,
        frames,
        stickersList,
        loading,
        
        page,
        setPage,
        
        selectedFrame,
        selectFrame,
        resetBooth,
        
        capturedPhotos,
        setCapturedPhoto,
        
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
        
        finalCompositeImage,
        setFinalCompositeImage
      }}
    >
      {children}
    </BoothContext.Provider>
  );

}

export function useBooth() {
  const context = useContext(BoothContext);
  if (!context) {
    throw new Error('useBooth must be used within a BoothProvider');
  }
  return context;
}
