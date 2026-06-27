import { API_BASE_URL } from '../context/BoothContext';

// Helper to load image in Promise format
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Prevent security tainted canvas issues
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export async function drawComposite({
  frame,
  photos, // Array of dataURLs
  filter, // normal, grayscale, sepia, etc.
  stickers, // Placed stickers
  texts // Placed texts
}) {
  const canvas = document.createElement('canvas');
  canvas.width = frame.width;
  canvas.height = frame.height;
  const ctx = canvas.getContext('2d');

  // 1. Draw frame background
  ctx.fillStyle = frame.bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw captured photos with filters applied
  for (let i = 0; i < frame.slots.length; i++) {
    const slot = frame.slots[i];
    const photoSrc = photos[i];
    if (!photoSrc) continue;

    try {
      const img = await loadImage(photoSrc);
      
      ctx.save();
      
      // Apply filters
      if (filter === 'instant-soft') {
        ctx.filter = 'brightness(110%) contrast(90%) saturate(105%)';
      } else if (filter === 'warm-film') {
        ctx.filter = 'sepia(35%) contrast(105%) saturate(110%) brightness(102%)';
      } else if (filter === 'muted-cream') {
        ctx.filter = 'sepia(20%) contrast(90%) brightness(105%) saturate(85%) hue-rotate(-10deg)';
      } else if (filter === 'pastel-soft') {
        ctx.filter = 'brightness(105%) saturate(115%) contrast(95%) hue-rotate(5deg)';
      } else if (filter === 'retro-matte') {
        ctx.filter = 'contrast(80%) brightness(105%) saturate(90%) sepia(10%)';
      } else if (filter === 'soft-grain') {
        ctx.filter = 'contrast(85%) brightness(110%) saturate(95%)';
      } else if (filter === 'soft-mono') {
        ctx.filter = 'grayscale(100%) contrast(90%) brightness(105%)';
      } else if (filter === 'film-noir') {
        ctx.filter = 'grayscale(100%) contrast(140%) brightness(90%)';
      }

      // Draw photo fitted into slot bounds
      ctx.drawImage(img, slot.x, slot.y, slot.width, slot.height);
      
      ctx.restore();
    } catch (err) {
      console.error(`Error rendering photo in slot ${i}:`, err);
    }
  }

  // 3. Draw frame transparency cutout overlay
  try {
    const overlayImg = await loadImage(`${API_BASE_URL}${frame.overlay_image_url}`);
    ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
  } catch (err) {
    console.error('Error drawing frame overlay:', err);
    // Draw basic fallback border outline if loading failed
    ctx.strokeStyle = frame.textColor;
    ctx.lineWidth = 12;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  // 4. Draw placed stickers
  for (const sticker of stickers) {
    try {
      const stickImg = await loadImage(sticker.url);
      ctx.save();
      
      // Move origin to sticker position
      ctx.translate(sticker.x, sticker.y);
      ctx.rotate((sticker.rotation * Math.PI) / 180);
      ctx.scale(sticker.scale, sticker.scale);
      
      // Draw centered (stickers have 100x100 intrinsic layout size on backend)
      ctx.drawImage(stickImg, -50, -50, 100, 100);
      
      ctx.restore();
    } catch (err) {
      console.error(`Error drawing sticker ${sticker.id}:`, err);
    }
  }

  // 5. Draw custom texts
  for (const textItem of texts) {
    ctx.save();
    
    ctx.translate(textItem.x, textItem.y);
    ctx.rotate((textItem.rotation * Math.PI) / 180);
    
    // Set dynamic font style
    const fontSize = Math.round(28 * textItem.scale);
    ctx.font = `800 ${fontSize}px "Outfit", "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = textItem.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Simple dark drop-shadow for visibility
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    
    ctx.fillText(textItem.text, 0, 0);
    
    ctx.restore();
  }

  return canvas.toDataURL('image/png');
}
