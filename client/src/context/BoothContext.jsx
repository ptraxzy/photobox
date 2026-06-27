import React, { createContext, useContext, useState, useEffect } from 'react';

const BoothContext = createContext();

export const API_BASE_URL = 'http://localhost:5001';

export function BoothProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [frames, setFrames] = useState([]);
  const [stickersList, setStickersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active Booth State
  const [page, setPage] = useState('landing'); // landing, gallery, booth, editor, result
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]); // indices match slot_index
  const [activeFilter, setActiveFilter] = useState('normal'); // normal, grayscale, sepia, warm, cool, highcontrast
  
  // Editor State
  const [placedStickers, setPlacedStickers] = useState([]);
  const [placedTexts, setPlacedTexts] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null); // sticker id or text id
  
  // Final Result State
  const [finalCompositeImage, setFinalCompositeImage] = useState(null);

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
