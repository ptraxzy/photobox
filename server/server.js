import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'data', 'db.json');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
let tuguMalangBase64 = '';
try {
  const tuguPath = '/home/putra/Downloads/fremio-frames/tugu_malang_vintage_small.jpg';
  if (fs.existsSync(tuguPath)) {
    tuguMalangBase64 = fs.readFileSync(tuguPath).toString('base64');
  }
} catch (err) {
  console.error('Error reading Tugu Malang base64:', err);
}


const ARTIST_FRAMES_CONFIG = [
  {
    id: 'lany-blur-strip',
    name: 'LANY - a beautiful blur Blue Strip',
    slug: 'lany-a-beautiful-blur-blue-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#1d4ed8',
    textColor: '#ffffff',
    decorations: 'artist-lany-blur',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'lany-alonica-strip',
    name: 'LANY - Alonica Charcoal Strip',
    slug: 'lany-alonica-charcoal-strip',
    layout_type: 'strip_4',
    photo_slot_count: 3,
    width: 400,
    height: 1200,
    bgColor: '#111111',
    textColor: '#ffffff',
    decorations: 'artist-lany-alonica',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'lany-xxl-strip',
    name: 'LANY - XXL Minimal White Strip',
    slug: 'lany-xxl-minimal-white-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#fbfbfa',
    textColor: '#1d4ed8',
    decorations: 'artist-lany-xxl',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'swift-lover-polaroid',
    name: 'Taylor Swift - Lover Sky Polaroid',
    slug: 'taylor-swift-lover-sky-polaroid',
    layout_type: 'single',
    photo_slot_count: 1,
    width: 600,
    height: 700,
    bgColor: '#fce7f3',
    textColor: '#db2777',
    decorations: 'artist-swift-lover',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 520, "height": 520 }
    ]
  },
  {
    id: 'swift-red-polaroid',
    name: 'Taylor Swift - RED Classic Polaroid',
    slug: 'taylor-swift-red-classic-polaroid',
    layout_type: 'single',
    photo_slot_count: 1,
    width: 600,
    height: 700,
    bgColor: '#7f1d1d',
    textColor: '#ffffff',
    decorations: 'artist-swift-red',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 520, "height": 520 }
    ]
  },
  {
    id: 'swift-folklore-polaroid',
    name: 'Taylor Swift - Folklore Woods Polaroid',
    slug: 'taylor-swift-folklore-woods-polaroid',
    layout_type: 'single',
    photo_slot_count: 1,
    width: 600,
    height: 700,
    bgColor: '#e2e2dd',
    textColor: '#3f3f3a',
    decorations: 'artist-swift-folklore',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 520, "height": 520 }
    ]
  },
  {
    id: 'swift-1989-polaroid',
    name: 'Taylor Swift - 1989 Seagull Polaroid',
    slug: 'taylor-swift-1989-seagull-polaroid',
    layout_type: 'single',
    photo_slot_count: 1,
    width: 600,
    height: 700,
    bgColor: '#e0f2fe',
    textColor: '#0284c7',
    decorations: 'artist-swift-1989',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 520, "height": 520 }
    ]
  },
  {
    id: 'swift-midnights-grid',
    name: 'Taylor Swift - Midnights Starry Grid',
    slug: 'taylor-swift-midnights-starry-grid',
    layout_type: 'grid_2x2',
    photo_slot_count: 4,
    width: 800,
    height: 800,
    bgColor: '#0f172a',
    textColor: '#ca8b1d',
    decorations: 'artist-swift-midnights',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 1, "x": 420, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 2, "x": 40, "y": 420, "width": 340, "height": 340 },
      { "slot_index": 3, "x": 420, "y": 420, "width": 340, "height": 340 }
    ]
  },
  {
    id: 'coldplay-spheres-grid',
    name: 'Coldplay - Spheres Cosmos Grid',
    slug: 'coldplay-spheres-cosmos-grid',
    layout_type: 'grid_2x2',
    photo_slot_count: 4,
    width: 800,
    height: 800,
    bgColor: '#090514',
    textColor: '#38bdf8',
    decorations: 'artist-coldplay-spheres',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 1, "x": 420, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 2, "x": 40, "y": 420, "width": 340, "height": 340 },
      { "slot_index": 3, "x": 420, "y": 420, "width": 340, "height": 340 }
    ]
  },
  {
    id: 'coldplay-yellow-polaroid',
    name: 'Coldplay - Yellow Sky Polaroid',
    slug: 'coldplay-yellow-sky-polaroid',
    layout_type: 'single',
    photo_slot_count: 1,
    width: 600,
    height: 700,
    bgColor: '#fffdeb',
    textColor: '#ca8b1d',
    decorations: 'artist-coldplay-yellow',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 520, "height": 520 }
    ]
  },
  {
    id: 'newjeans-bunny-grid',
    name: 'NewJeans - OMG Bunnies Grid',
    slug: 'newjeans-omg-bunnies-grid',
    layout_type: 'grid_2x2',
    photo_slot_count: 4,
    width: 800,
    height: 800,
    bgColor: '#e0f2fe',
    textColor: '#0284c7',
    decorations: 'artist-newjeans-bunny',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 1, "x": 420, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 2, "x": 40, "y": 420, "width": 340, "height": 340 },
      { "slot_index": 3, "x": 420, "y": 420, "width": 340, "height": 340 }
    ]
  },
  {
    id: 'newjeans-ditto-strip',
    name: 'NewJeans - Ditto VHS Strip',
    slug: 'newjeans-ditto-vhs-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#f1f1f4',
    textColor: '#4b5563',
    decorations: 'artist-newjeans-ditto',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'wavetoearth-seasons-grid',
    name: 'wave to earth - Seasons Grid',
    slug: 'wave-to-earth-seasons-grid',
    layout_type: 'grid_2x2',
    photo_slot_count: 4,
    width: 800,
    height: 800,
    bgColor: '#fafaf6',
    textColor: '#476e55',
    decorations: 'artist-wavetoearth-seasons',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 1, "x": 420, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 2, "x": 40, "y": 420, "width": 340, "height": 340 },
      { "slot_index": 3, "x": 420, "y": 420, "width": 340, "height": 340 }
    ]
  },
  {
    id: 'rodrigo-guts-polaroid',
    name: 'Olivia Rodrigo - GUTS Polaroid',
    slug: 'olivia-rodrigo-guts-polaroid',
    layout_type: 'single',
    photo_slot_count: 1,
    width: 600,
    height: 700,
    bgColor: '#f3e8ff',
    textColor: '#7e22ce',
    decorations: 'artist-rodrigo-guts',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 520, "height": 520 }
    ]
  },
  {
    id: 'billie-ocean-strip',
    name: 'Billie Eilish - Ocean Eyes Strip',
    slug: 'billie-eilish-ocean-eyes-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#e0f2fe',
    textColor: '#0284c7',
    decorations: 'artist-billie-ocean',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'billie-hitme-grid',
    name: 'Billie Eilish - HIT ME HARD AND SOFT',
    slug: 'billie-eilish-hit-me-hard-and-soft',
    layout_type: 'grid_2x2',
    photo_slot_count: 4,
    width: 800,
    height: 800,
    bgColor: '#09152b',
    textColor: '#38bdf8',
    decorations: 'artist-billie-hitme',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 1, "x": 420, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 2, "x": 40, "y": 420, "width": 340, "height": 340 },
      { "slot_index": 3, "x": 420, "y": 420, "width": 340, "height": 340 }
    ]
  },
  {
    id: 'weeknd-afterhours-strip',
    name: 'The Weeknd - After Hours Strip',
    slug: 'the-weeknd-after-hours-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#090505',
    textColor: '#dc2626',
    decorations: 'artist-weeknd-afterhours',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'weeknd-starboy-grid',
    name: 'The Weeknd - Starboy Grid',
    slug: 'the-weeknd-starboy-grid',
    layout_type: 'grid_2x2',
    photo_slot_count: 4,
    width: 800,
    height: 800,
    bgColor: '#1e053a',
    textColor: '#d946ef',
    decorations: 'artist-weeknd-starboy',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 1, "x": 420, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 2, "x": 40, "y": 420, "width": 340, "height": 340 },
      { "slot_index": 3, "x": 420, "y": 420, "width": 340, "height": 340 }
    ]
  },
  {
    id: 'niki-buzz-strip',
    name: 'NIKI - Buzz Indigo Strip',
    slug: 'niki-buzz-indigo-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#0f172a',
    textColor: '#ca8b1d',
    decorations: 'artist-niki-buzz',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'lany-blur-grid',
    name: 'LANY - a beautiful blur Grid',
    slug: 'lany-a-beautiful-blur-grid',
    layout_type: 'grid_2x2',
    photo_slot_count: 4,
    width: 800,
    height: 800,
    bgColor: '#1d4ed8',
    textColor: '#ffffff',
    decorations: 'artist-lany-blur',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 1, "x": 420, "y": 40, "width": 340, "height": 340 },
      { "slot_index": 2, "x": 40, "y": 420, "width": 340, "height": 340 },
      { "slot_index": 3, "x": 420, "y": 420, "width": 340, "height": 340 }
    ]
  },
  {
    id: 'swift-lover-strip',
    name: 'Taylor Swift - Lover Strip',
    slug: 'taylor-swift-lover-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#fce7f3',
    textColor: '#db2777',
    decorations: 'artist-swift-lover',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'coldplay-yellow-strip',
    name: 'Coldplay - Yellow Strip',
    slug: 'coldplay-yellow-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#fffdeb',
    textColor: '#ca8b1d',
    decorations: 'artist-coldplay-yellow',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'wavetoearth-seasons-strip',
    name: 'wave to earth - Seasons Strip',
    slug: 'wave-to-earth-seasons-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#fafaf6',
    textColor: '#476e55',
    decorations: 'artist-wavetoearth-seasons',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'rodrigo-guts-strip',
    name: 'Olivia Rodrigo - GUTS Strip',
    slug: 'olivia-rodrigo-guts-strip',
    layout_type: 'strip_4',
    photo_slot_count: 4,
    width: 400,
    height: 1200,
    bgColor: '#f3e8ff',
    textColor: '#7e22ce',
    decorations: 'artist-rodrigo-guts',
    slots: [
      { "slot_index": 0, "x": 30, "y": 30, "width": 340, "height": 255 },
      { "slot_index": 1, "x": 30, "y": 315, "width": 340, "height": 255 },
      { "slot_index": 2, "x": 30, "y": 600, "width": 340, "height": 255 },
      { "slot_index": 3, "x": 30, "y": 885, "width": 340, "height": 255 }
    ]
  },
  {
    id: 'billie-hardsoft-polaroid',
    name: 'Billie Eilish - Hard & Soft Polaroid',
    slug: 'billie-eilish-hard-and-soft-polaroid',
    layout_type: 'single',
    photo_slot_count: 1,
    width: 600,
    height: 700,
    bgColor: '#09152b',
    textColor: '#38bdf8',
    decorations: 'artist-billie-hitme',
    slots: [
      { "slot_index": 0, "x": 40, "y": 40, "width": 520, "height": 520 }
    ]
  }
];

// Load data helper
function readData() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    const data = JSON.parse(raw);

    // 1. Add Artist Edition Category dynamically if missing
    const artistCategory = {
      id: "cat-artist",
      name: "Artist Collection",
      slug: "artist-collection",
      order: 1,
      is_active: true
    };
    if (!data.categories.some(c => c.id === 'cat-artist')) {
      data.categories.unshift(artistCategory);
    }

    // 2. Map and append curated artist frames
    const generated = ARTIST_FRAMES_CONFIG.map(cfg => ({
      id: `frame-artist-${cfg.id}`,
      category_id: 'cat-artist',
      name: cfg.name,
      slug: cfg.slug,
      thumbnail_url: `/api/frames/frame-artist-${cfg.id}/thumbnail`,
      overlay_image_url: `/api/frames/frame-artist-${cfg.id}/overlay`,
      layout_type: cfg.layout_type,
      photo_slot_count: cfg.photo_slot_count,
      width: cfg.width,
      height: cfg.height,
      bgColor: cfg.bgColor,
      textColor: cfg.textColor,
      decorations: cfg.decorations,
      is_premium: true,
      is_active: true,
      download_count: Math.floor(Math.random() * 200) + 120,
      slots: cfg.slots
    }));

    data.frames = [...data.frames, ...generated];
    return data;
  } catch (err) {
    console.error('Error reading db.json:', err);
    return { categories: [], frames: [], stickers: [] };
  }
}

// Write data helper
function writeData(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing db.json:', err);
  }
}

// SVG frames generator helpers
function getFrameOverlaySVG(frame, isThumbnail = false) {
  const { width, height, bgColor, textColor, decorations, slots } = frame;
  
  // Set scaling if thumbnail
  const svgWidth = isThumbnail ? Math.round(width * 0.3) : width;
  const svgHeight = isThumbnail ? Math.round(height * 0.3) : height;
  const scale = isThumbnail ? 0.3 : 1;

  // Mask to punch holes for pictures
  let maskContent = `<rect width="${width}" height="${height}" fill="white" />`;
  slots.forEach(slot => {
    maskContent += `<rect x="${slot.x}" y="${slot.y}" width="${slot.width}" height="${slot.height}" rx="20" ry="20" fill="black" />`;
  });

  // Dynamic Patterns definitions
  let patternsDefs = '';
  let fillBg = bgColor;

  if (decorations === 'retro-camera') {
    patternsDefs += `
      <pattern id="grille-texture" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#2d2a26" />
        <circle cx="5" cy="5" r="2.5" fill="#8c7a6b" opacity="0.45" />
        <circle cx="5" cy="5" r="1.2" fill="#d9c3b0" opacity="0.25" />
      </pattern>
    `;
    fillBg = 'url(#grille-texture)';
  } else if (decorations === 'malang-newspaper') {
    patternsDefs += `
      <pattern id="paper-texture" width="200" height="200" patternUnits="userSpaceOnUse">
        <rect width="200" height="200" fill="#faf6f0" />
        <path d="M0,50 Q80,45 200,60 M50,0 Q60,120 40,200" stroke="#e6dfd5" stroke-width="1.5" fill="none" opacity="0.8" />
      </pattern>
    `;
    fillBg = 'url(#paper-texture)';
  } else if (decorations === 'holiday-starter') {
    patternsDefs += `
      <pattern id="halftone" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1.5" fill="#1d4ed8" opacity="0.45" />
      </pattern>
    `;
    fillBg = '#dbeafe';
  } else if (decorations === 'cute-bunny') {
    patternsDefs += `
      <pattern id="bunny-dots" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="30" height="30" fill="#ffe4e6" />
        <circle cx="15" cy="15" r="3" fill="#f43f5e" opacity="0.15" />
      </pattern>
    `;
    fillBg = 'url(#bunny-dots)';
  } else if (decorations === 'cute-panda') {
    patternsDefs += `
      <pattern id="panda-leaves" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="#ecfdf5" />
        <path d="M10,10 C15,5 25,5 20,15 C15,25 5,15 10,10 Z" fill="#047857" opacity="0.1" />
      </pattern>
    `;
    fillBg = 'url(#panda-leaves)';
  } else if (decorations === 'cute-cat') {
    patternsDefs += `
      <pattern id="cat-hearts" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="#fefce8" />
        <path d="M12,12 C8,8 0,12 8,20 C16,12 8,8 12,12 Z" fill="#ca8a04" opacity="0.08" />
      </pattern>
    `;
    fillBg = 'url(#cat-hearts)';
  } else if (decorations === 'y2k-cherries') {
    patternsDefs += `
      <pattern id="cherry-pat" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="#f3e8ff" />
        <circle cx="20" cy="20" r="3" fill="#ec4899" opacity="0.15" />
      </pattern>
    `;
    fillBg = 'url(#cherry-pat)';
  } else if (decorations === 'clouds-rainbow') {
    patternsDefs += `
      <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bae6fd" />
        <stop offset="100%" stop-color="#ddd6fe" />
      </linearGradient>
    `;
    fillBg = 'url(#cloud-grad)';
  } else if (decorations === 'postage-stripes') {
    patternsDefs += `
      <pattern id="postage-stripes" width="60" height="20" patternUnits="userSpaceOnUse">
        <rect width="30" height="20" fill="#6b1d1d" />
        <rect x="30" width="30" height="20" fill="#7ca2b8" />
      </pattern>
    `;
    fillBg = 'url(#postage-stripes)';
  } else if (decorations === 'y2k-checkerboard') {
    patternsDefs += `
      <pattern id="checkers" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#ffffff" />
        <rect x="20" width="20" height="20" fill="#222222" />
        <rect y="20" width="20" height="20" fill="#222222" />
        <rect x="20" y="20" width="20" height="20" fill="#ffffff" />
      </pattern>
    `;
    fillBg = 'url(#checkers)';
  } else if (decorations === 'indigo-ocean') {
    patternsDefs += `
      <pattern id="indigo-texture" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="#1e3a8a" />
        <circle cx="20" cy="20" r="2" fill="#3b82f6" opacity="0.3" />
        <circle cx="70" cy="60" r="3" fill="#3b82f6" opacity="0.3" />
      </pattern>
    `;
    fillBg = 'url(#indigo-texture)';
  } else if (decorations === 'strawberry-collage') {
    patternsDefs += `
      <pattern id="strawberry-pat" width="160" height="160" patternUnits="userSpaceOnUse">
        <rect width="160" height="160" fill="#f5f2eb" />
        <text x="10" y="20" font-family="serif" font-size="9" fill="#e2decb" opacity="0.8">LES FRAISES DE L'ETE</text>
        <text x="10" y="35" font-family="serif" font-size="7" fill="#e2decb" opacity="0.6">Le choix fraises de France, Choice Strawberry...</text>
        <path d="M120,80 C110,60 135,50 140,75 C140,90 120,95 120,80 Z" fill="#ef4444" opacity="0.15" />
        <circle cx="120" cy="65" r="2" fill="green" opacity="0.2" />
      </pattern>
      <pattern id="red-gingham" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="#ffffff" />
        <rect width="10" height="20" fill="#7f1d1d" opacity="0.4" />
        <rect width="20" height="10" fill="#7f1d1d" opacity="0.4" />
      </pattern>
    `;
    fillBg = 'url(#strawberry-pat)';
  } else if (decorations === 'gingham-picnic') {
    patternsDefs += `
      <pattern id="gingham-pat" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="#fcf3f3" />
        <rect width="20" height="40" fill="#ffccd5" opacity="0.65" />
        <rect width="40" height="20" fill="#ffccd5" opacity="0.65" />
      </pattern>
    `;
    fillBg = 'url(#gingham-pat)';
  } else if (decorations === 'newspaper') {
    patternsDefs += `
      <pattern id="news-pat" width="120" height="120" patternUnits="userSpaceOnUse">
        <rect width="120" height="120" fill="#f4eee1" />
        <line x1="60" y1="0" x2="60" y2="120" stroke="#dfd7c6" stroke-width="1" />
        <rect x="10" y="10" width="40" height="3" fill="#cbc0ac" />
        <rect x="10" y="18" width="35" height="3" fill="#cbc0ac" />
        <rect x="10" y="26" width="45" height="3" fill="#cbc0ac" />
        <rect x="70" y="40" width="40" height="3" fill="#cbc0ac" />
        <rect x="70" y="48" width="45" height="3" fill="#cbc0ac" />
        <rect x="70" y="56" width="38" height="3" fill="#cbc0ac" />
      </pattern>
    `;
    fillBg = 'url(#news-pat)';
  }

  // Decoration paths
  let decorContent = '';
  if (decorations === 'retro-camera') {
    let binderHoles = '';
    for (let hx = 90; hx <= 360; hx += 35) {
      binderHoles += `<rect x="${hx}" y="90" width="15" height="20" rx="3" ry="3" fill="#2d2a26" transform="rotate(-9, ${hx + 7}, 100)" />`;
    }
    
    decorContent = `
      <polygon points="40,120 400,60 440,380 80,440" fill="#fcfbf7" stroke="#e8e5d7" stroke-width="2" />
      ${binderHoles}
      
      <path d="M 110,0 Q 130,50 110,100 T 115,200 T 110,300" stroke="#473e35" stroke-width="3" fill="none" stroke-linecap="round" />
      <g transform="translate(85, 220) rotate(12)" fill="#1c1917" stroke="#333" stroke-width="2">
        <path d="M10,20 Q25,-10 40,-15 Q50,-10 45,20 L35,80 Q25,110 10,115 Q-5,110 -5,80 Z" />
        <ellipse cx="-2" cy="15" rx="15" ry="10" fill="#292524" />
        <ellipse cx="32" cy="95" rx="15" ry="10" fill="#292524" />
        <path d="M-8,15 Q5,5 15,15 Q25,5 38,15 L25,45 Z" fill="#f472b6" stroke="#db2777" stroke-width="1.5" />
      </g>
      
      <g transform="translate(45, 380) rotate(-6)">
        <rect x="0" y="0" width="220" height="310" fill="#faf6db" stroke="#ebdca5" stroke-width="2" rx="6" />
        <text x="20" y="45" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="34" fill="#b91c1c">1957</text>
        <line x1="20" y1="60" x2="200" y2="60" stroke="#b91c1c" stroke-width="2" />
        <text x="35" y="80" font-family="sans-serif" font-weight="bold" font-size="11" fill="#78350f">SUN.</text>
        <text x="115" y="80" font-family="sans-serif" font-weight="bold" font-size="11" fill="#78350f">MON.</text>
        <line x1="20" y1="90" x2="200" y2="90" stroke="#78350f" stroke-width="1.5" />
        
        <text x="35" y="135" font-family="serif" font-size="30" fill="#b91c1c" font-weight="bold" text-anchor="middle">7</text>
        <text x="35" y="200" font-family="serif" font-size="30" fill="#b91c1c" font-weight="bold" text-anchor="middle">14</text>
        <text x="35" y="265" font-family="serif" font-size="30" fill="#b91c1c" font-weight="bold" text-anchor="middle">21</text>
        <text x="115" y="135" font-family="serif" font-size="30" fill="#2d2a26" font-weight="bold" text-anchor="middle">8</text>
        <text x="115" y="200" font-family="serif" font-size="30" fill="#2d2a26" font-weight="bold" text-anchor="middle">15</text>
        <text x="115" y="265" font-family="serif" font-size="30" fill="#2d2a26" font-weight="bold" text-anchor="middle">22</text>
        
        <circle cx="160" cy="180" r="28" fill="#fbcfe8" stroke="#db2777" stroke-width="1" />
        <path d="M 132,180 Q 150,140 188,180" stroke="#222" stroke-width="3" fill="none" />
        <circle cx="140" cy="190" r="6" fill="#ef4444" />
        <circle cx="140" cy="190" r="2" fill="white" />
      </g>
      
      <g stroke="#78350f" stroke-width="3" fill="none">
        <rect x="238" y="248" width="284" height="444" fill="#a78bfa" opacity="0.05" />
        <rect x="238" y="248" width="284" height="444" stroke="#7c2d12" stroke-width="10" rx="20" ry="20" />
        <rect x="242" y="252" width="276" height="436" stroke="#ea580c" stroke-width="4" rx="16" ry="16" />
        
        <rect x="248" y="258" width="264" height="314" stroke="#451a03" stroke-width="3" />
        
        <rect x="243" y="568" width="274" height="118" fill="#ea580c" opacity="0.15" />
        <line x1="238" y1="568" x2="522" y2="568" stroke="#7c2d12" stroke-width="4" />
        
        <circle cx="310" cy="625" r="28" fill="#fddfcc" stroke="#7c2d12" stroke-width="2.5" />
        <circle cx="310" cy="625" r="10" fill="#f97316" stroke="#7c2d12" stroke-width="1.5" />
        <text x="310" y="628" font-family="sans-serif" font-size="8" font-weight="bold" fill="#7c2d12" text-anchor="middle">SET</text>
        
        <circle cx="385" cy="610" r="10" fill="#fddfcc" stroke="#7c2d12" stroke-width="1.5" />
        <text x="385" y="613" font-family="sans-serif" font-size="7" font-weight="bold" fill="#7c2d12" text-anchor="middle">M</text>
        <circle cx="445" cy="610" r="10" fill="#fddfcc" stroke="#7c2d12" stroke-width="1.5" />
        <text x="445" y="613" font-family="sans-serif" font-size="7" font-weight="bold" fill="#7c2d12" text-anchor="middle">W</text>
        
        <circle cx="385" cy="642" r="10" fill="#fddfcc" stroke="#7c2d12" stroke-width="1.5" />
        <text x="385" y="645" font-family="sans-serif" font-size="7" font-weight="bold" fill="#7c2d12" text-anchor="middle">T</text>
        <circle cx="445" cy="642" r="10" fill="#fddfcc" stroke="#7c2d12" stroke-width="1.5" />
        <text x="445" y="645" font-family="sans-serif" font-size="6" fill="#7c2d12" text-anchor="middle">DISP</text>
      </g>
      
      <g transform="translate(35, 740) scale(1.6)" fill="#fbcfe8" stroke="#db2777" stroke-width="1.5" opacity="0.95">
        <circle cx="20" cy="20" r="7" />
        <ellipse cx="11" cy="20" rx="6" ry="4.5" />
        <ellipse cx="23" cy="9" rx="5" ry="9" transform="rotate(20, 23, 9)" />
        <ellipse cx="17" cy="9" rx="5" ry="9" transform="rotate(-20, 17, 9)" />
        <ellipse cx="20" cy="33" rx="5" ry="8" />
        <ellipse cx="34" cy="38" rx="12" ry="7" />
        <ellipse cx="25" cy="51" rx="5" ry="9" />
        <ellipse cx="41" cy="51" rx="5" ry="9" />
      </g>
      
      <g transform="translate(430, 715) scale(1.5)">
        <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="#ec4899" stroke="#be185d" stroke-width="1.5" />
      </g>
      <g transform="translate(465, 740) scale(1.2)">
        <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="#a855f7" stroke="#7e22ce" stroke-width="1.5" />
      </g>
      <g transform="translate(415, 755) scale(1.3)">
        <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="#06b6d4" stroke="#0e7490" stroke-width="1.5" />
      </g>
    `;
  } else if (decorations === 'malang-newspaper') {
    decorContent = `
      <g stroke="#e2d9cd" stroke-width="2" fill="none">
        <path d="M10,0 L10,960 M530,0 L530,960" />
      </g>
      
      <g fill="#222" font-family="'Times New Roman', Times, serif" text-anchor="middle">
        <text x="${width/2}" y="50" font-size="14" letter-spacing="2" font-style="italic">ABOUT THE</text>
        <text x="${width/2}" y="95" font-size="44" font-weight="900" font-style="normal" letter-spacing="1">City series</text>
        <text x="100" y="90" font-size="14" font-weight="bold">VOL. 1</text>
        <text x="${width - 100}" y="90" font-size="14" font-weight="bold">SINCE 1880</text>
        <text x="170" y="90" font-size="20">*</text>
        <text x="${width - 170}" y="90" font-size="20">*</text>
        
        <line x1="20" y1="110" x2="${width - 20}" y2="110" stroke="#222" stroke-width="3" />
        <text x="${width/2}" y="220" font-size="100" font-weight="900" letter-spacing="6">MALANG</text>
        <line x1="20" y1="245" x2="${width - 20}" y2="245" stroke="#222" stroke-width="3" />
      </g>
      
      <g fill="#222" font-family="'Times New Roman', Times, serif">
        <rect x="380" y="300" width="140" height="420" fill="none" stroke="#222" stroke-width="1.5" />
        <rect x="380" y="300" width="140" height="40" fill="#333" />
        <text x="450" y="325" fill="white" font-size="13" font-weight="bold" text-anchor="middle" letter-spacing="1">ABOUT THE</text>
        <text x="450" y="338" fill="white" font-size="13" font-weight="bold" text-anchor="middle" letter-spacing="1">CITY</text>
        
        <text x="390" y="370" font-size="11" font-weight="bold" opacity="0.8">
          <tspan x="390" dy="0">known as the</tspan>
          <tspan x="390" dy="16">Parijs van Oost-</tspan>
          <tspan x="390" dy="16">Java, Malang</tspan>
          <tspan x="390" dy="16">offers a perfect</tspan>
          <tspan x="390" dy="16">harmony of cool</tspan>
          <tspan x="390" dy="16">mountain air, a</tspan>
          <tspan x="390" dy="16">beautiful breeze,</tspan>
          <tspan x="390" dy="16">rich legacy, and</tspan>
          <tspan x="390" dy="16">boundless history</tspan>
          <tspan x="390" dy="16">embedded in</tspan>
          <tspan x="390" dy="16">every corner of</tspan>
          <tspan x="390" dy="16">its streets. A city</tspan>
          <tspan x="390" dy="16">that knows how</tspan>
          <tspan x="390" dy="16">to slow down</tspan>
          <tspan x="390" dy="16">time amidst the</tspan>
          <tspan x="390" dy="16">hustle and bustle</tspan>
          <tspan x="390" dy="16">of modernity.</tspan>
        </text>
      </g>
      
      <g fill="#222" font-family="'Times New Roman', Times, serif">
        <rect x="160" y="740" width="205" height="200" fill="none" stroke="#222" stroke-width="1" />
        <text x="170" y="760" font-size="9" font-weight="bold" opacity="0.8">
          <tspan x="170" dy="0">Tugu Malang, located in the heart of</tspan>
          <tspan x="170" dy="14">Malang City, is a historic monument</tspan>
          <tspan x="170" dy="14">built in 1946 to symbolize Indonesian</tspan>
          <tspan x="170" dy="14">independence. Standing majestically in</tspan>
          <tspan x="170" dy="14">the middle of Alun-Alun Bundar,</tspan>
          <tspan x="170" dy="14">it is surrounded by a lotus pond and</tspan>
          <tspan x="170" dy="14">heritage buildings, serving as a silent</tspan>
          <tspan x="170" dy="14">witness to the long journey and</tspan>
          <tspan x="170" dy="14">patriotism of East Java. This place</tspan>
          <tspan x="170" dy="14">remains a timeless national landmark</tspan>
          <tspan x="170" dy="14">of Malang City.</tspan>
        </text>
      </g>
      
      <g fill="#222" font-family="'Times New Roman', Times, serif">
        <rect x="380" y="740" width="140" height="200" fill="none" stroke="#222" stroke-width="1.5" />
        <rect x="380" y="740" width="140" height="30" fill="#333" />
        <text x="450" y="760" fill="white" font-size="11" font-weight="bold" text-anchor="middle" letter-spacing="1">TUGU MALANG</text>
        
        <rect x="390" y="785" width="120" height="110" fill="#f4efe2" stroke="#222" stroke-width="1" />
        <image href="data:image/jpeg;base64,${tuguMalangBase64}" x="391" y="786" width="118" height="108" preserveAspectRatio="xMidYMid slice" />
      </g>
    `;
  } else if (decorations === 'holiday-starter') {
    decorContent = `
      <rect x="0" y="0" width="160" height="150" fill="url(#halftone)" />
      <rect x="${width - 160}" y="0" width="160" height="150" fill="url(#halftone)" />
      <rect x="0" y="0" width="${width}" height="150" fill="#1c55d0" />
      <text x="${width/2}" y="75" font-family="'Sacramento', 'Dancing Script', cursive" font-weight="bold" font-size="64" fill="#ffffff" text-anchor="middle">holiday</text>
      <text x="${width/2}" y="125" font-family="'Plus Jakarta Sans', 'Arial Black', sans-serif" font-weight="900" font-size="28" letter-spacing="4" fill="#ffffff" text-anchor="middle">STARTER PACK</text>
      
      <text x="35" y="174" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#1c55d0">[POSE]</text>
      <text x="325" y="174" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#1c55d0">[POSE]</text>
      
      <text x="35" y="444" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#1c55d0">[SMILE]</text>
      <text x="325" y="444" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#1c55d0">[SMILE]</text>
      
      <text x="35" y="714" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#1c55d0">[LAUGH]</text>
      <text x="325" y="714" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#1c55d0">[LAUGH]</text>
      
      <line x1="0" y1="430" x2="${width}" y2="430" stroke="#1c55d0" stroke-width="2.5" />
      <line x1="0" y1="700" x2="${width}" y2="700" stroke="#1c55d0" stroke-width="2.5" />
      <line x1="0" y1="970" x2="${width}" y2="970" stroke="#1c55d0" stroke-width="2.5" />
      <line x1="${width/2}" y1="150" x2="${width/2}" y2="1000" stroke="#1c55d0" stroke-width="2.5" />
    `;
  } else if (decorations === 'cute-bunny') {
    decorContent = `
      <g transform="translate(${width/2}, 45)">
        <path d="M-20,-50 C-40,-10 -55,-25 -25,25 C-10,0 -5,-30 -20,-50 Z" fill="#ffffff" stroke="#e11d48" stroke-width="2.5" />
        <path d="M-18,-45 C-32,-15 -42,-25 -22,18 Z" fill="#ffb7b2" opacity="0.8" />
        <path d="M20,-50 C40,-10 55,-25 25,25 C10,0 5,-30 20,-50 Z" fill="#ffffff" stroke="#e11d48" stroke-width="2.5" />
        <path d="M18,-45 C32,-15 42,-25 22,18 Z" fill="#ffb7b2" opacity="0.8" />
        <ellipse cx="0" cy="25" rx="20" ry="12" fill="#ffffff" stroke="#e11d48" stroke-width="2.5" />
        <circle cx="-6" cy="23" r="2" fill="#222" />
        <circle cx="6" cy="23" r="2" fill="#222" />
        <path d="M-2,28 Q0,30 2,28" stroke="#e11d48" stroke-width="1.5" fill="none" />
      </g>
      
      <g transform="translate(15, 450) scale(0.8)">
        <path d="M12,2 C6,8 2,16 10,24 C18,32 26,24 22,12 C18,2 14,2 12,2 Z" fill="#f43f5e" />
        <circle cx="10" cy="10" r="1" fill="#fffdec" />
        <circle cx="15" cy="15" r="1" fill="#fffdec" />
        <circle cx="12" cy="18" r="1" fill="#fffdec" />
        <path d="M12,4 Q12,-4 8,-6 M12,4 Q15,-4 18,-6 M12,4 Q12,-8 12,-10" stroke="#059669" stroke-width="2" fill="none" />
      </g>
      
      <g transform="translate(${width - 35}, 750) scale(0.8)">
        <path d="M12,2 C6,8 2,16 10,24 C18,32 26,24 22,12 C18,2 14,2 12,2 Z" fill="#f43f5e" />
        <circle cx="10" cy="10" r="1" fill="#fffdec" />
        <circle cx="15" cy="15" r="1" fill="#fffdec" />
        <path d="M12,4 Q12,-4 8,-6 M12,4 Q15,-4 18,-6 M12,4 Q12,-8 12,-10" stroke="#059669" stroke-width="2" fill="none" />
      </g>
      
      <text x="${width/2}" y="${height - 25}" font-family="'Sacramento', 'Dancing Script', cursive" font-weight="bold" font-size="28" fill="#e11d48" text-anchor="middle">berry sweet</text>
    `;
  } else if (decorations === 'cute-panda') {
    decorContent = `
      <g transform="translate(${width - 80}, ${height - 80}) scale(1.4)">
        <circle cx="0" cy="0" r="28" fill="white" stroke="#047857" stroke-width="3" />
        <circle cx="-20" cy="-20" r="10" fill="#222" />
        <circle cx="20" cy="-20" r="10" fill="#222" />
        <ellipse cx="-8" cy="-2" rx="7" ry="9" fill="#222" transform="rotate(-15, -8, -2)" />
        <ellipse cx="8" cy="-2" rx="7" ry="9" fill="#222" transform="rotate(15, 8, -2)" />
        <circle cx="-7" cy="-2" r="2" fill="white" />
        <circle cx="7" cy="-2" r="2" fill="white" />
        <ellipse cx="0" cy="10" rx="4" ry="2.5" fill="#222" />
      </g>
      
      <g stroke="#047857" stroke-width="3" fill="none" stroke-linecap="round">
        <path d="M -10,30 Q 80,40 120,-10" />
        <path d="M 40,32 Q 50,15 70,25 Q 50,40 40,32 Z" fill="#34d399" stroke="#047857" stroke-width="1.5" />
        <path d="M 80,28 Q 95,10 110,20 Q 95,35 80,28 Z" fill="#34d399" stroke="#047857" stroke-width="1.5" />
      </g>
      
      <text x="140" y="${height - 40}" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="24" fill="#047857" text-anchor="middle">Panda Garden</text>
    `;
  } else if (decorations === 'cute-cat') {
    decorContent = `
      <g transform="translate(100, 32)" fill="white" stroke="#ca8a04" stroke-width="2">
        <circle cx="0" cy="0" r="12" />
        <circle cx="-10" cy="-10" r="6" />
        <circle cx="0" cy="-12" r="6" />
        <circle cx="10" cy="-10" r="6" />
      </g>
      <g transform="translate(${width - 100}, 32)" fill="white" stroke="#ca8a04" stroke-width="2">
        <circle cx="0" cy="0" r="12" />
        <circle cx="-10" cy="-10" r="6" />
        <circle cx="0" cy="-12" r="6" />
        <circle cx="10" cy="-10" r="6" />
      </g>
      
      <path d="M10,400 Q40,395 50,392 M10,410 Q40,410 50,410 M10,420 Q40,425 50,428" stroke="#ca8a04" stroke-width="2" fill="none" stroke-linecap="round" />
      <path d="M${width - 10},400 Q${width - 40},395 ${width - 50},392 M${width - 10},410 Q${width - 40},410 ${width - 50},410 M${width - 10},420 Q${width - 40},425 ${width - 50},428" stroke="#ca8a04" stroke-width="2" fill="none" stroke-linecap="round" />
      
      <g transform="translate(${width/2}, ${height - 60}) scale(1.1)" stroke="#ca8a04" stroke-width="2" fill="none">
        <rect x="-15" y="-10" width="30" height="35" fill="white" />
        <path d="M-15,-10 L0,-25 L15,-10 Z" fill="#fef08a" />
        <line x1="0" y1="-25" x2="0" y2="-10" />
        <circle cx="0" cy="10" r="4" fill="#f87171" stroke="#ca8a04" stroke-width="1.5" />
      </g>
      
      <text x="${width/2}" y="${height - 10}" font-family="'Outfit', sans-serif" font-weight="900" font-size="16" fill="#ca8a04" text-anchor="middle" letter-spacing="1">STUBBY MEOW</text>
    `;
  } else if (decorations === 'y2k-cherries') {
    decorContent = `
      <g transform="translate(60, 60) scale(1.3)">
        <circle cx="10" cy="30" r="10" fill="#db2777" />
        <circle cx="28" cy="34" r="10" fill="#db2777" />
        <path d="M10,20 Q22,4 22,-6 M28,24 Q22,4 22,-6" stroke="#22c55e" stroke-width="2.5" fill="none" />
        <path d="M22,-6 Q35,-15 40,-12" stroke="#22c55e" stroke-width="2" fill="none" />
      </g>
      <g transform="translate(${width - 90}, ${height - 130}) scale(1.3)">
        <circle cx="10" cy="30" r="10" fill="#db2777" />
        <circle cx="28" cy="34" r="10" fill="#db2777" />
        <path d="M10,20 Q22,4 22,-6 M28,24 Q22,4 22,-6" stroke="#22c55e" stroke-width="2.5" fill="none" />
        <path d="M22,-6 Q35,-15 40,-12" stroke="#22c55e" stroke-width="2" fill="none" />
      </g>
      
      <path d="M10,0 L12,4 L16,5 L12,6 L10,10 L8,6 L4,5 L8,4 Z" fill="#ec4899" transform="translate(320, 150) scale(2)" />
      <path d="M10,0 L12,4 L16,5 L12,6 L10,10 L8,6 L4,5 L8,4 Z" fill="#ec4899" transform="translate(60, 480) scale(1.5)" />
      <path d="M10,0 L12,4 L16,5 L12,6 L10,10 L8,6 L4,5 L8,4 Z" fill="#ec4899" transform="translate(320, 800) scale(1.8)" />
      
      <text x="${width/2}" y="${height - 20}" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#db2777" text-anchor="middle" letter-spacing="2">CHERRY BOMB</text>
    `;
  } else if (decorations === 'clouds-rainbow') {
    decorContent = `
      <path d="M 100,560 Q 300,420 500,560" stroke="#f43f5e" stroke-width="8" fill="none" opacity="0.6" />
      <path d="M 110,560 Q 300,432 490,560" stroke="#f59e0b" stroke-width="8" fill="none" opacity="0.6" />
      <path d="M 120,560 Q 300,444 480,560" stroke="#10b981" stroke-width="8" fill="none" opacity="0.6" />
      <path d="M 130,560 Q 300,456 470,560" stroke="#3b82f6" stroke-width="8" fill="none" opacity="0.6" />
      
      <g transform="translate(80, 520)" fill="white">
        <path d="M20,10 a10,10 0 0,1 18,-2 a8,8 0 0,1 11,8 a6,6 0 0,1 -6,6 h-23 a8,8 0 0,1 0,-12 z" />
        <circle cx="28" cy="14" r="1.5" fill="#222" />
        <circle cx="38" cy="14" r="1.5" fill="#222" />
        <circle cx="25" cy="16" r="2.5" fill="#f43f5e" opacity="0.6" />
        <circle cx="41" cy="16" r="2.5" fill="#f43f5e" opacity="0.6" />
      </g>
      
      <g transform="translate(420, 525)" fill="white">
        <path d="M20,10 a10,10 0 0,1 18,-2 a8,8 0 0,1 11,8 a6,6 0 0,1 -6,6 h-23 a8,8 0 0,1 0,-12 z" />
        <circle cx="28" cy="14" r="1.5" fill="#222" />
        <circle cx="38" cy="14" r="1.5" fill="#222" />
        <circle cx="25" cy="16" r="2.5" fill="#f43f5e" opacity="0.6" />
        <circle cx="41" cy="16" r="2.5" fill="#f43f5e" opacity="0.6" />
      </g>
      
      <path d="M10,0 L12,4 L16,5 L12,6 L10,10 L8,6 L4,5 L8,4 Z" fill="white" opacity="0.9" transform="translate(200, 100) scale(1.5)" />
      <path d="M10,0 L12,4 L16,5 L12,6 L10,10 L8,6 L4,5 L8,4 Z" fill="white" opacity="0.9" transform="translate(380, 120) scale(1.5)" />
      
      <text x="${width/2}" y="${height - 45}" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="24" fill="#0284c7" text-anchor="middle" letter-spacing="1">Dreamy Skies</text>
    `;
  } else if (decorations === 'postage-stripes') {
    let stampPanels = '';
    slots.forEach(slot => {
      const bx = slot.x - 12;
      const by = slot.y - 12;
      const bw = slot.width + 24;
      const bh = slot.height + 24;
      let circles = '';
      for (let cx = bx + 8; cx <= bx + bw - 8; cx += 16) {
        circles += `<circle cx="${cx}" cy="${by}" r="6" fill="url(#postage-stripes)" />`;
        circles += `<circle cx="${cx}" cy="${by + bh}" r="6" fill="url(#postage-stripes)" />`;
      }
      for (let cy = by + 8; cy <= by + bh - 8; cy += 16) {
        circles += `<circle cx="${bx}" cy="${cy}" r="6" fill="url(#postage-stripes)" />`;
        circles += `<circle cx="${bx + bw}" cy="${cy}" r="6" fill="url(#postage-stripes)" />`;
      }
      stampPanels += `
        <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#fffdeb" mask="url(#hole-mask)" />
        ${circles}
      `;
    });
    decorContent = `
      ${stampPanels}
      <rect x="0" y="860" width="${width}" height="140" fill="#fffdeb" />
      <text x="150" y="930" font-family="'Sacramento', 'Dancing Script', cursive" font-weight="bold" font-size="28" fill="#6b1d1d" text-anchor="middle">capture the moments</text>
      <text x="450" y="930" font-family="'Sacramento', 'Dancing Script', cursive" font-weight="bold" font-size="28" fill="#6b1d1d" text-anchor="middle">capture the moments</text>
      <line x1="0" y1="985" x2="${width}" y2="985" stroke="#222" stroke-width="4" stroke-dasharray="3,3" />
    `;
  } else if (decorations === 'y2k-checkerboard') {
    decorContent = `
      <rect x="0" y="660" width="${width}" height="140" fill="#15a34a" />
      <line x1="0" y1="660" x2="${width}" y2="660" stroke="black" stroke-width="6" />
      <text x="200" y="735" font-family="'Outfit', sans-serif" font-weight="900" font-size="40" fill="none" stroke="black" stroke-width="4" text-anchor="middle">SNAP UR JOY</text>
      <text x="600" y="735" font-family="'Outfit', sans-serif" font-weight="900" font-size="40" fill="none" stroke="black" stroke-width="4" text-anchor="middle">SNAP UR JOY</text>
      <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="#eab308" stroke="black" stroke-width="2.5" transform="translate(30, 680) scale(1.3)" />
      <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="#eab308" stroke="black" stroke-width="2.5" transform="translate(350, 680) scale(1.3)" />
      <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="#eab308" stroke="black" stroke-width="2.5" transform="translate(730, 680) scale(1.3)" />
    `;
  } else if (decorations === 'indigo-ocean') {
    decorContent = `
      <g transform="translate(640, 30) scale(1.6)" fill="#93c5fd" stroke="#1e3a8a" stroke-width="2">
        <circle cx="20" cy="20" r="10" fill="#dbeafe" />
        <circle cx="20" cy="5" r="8" />
        <circle cx="35" cy="12" r="8" />
        <circle cx="35" cy="28" r="8" />
        <circle cx="20" cy="35" r="8" />
        <circle cx="5" cy="28" r="8" />
        <circle cx="5" cy="12" r="8" />
        <circle cx="20" cy="20" r="4" fill="#ffffff" />
      </g>
      <path d="M10,5 L12,9 L16,10 L12,11 L10,15 L8,11 L4,10 L8,9 Z" fill="white" stroke="#1e3a8a" stroke-width="1.5" transform="translate(610, 60) scale(1.5)" />
      <path d="M10,5 L12,9 L16,10 L12,11 L10,15 L8,11 L4,10 L8,9 Z" fill="white" stroke="#1e3a8a" stroke-width="1.5" transform="translate(720, 140) scale(1.2)" />
      <g stroke="#93c5fd" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8">
        <path d="M 40,760 Q 40,700 60,680 T 80,640" />
        <path d="M 50,760 Q 70,720 70,700" />
        <path d="M 30,760 Q 20,730 35,710" />
      </g>
      <g transform="translate(80, 690) scale(1.5)" fill="#60a5fa" stroke="#1e3a8a" stroke-width="1.5">
        <path d="M 20,40 A 20,20 0 0,1 40,20 Q 30,0 20,20 Q 10,0 0,20 A 20,20 0 0,1 20,40 Z" />
      </g>
    `;
  } else if (decorations === 'avant-garde') {
    let topIcons = '';
    let bottomIcons = '';
    for (let bx = 30; bx < width; bx += 90) {
      topIcons += `<circle cx="${bx}" cy="20" r="7" fill="#eab308" stroke="#111" stroke-width="1.5" />`;
      topIcons += `<line x1="${bx}" y1="20" x2="${bx + 2}" y2="16" stroke="#111" stroke-width="1.5" />`;
      topIcons += `<rect x="${bx + 25}" y="12" width="18" height="13" fill="#15803d" stroke="#111" stroke-width="1.5" rx="1" />`;
      topIcons += `<line x1="${bx + 25}" y1="20" x2="${bx + 43}" y2="20" stroke="#111" stroke-width="1.5" />`;
      topIcons += `<rect x="${bx + 55}" y="12" width="12" height="12" fill="#b91c1c" stroke="#111" stroke-width="1.5" transform="rotate(45, ${bx + 61}, 18)" />`;
      
      bottomIcons += `<circle cx="${bx}" cy="${height - 20}" r="7" fill="#eab308" stroke="#111" stroke-width="1.5" />`;
      bottomIcons += `<line x1="${bx}" y1="${height - 20}" x2="${bx + 2}" y2="${height - 24}" stroke="#111" stroke-width="1.5" />`;
      bottomIcons += `<rect x="${bx + 25}" y="${height - 27}" width="18" height="13" fill="#15803d" stroke="#111" stroke-width="1.5" rx="1" />`;
      bottomIcons += `<line x1="${bx + 25}" y1="${height - 19}" x2="${bx + 43}" y2="${height - 19}" stroke="#111" stroke-width="1.5" />`;
      bottomIcons += `<rect x="${bx + 55}" y="${height - 27}" width="12" height="12" fill="#b91c1c" stroke="#111" stroke-width="1.5" transform="rotate(45, ${bx + 61}, ${height - 21})" />`;
    }
    decorContent = `
      <rect x="0" y="0" width="${width}" height="40" fill="#1d4ed8" />
      ${topIcons}
      <rect x="0" y="${height - 40}" width="${width}" height="40" fill="#1d4ed8" />
      ${bottomIcons}
      <g font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="72" fill="#111" opacity="0.95" letter-spacing="-3">
        <text x="80" y="160">Not</text>
        <text x="720" y="160" text-anchor="end">just</text>
        <text x="310" y="380" font-size="60">moments,</text>
        <text x="80" y="450">this</text>
        <text x="720" y="450" text-anchor="end" font-size="64">holiday</text>
        <text x="720" y="580" text-anchor="end" font-size="64">make</text>
        <text x="320" y="700" font-size="64">them real</text>
      </g>
      <text x="100" y="820" font-family="'Outfit', sans-serif" font-weight="800" font-size="28" fill="#111">with SnapVibe</text>
    `;
  } else if (decorations === 'strawberry-collage') {
    decorContent = `
      <rect x="30" y="170" width="240" height="610" fill="#7f1d1d" rx="10" ry="10" />
      <g transform="rotate(-6, 400, 360)">
        <rect x="285" y="245" width="220" height="230" fill="url(#red-gingham)" stroke="#7f1d1d" stroke-width="2" rx="6" ry="6" />
        <rect x="295" y="255" width="200" height="180" fill="#ffffff" />
      </g>
      <g transform="rotate(4, 400, 620)">
        <rect x="285" y="505" width="220" height="230" fill="url(#red-gingham)" stroke="#7f1d1d" stroke-width="2" rx="6" ry="6" />
        <rect x="295" y="515" width="200" height="180" fill="#ffffff" />
      </g>
      <g transform="translate(150, 770)">
        <rect x="-90" y="-20" width="180" height="40" fill="#ffffff" rx="20" ry="20" stroke="#7f1d1d" stroke-width="3" />
        <text x="0" y="8" font-family="'Sacramento', 'Dancing Script', cursive" font-weight="bold" font-size="22" fill="#7f1d1d" text-anchor="middle">Strawberry</text>
      </g>
      <g transform="translate(120, 110) scale(1.3)" fill="#7f1d1d" opacity="0.9">
        <circle cx="0" cy="0" r="16" fill="#f87171" stroke="#7f1d1d" stroke-width="2" />
        <ellipse cx="-6" cy="-18" rx="5" ry="12" fill="#f87171" stroke="#7f1d1d" stroke-width="2" transform="rotate(-10, -6, -18)" />
        <ellipse cx="6" cy="-18" rx="5" ry="12" fill="#f87171" stroke="#7f1d1d" stroke-width="2" transform="rotate(10, 6, -18)" />
      </g>
      <rect x="260" y="115" width="240" height="45" fill="#faf5e6" stroke="#15803d" stroke-width="2" rx="6" ry="6" />
      <line x1="260" y1="125" x2="500" y2="125" stroke="#15803d" stroke-dasharray="2,2" />
      <g transform="translate(380, 875)">
        <rect x="-70" y="-12" width="140" height="24" fill="#15803d" rx="4" ry="4" />
        <text x="0" y="5" font-family="sans-serif" font-weight="bold" font-size="10" fill="white" text-anchor="middle" letter-spacing="1">FAIRIES WELCOME</text>
      </g>
    `;
  } else if (decorations === 'stars') {
    decorContent = `
      <!-- Sparkle stars -->
      <path d="M15,5 L17.5,10 L23,11.5 L17.5,13 L15,18 L12.5,13 L7,11.5 L12.5,10 Z" fill="${textColor}" opacity="0.65" transform="translate(30, ${height - 60}) scale(1.5)" />
      <path d="M15,5 L17.5,10 L23,11.5 L17.5,13 L15,18 L12.5,13 L7,11.5 L12.5,10 Z" fill="${textColor}" opacity="0.65" transform="translate(${width - 60}, ${height - 60}) scale(1.5)" />
      <path d="M15,5 L16.5,8.5 L20,9.5 L16.5,10.5 L15,14 L13.5,10.5 L10,9.5 L13.5,8.5 Z" fill="${textColor}" opacity="0.5" transform="translate(15, 450) scale(1.2)" />
      <path d="M15,5 L16.5,8.5 L20,9.5 L16.5,10.5 L15,14 L13.5,10.5 L10,9.5 L13.5,8.5 Z" fill="${textColor}" opacity="0.5" transform="translate(${width - 35}, 700) scale(1.2)" />
    `;
  } else if (decorations === 'clouds') {
    decorContent = `
      <!-- Cute puffy clouds -->
      <g fill="${textColor}" opacity="0.55">
        <path d="M20,10 a10,10 0 0,1 18,-2 a8,8 0 0,1 11,8 a6,6 0 0,1 -6,6 h-23 a8,8 0 0,1 0,-12 z" transform="translate(20, ${height - 65}) scale(0.9)" />
        <path d="M20,10 a10,10 0 0,1 18,-2 a8,8 0 0,1 11,8 a6,6 0 0,1 -6,6 h-23 a8,8 0 0,1 0,-12 z" transform="translate(${width - 70}, ${height - 65}) scale(0.9)" />
      </g>
    `;
  } else if (decorations === 'camera') {
    decorContent = `
      <!-- Camera icon -->
      <g stroke="${textColor}" stroke-width="2.5" fill="none" opacity="0.75" transform="translate(${width/2 - 18}, ${height - 65}) scale(1.5)">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </g>
    `;
  } else if (decorations === 'tape') {
    decorContent = `
      <!-- Washi tape indicators -->
      <rect x="${width/2 - 50}" y="10" width="100" height="24" fill="#fcf6b1" opacity="0.7" transform="rotate(-3, ${width/2}, 20)" rx="2" />
      <rect x="${width/2 - 50}" y="${height - 70}" width="100" height="24" fill="#fcf6b1" opacity="0.7" transform="rotate(2, ${width/2}, ${height - 60})" rx="2" />
    `;
  } else if (decorations === 'floral') {
    decorContent = `
      <!-- Soft floral outlines -->
      <g stroke="${textColor}" stroke-width="2" fill="none" opacity="0.6" transform="translate(20, 20)">
        <circle cx="10" cy="10" r="8" />
        <path d="M10,2 Q10,6 10,10 T10,18 M2,10 Q6,10 10,10 T18,10" />
      </g>
      <g stroke="${textColor}" stroke-width="2" fill="none" opacity="0.6" transform="translate(${width - 40}, 20)">
        <circle cx="10" cy="10" r="8" />
        <path d="M10,2 Q10,6 10,10 T10,18 M2,10 Q6,10 10,10 T18,10" />
      </g>
      <g stroke="${textColor}" stroke-width="2" fill="none" opacity="0.6" transform="translate(${width - 40}, ${height - 40})">
        <circle cx="10" cy="10" r="8" />
        <path d="M10,2 Q10,6 10,10 T10,18 M2,10 Q6,10 10,10 T18,10" />
      </g>
      <g stroke="${textColor}" stroke-width="2" fill="none" opacity="0.6" transform="translate(20, ${height - 40})">
        <circle cx="10" cy="10" r="8" />
        <path d="M10,2 Q10,6 10,10 T10,18 M2,10 Q6,10 10,10 T18,10" />
      </g>
    `;
  } else if (decorations === 'balloons') {
    decorContent = `
      <!-- Party balloons -->
      <g fill="${textColor}" opacity="0.65" transform="translate(20, ${height - 70}) scale(1.2)">
        <ellipse cx="15" cy="15" rx="10" ry="14" />
        <path d="M15,29 L15,40" stroke="${textColor}" stroke-width="1.5" />
      </g>
      <g fill="${textColor}" opacity="0.65" transform="translate(${width - 50}, ${height - 70}) scale(1.2)">
        <ellipse cx="15" cy="15" rx="10" ry="14" />
        <path d="M15,29 L15,40" stroke="${textColor}" stroke-width="1.5" />
      </g>
    `;
  } else if (decorations === 'newspaper') {
    // Bandung retro news headers
    decorContent = `
      <g fill="${textColor}" opacity="0.8">
        <text x="${width/2}" y="35" font-family="'Outfit', sans-serif" font-weight="800" font-size="20" letter-spacing="4" text-anchor="middle">BANDUNG DAILY</text>
        <line x1="40" y1="42" x2="${width - 40}" y2="42" stroke="${textColor}" stroke-width="2" />
        <text x="50" y="785" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11">VOL. XII NO. 45 - 2026</text>
        <text x="${width - 50}" y="785" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="11" text-anchor="end">EDISI SPESIAL</text>
      </g>
    `;
  } else if (decorations === 'scrapbook') {
    // Scrapbook washi tape overlays placed directly over slot boundaries
    decorContent = `
      <!-- Corner Washi tape overlays -->
      <rect x="25" y="25" width="80" height="24" fill="#fcf6b1" opacity="0.6" transform="rotate(-15, 60, 30)" rx="1" />
      <rect x="${width - 105}" y="295" width="80" height="24" fill="#a8dadc" opacity="0.6" transform="rotate(10, ${width - 65}, 300)" rx="1" />
      <rect x="25" y="605" width="80" height="24" fill="#ffccd5" opacity="0.6" transform="rotate(-5, 60, 610)" rx="1" />
      <rect x="${width - 105}" y="905" width="80" height="24" fill="#fcf6b1" opacity="0.6" transform="rotate(12, ${width - 65}, 910)" rx="1" />
      
      <!-- Scrap stickers -->
      <circle cx="30" cy="480" r="10" fill="#fca5a5" opacity="0.7" />
      <path d="M30,473 L30,487 M23,480 L37,480" stroke="${textColor}" stroke-width="2" />
    `;
  } else if (decorations === 'ocean') {
    // Waves and sea stars
    decorContent = `
      <g stroke="${textColor}" fill="none" stroke-width="2" opacity="0.6">
        <!-- Wave top right -->
        <path d="M 720,40 Q 750,20 780,40 M 700,50 Q 740,25 780,55" />
        <!-- Starfish bottom left -->
        <path d="M 40,750 L 50,725 L 60,750 L 85,755 L 65,770 L 75,795 L 50,780 L 25,795 L 35,770 L 15,755 Z" fill="#ffb7b2" opacity="0.8" stroke-width="1.5" />
        <!-- Shell bottom right -->
        <path d="M 740,770 A 20,20 0 0,1 780,770 L 760,790 Z" fill="#ffdac1" opacity="0.8" stroke-width="1.5" />
      </g>
    `;
  } else if (decorations === 'navy-stars') {
    // Gold stars and constellations
    decorContent = `
      <g fill="${textColor}" stroke="${textColor}" stroke-width="1" opacity="0.75">
        <!-- Star constellations -->
        <line x1="40" y1="450" x2="70" y2="470" stroke-dasharray="2,2" />
        <line x1="70" y1="470" x2="50" y2="520" stroke-dasharray="2,2" />
        <circle cx="40" cy="450" r="3" />
        <circle cx="70" cy="470" r="4" />
        <circle cx="50" cy="520" r="3" />

        <!-- Starbursts -->
        <path d="M10,5 L12,9 L16,10 L12,11 L10,15 L8,11 L4,10 L8,9 Z" fill="${textColor}" transform="translate(${width - 40}, 450) scale(1.2)" stroke="none" />
        <path d="M10,5 L12,9 L16,10 L12,11 L10,15 L8,11 L4,10 L8,9 Z" fill="${textColor}" transform="translate(30, 750) scale(1.2)" stroke="none" />

        <!-- Moon bottom center -->
        <path d="M${width/2 - 12},${height - 75} A 15,15 0 1,0 ${width/2 + 12},${height - 75} A 12,12 0 1,1 ${width/2 - 12},${height - 75}" fill="${textColor}" stroke="none" transform="rotate(-20, ${width/2}, ${height - 75})" />
      </g>
    `;
  } else if (decorations === 'gingham-picnic') {
    // Picnic styles
    decorContent = `
      <!-- Picnic branding badge overlay -->
      <g fill="#ffffff" opacity="0.9" transform="translate(${width/2 - 60}, ${height - 65})">
        <rect width="120" height="32" rx="16" fill="white" stroke="${textColor}" stroke-width="2" />
        <text x="60" y="20" font-family="'Outfit', sans-serif" font-weight="800" font-size="11" fill="${textColor}" text-anchor="middle">PICNIC VIBE</text>
      </g>
      <!-- Small cherry/flowers -->
      <circle cx="35" cy="480" r="6" fill="#c24b4b" />
      <circle cx="45" cy="484" r="6" fill="#c24b4b" />
      <path d="M35,474 Q42,470 45,478" stroke="green" stroke-width="1.5" fill="none" />
    `;
  } else if (decorations === 'vinyl-record') {
    // Vinyl record in empty fourth slot
    decorContent = `
      <!-- Vinyl record peeking out of bottom right -->
      <g transform="translate(420, 420)">
        <!-- Outer record disc -->
        <circle cx="165" cy="165" r="150" fill="#111111" />
        <circle cx="165" cy="165" r="140" fill="none" stroke="#222" stroke-width="1.5" />
        <circle cx="165" cy="165" r="120" fill="none" stroke="#222" stroke-width="1" />
        <circle cx="165" cy="165" r="100" fill="none" stroke="#222" stroke-width="1.5" />
        <circle cx="165" cy="165" r="80" fill="none" stroke="#222" stroke-width="1" />
        
        <!-- Record label center -->
        <circle cx="165" cy="165" r="55" fill="#fca5a5" stroke="${textColor}" stroke-width="2" />
        <circle cx="165" cy="165" r="45" fill="none" stroke="${textColor}" stroke-width="1" stroke-dasharray="2,2" />
        
        <!-- Label branding text -->
        <text x="165" y="145" font-family="'Outfit', sans-serif" font-weight="800" font-size="9" fill="${textColor}" text-anchor="middle">RETRO BEAT</text>
        <text x="165" y="190" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="8" fill="${textColor}" text-anchor="middle">LP 33 RPM</text>
        
        <!-- Spindle center hole -->
        <circle cx="165" cy="165" r="10" fill="#dfd7c6" stroke="#444" stroke-width="1" />
      </g>
    `;
  } else if (decorations === 'purple-flowers') {
    decorContent = `
      <!-- Soft lilac flowers -->
      <g stroke="${textColor}" fill="none" stroke-width="1.5" opacity="0.7">
        <path d="M15,1150 Q20,1130 35,1140 T55,1120 Q60,1140 45,1150 Z" />
        <circle cx="35" cy="1140" r="3" fill="${textColor}" />
        <path d="M385,1150 Q380,1130 365,1140 T345,1120 Q340,1140 355,1150 Z" />
        <circle cx="365" cy="1140" r="3" fill="${textColor}" />
      </g>
    `;
  } else if (decorations === 'yellow-stars') {
    decorContent = `
      <!-- Shining stars -->
      <g fill="${textColor}" opacity="0.75" stroke="none">
        <path d="M15,5 L17.5,10 L23,11.5 L17.5,13 L15,18 L12.5,13 L7,11.5 L12.5,10 Z" transform="translate(15, 150) scale(1)" />
        <path d="M15,5 L17.5,10 L23,11.5 L17.5,13 L15,18 L12.5,13 L7,11.5 L12.5,10 Z" transform="translate(${width - 35}, 450) scale(1)" />
        <path d="M15,5 L17.5,10 L23,11.5 L17.5,13 L15,18 L12.5,13 L7,11.5 L12.5,10 Z" transform="translate(15, 750) scale(1)" />
        <path d="M15,5 L17.5,10 L23,11.5 L17.5,13 L15,18 L12.5,13 L7,11.5 L12.5,10 Z" transform="translate(${width - 35}, 1050) scale(1)" />
      </g>
    `;
  } else if (decorations === 'heart-strip') {
    decorContent = `
      <!-- Heart frames decoration -->
      <g fill="${textColor}" stroke="none" opacity="0.7">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" transform="translate(20, 1145) scale(1)" />
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" transform="translate(${width - 45}, 1145) scale(1)" />
      </g>
    `;
  } else if (decorations === 'journal-scrap') {
    decorContent = `
      <!-- Vintage stamps & notes -->
      <rect x="50" y="730" width="80" height="24" fill="#a8dadc" opacity="0.6" transform="rotate(-5)" rx="1" />
      <text x="90" y="746" font-family="'Outfit', sans-serif" font-weight="800" font-size="11" fill="${textColor}" text-anchor="middle">BOARDING PASS</text>
      <!-- Circular postmark -->
      <circle cx="700" cy="710" r="35" fill="none" stroke="${textColor}" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.6" />
      <circle cx="700" cy="710" r="28" fill="none" stroke="${textColor}" stroke-width="1" opacity="0.6" />
      <text x="700" y="714" font-family="'Outfit', sans-serif" font-weight="700" font-size="9" fill="${textColor}" text-anchor="middle" opacity="0.6">PASSPORT</text>
    `;
  } else if (decorations === 'film-sprockets') {
    // 35mm film tracks
    let sprocketHoles = '';
    for (let y = 20; y < height; y += 40) {
      sprocketHoles += `<rect x="15" y="${y}" width="15" height="20" rx="3" fill="#111" stroke="#333" stroke-width="1" />`;
      sprocketHoles += `<rect x="${width - 30}" y="${y}" width="15" height="20" rx="3" fill="#111" stroke="#333" stroke-width="1" />`;
    }
    decorContent = `
      <!-- Film track background columns -->
      <rect x="0" y="0" width="45" height="${height}" fill="#222" opacity="0.8" />
      <rect x="${width - 45}" y="0" width="45" height="${height}" fill="#222" opacity="0.8" />
      <!-- Sprocket holes -->
      ${sprocketHoles}
    `;
  } else if (decorations === 'postcard-stamp') {
    decorContent = `
      <!-- Vintage stamp print -->
      <g transform="translate(${width - 120}, 40)" opacity="0.7">
        <rect width="80" height="90" fill="none" stroke="${textColor}" stroke-width="3" stroke-dasharray="4,4" />
        <rect x="6" y="6" width="68" height="78" fill="none" stroke="${textColor}" stroke-width="1" />
        <circle cx="40" cy="45" r="20" fill="none" stroke="${textColor}" stroke-width="1.5" />
        <text x="40" y="49" font-family="'Outfit', sans-serif" font-weight="800" font-size="12" fill="${textColor}" text-anchor="middle">50c</text>
      </g>
    `;
  } else if (decorations === 'gold-leaves') {
    decorContent = `
      <!-- Elegant gold foliage branches in corners -->
      <g stroke="${textColor}" stroke-width="2" fill="none" opacity="0.75">
        <!-- Top Left -->
        <path d="M30,30 Q60,30 80,60" />
        <path d="M40,30 Q45,20 50,30" fill="${textColor}" />
        <path d="M60,30 Q65,20 70,30" fill="${textColor}" />
        <!-- Bottom Right -->
        <path d="M${width - 30},${height - 30} Q${width - 60},${height - 30} ${width - 80},${height - 60}" />
        <path d="M${width - 40},${height - 30} Q${width - 45},${height - 20} ${width - 50},${height - 30}" fill="${textColor}" />
        <path d="M${width - 60},${height - 30} Q${width - 65},${height - 20} ${width - 70},${height - 30}" fill="${textColor}" />
      </g>
    `;
  } else if (decorations === 'rose-petals') {
    decorContent = `
      <!-- Floating rose petal path drawings -->
      <g fill="${textColor}" stroke="none" opacity="0.65">
        <path d="M25,120 C20,110 35,100 40,115 C40,125 30,130 25,120 Z" />
        <path d="M365,520 C360,510 375,500 380,515 C380,525 370,530 365,520 Z" />
        <path d="M25,820 C20,810 35,800 40,815 C40,825 30,830 25,820 Z" />
      </g>
    `;
  } else if (decorations === 'eucalyptus') {
    decorContent = `
      <!-- Soft organic eucalyptus leaves -->
      <g fill="${textColor}" opacity="0.6">
        <!-- Top Right corner branch -->
        <path d="M${width - 20},20 Q${width - 80},50 ${width - 120},120" stroke="${textColor}" stroke-width="1.5" fill="none" />
        <ellipse cx="${width - 50}" cy="30" rx="10" ry="6" transform="rotate(20, ${width - 50}, 30)" />
        <ellipse cx="${width - 80}" cy="50" rx="12" ry="7" transform="rotate(35, ${width - 80}, 50)" />
        <ellipse cx="${width - 100}" cy="80" rx="14" ry="8" transform="rotate(50, ${width - 100}, 80)" />
      </g>
    `;
  } else if (decorations === 'confetti-dots') {
    decorContent = `
      <!-- Multi-color celebration confetti -->
      <g stroke="none" opacity="0.75">
        <circle cx="50" cy="400" r="8" fill="#ca4b8c" />
        <circle cx="80" cy="420" r="5" fill="#ca8b1d" />
        <circle cx="700" cy="410" r="10" fill="#2563eb" />
        <circle cx="730" cy="390" r="6" fill="#ca4b8c" />
        <circle cx="50" cy="780" r="8" fill="#2563eb" />
        <circle cx="730" cy="770" r="7" fill="#ca8b1d" />
      </g>
    `;
  } else if (decorations === 'neon-glow') {
    // Cyber neon glow frames
    decorContent = `
      <!-- Glowing outer layout strokes -->
      <rect x="15" y="15" width="${width - 30}" height="${height - 30}" fill="none" stroke="${textColor}" stroke-width="5" filter="drop-shadow(0 0 8px ${textColor})" />
      <text x="${width/2}" y="${height - 35}" font-family="'Outfit', sans-serif" font-weight="800" font-size="14" fill="${textColor}" letter-spacing="4" text-anchor="middle" filter="drop-shadow(0 0 4px ${textColor})">CYBERVIBE</text>
    `;
  } else if (decorations === 'rainbow-clouds') {
    decorContent = `
      <!-- Cute rainbow and clouds at the base -->
      <g opacity="0.7" transform="translate(${width/2 - 50}, ${height - 85}) scale(0.9)">
        <!-- Rainbow arches -->
        <path d="M10,60 A40,40 0 0,1 90,60" fill="none" stroke="#fca5a5" stroke-width="6" />
        <path d="M20,60 A30,30 0 0,1 80,60" fill="none" stroke="#fef08a" stroke-width="6" />
        <path d="M30,60 A20,20 0 0,1 70,60" fill="none" stroke="#93c5fd" stroke-width="6" />
        <!-- Fluffy clouds at ends -->
        <circle cx="10" cy="60" r="12" fill="white" />
        <circle cx="20" cy="64" r="8" fill="white" />
        <circle cx="80" cy="64" r="8" fill="white" />
        <circle cx="90" cy="60" r="12" fill="white" />
      </g>
    `;
  } else if (decorations.includes('artist-lany-blur')) {
    // electric cobalt blue / a beautiful blur theme
    fillBg = '#1d4ed8';
    decorContent = `
      <!-- a beautiful blur white stars -->
      <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="white" transform="translate(30, ${height - 65}) scale(1.4)" />
      <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="white" transform="translate(${width - 65}, ${height - 65}) scale(1.4)" />
      
      <!-- a beautiful blur script font -->
      <text x="${width/2}" y="${height - 65}" font-family="'Sacramento', 'Dancing Script', cursive" font-weight="bold" font-size="36" fill="white" text-anchor="middle">a beautiful blur</text>
    `;
  } else if (decorations.includes('artist-lany-alonica')) {
    // Charcoal alonica theme with center block lyrics divider
    fillBg = '#111111';
    decorContent = `
      <!-- Middle lyrics divider block -->
      <g transform="translate(15, 580)">
        <rect width="370" height="280" fill="#1d1d1d" rx="12" ry="12" />
        <rect width="370" height="280" fill="none" stroke="${textColor}" stroke-width="2" opacity="0.3" rx="12" ry="12" />
        
        <!-- alonica title -->
        <text x="185" y="100" font-family="'Sacramento', 'Dancing Script', cursive" font-weight="bold" font-size="44" fill="white" text-anchor="middle">alonica</text>
        
        <!-- album lyric -->
        <text x="185" y="150" font-family="'Outfit', sans-serif" font-weight="800" font-size="10" fill="white" letter-spacing="3" opacity="0.9" text-anchor="middle">LANY ✦ ALBUM THREE</text>
        <line x1="120" y1="170" x2="250" y2="170" stroke="white" stroke-width="1.5" opacity="0.3" />
        <text x="185" y="210" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="white" opacity="0.75" text-anchor="middle">"it's a beautiful blur, alonica..."</text>
      </g>
    `;
  } else if (decorations.includes('artist-lany-xxl')) {
    // white minimal frame with large cobalt blue handdrawn XXL signature logo
    fillBg = '#fafbfa';
    decorContent = `
      <!-- XXL logo text -->
      <text x="${width - 40}" y="${height - 50}" font-family="'Archivo Black', 'Outfit', sans-serif" font-weight="900" font-size="48" fill="#1d4ed8" text-anchor="end" letter-spacing="-2">XXL</text>
      <!-- Double thin outline borders -->
      <rect x="18" y="18" width="${width - 36}" height="${height - 36}" fill="none" stroke="#1d4ed8" stroke-width="2" opacity="0.25" />
    `;
  } else if (decorations.includes('artist-swift-lover')) {
    // Pastel cotton candy gradient background with custom script Lover
    patternsDefs += `
      <linearGradient id="swift-lover-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffccd5" />
        <stop offset="40%" stop-color="#fbcfe8" />
        <stop offset="100%" stop-color="#bfdbfe" />
      </linearGradient>
    `;
    fillBg = 'url(#swift-lover-grad)';
    decorContent = `
      <!-- Cursive Lover Script -->
      <text x="${width/2}" y="${height - 60}" font-family="'Sacramento', 'Dancing Script', cursive" font-weight="bold" font-size="44" fill="#db2777" filter="drop-shadow(0 0 4px rgba(219,39,119,0.4))" text-anchor="middle">Lover</text>
      
      <!-- Sparkle stars and hearts -->
      <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="#fbcfe8" opacity="0.8" transform="translate(40, ${height - 90}) scale(0.8)" />
      <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="#fbcfe8" opacity="0.8" transform="translate(${width - 60}, ${height - 90}) scale(0.8)" />
    `;
  } else if (decorations.includes('artist-swift-red')) {
    // Bold typewriter RED
    fillBg = '#7f1d1d';
    decorContent = `
      <text x="${width/2}" y="${height - 65}" font-family="'Courier New', Courier, monospace" font-weight="900" font-size="36" fill="white" letter-spacing="6" text-anchor="middle">RED</text>
      <text x="${width/2}" y="${height - 45}" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="8" fill="white" opacity="0.6" letter-spacing="3" text-anchor="middle">(TAYLOR'S VERSION)</text>
    `;
  } else if (decorations.includes('artist-swift-folklore')) {
    // Mossy wood folklore sketch border
    fillBg = '#e2e2dd';
    decorContent = `
      <!-- Pine tree branches silhouettes -->
      <g stroke="${textColor}" fill="none" stroke-width="1.5" opacity="0.35">
        <path d="M 25,100 L 25,180 M 15,120 L 35,120 M 10,140 L 40,140 M 5,160 L 45,160" />
        <path d="M ${width - 25},400 L ${width - 25},480 M ${width - 35},420 L ${width - 15},420 M ${width - 40},440 L ${width - 10},440" />
      </g>
      <!-- folklore typography -->
      <text x="${width/2}" y="${height - 60}" font-family="'Sacramento', 'Dancing Script', cursive" font-size="32" fill="${textColor}" text-anchor="middle">folklore</text>
    `;
  } else if (decorations.includes('artist-swift-1989')) {
    // Seagulls flying in light sky blue sky
    fillBg = '#e0f2fe';
    decorContent = `
      <!-- Seagulls vector outline -->
      <g stroke="${textColor}" stroke-width="2" fill="none" opacity="0.6">
        <path d="M30,80 Q45,65 60,80 Q75,65 90,80" transform="translate(10, 20) scale(0.6)" />
        <path d="M30,80 Q45,65 60,80 Q75,65 90,80" transform="translate(${width - 90}, 150) scale(0.5)" />
      </g>
      <!-- 1989 title -->
      <text x="${width/2}" y="${height - 60}" font-family="'Outfit', sans-serif" font-weight="900" font-size="28" fill="${textColor}" letter-spacing="4" text-anchor="middle">1989</text>
    `;
  } else if (decorations.includes('artist-swift-midnights')) {
    fillBg = '#0b132b';
    decorContent = `
      <!-- Gold starbursts -->
      <g fill="${textColor}" stroke="none" opacity="0.8">
        <path d="M10,5 L12,9 L16,10 L12,11 L10,15 L8,11 L4,10 L8,9 Z" transform="translate(30, 450) scale(1.3)" />
        <path d="M10,5 L12,9 L16,10 L12,11 L10,15 L8,11 L4,10 L8,9 Z" transform="translate(${width - 45}, 150) scale(1.3)" />
      </g>
      <!-- Midnights title -->
      <text x="${width/2}" y="${height - 60}" font-family="'Outfit', sans-serif" font-weight="800" font-size="24" fill="${textColor}" letter-spacing="2" text-anchor="middle">Midnights</text>
    `;
  } else if (decorations.includes('artist-coldplay-spheres')) {
    // Cosmic saturn orbit and stars
    fillBg = '#090514';
    decorContent = `
      <!-- Saturn planet -->
      <g stroke="${textColor}" fill="none" stroke-width="2" opacity="0.6" transform="translate(50, 40) scale(0.8)">
        <circle cx="40" cy="40" r="16" />
        <ellipse cx="40" cy="40" rx="30" ry="8" transform="rotate(-15, 40, 40)" />
      </g>
      <!-- Star constellations -->
      <circle cx="350" cy="740" r="1.5" fill="white" />
      <circle cx="320" cy="760" r="2.5" fill="white" />
      <line x1="350" y1="740" x2="320" y2="760" stroke="white" stroke-width="1.5" stroke-dasharray="2,2" opacity="0.4" />
    `;
  } else if (decorations.includes('artist-coldplay-yellow')) {
    fillBg = '#fffdeb';
    decorContent = `
      <!-- yellow star sparkles -->
      <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="${textColor}" opacity="0.6" transform="translate(40, 40) scale(1.2)" />
      <path d="M12,2 L15,9 L22,10 L17,15 L18,22 L12,18 L6,22 L7,15 L2,10 L9,9 Z" fill="${textColor}" opacity="0.6" transform="translate(${width - 60}, 450) scale(1.2)" />
      <!-- yellow lyrics -->
      <text x="${width/2}" y="${height - 60}" font-family="'Sacramento', 'Dancing Script', cursive" font-weight="bold" font-size="28" fill="${textColor}" text-anchor="middle">look how they shine for you</text>
    `;
  } else if (decorations.includes('artist-newjeans-bunny')) {
    fillBg = '#e0f2fe';
    decorContent = `
      <!-- Y2K pixel stars and bunnies -->
      <g fill="${textColor}" opacity="0.8">
        <!-- Bunny head vector lines -->
        <path d="M 30,1110 Q 25,1080 35,1090 Q 45,1080 40,1110 Q 45,1125 40,1135 Q 35,1145 30,1135 Z" fill="none" stroke="${textColor}" stroke-width="2.5" transform="translate(40, ${height - 180}) scale(1.5)" />
        <!-- Pixel star -->
        <rect x="${width - 70}" y="${height - 90}" width="15" height="15" fill="${textColor}" />
        <rect x="${width - 85}" y="${height - 90}" width="15" height="15" fill="${textColor}" opacity="0.4" />
      </g>
    `;
  } else if (decorations.includes('artist-newjeans-ditto')) {
    fillBg = '#ececf0';
    decorContent = `
      <!-- VHS record track details -->
      <g fill="${textColor}" opacity="0.7">
        <text x="35" y="45" font-family="'Courier New', monospace" font-weight="bold" font-size="10">PLAY ▷</text>
        <text x="${width - 35}" y="45" font-family="'Courier New', monospace" font-weight="bold" font-size="10" text-anchor="end">0:00:23</text>
      </g>
    `;
  } else if (decorations.includes('artist-wavetoearth-seasons')) {
    // Cream card with daisy sketches
    fillBg = '#fafaf6';
    decorContent = `
      <!-- Handdrawn daisies -->
      <g stroke="${textColor}" stroke-width="2" fill="none" opacity="0.6">
        <!-- Daisy bottom left -->
        <circle cx="60" cy="${height - 60}" r="14" />
        <circle cx="60" cy="${height - 60}" r="4" fill="${textColor}" />
        <path d="M60,${height - 85} L60,${height - 75} M60,${height - 45} L60,${height - 35} M35,${height - 60} L45,${height - 60} M75,${height - 60} L85,${height - 60}" />
      </g>
    `;
  } else if (decorations.includes('artist-rodrigo-guts')) {
    fillBg = '#f3e8ff';
    decorContent = `
      <!-- Safety pins sketch -->
      <g stroke="${textColor}" fill="none" stroke-width="2" opacity="0.7" transform="translate(30, 40) scale(0.9)">
        <rect width="12" height="30" rx="6" />
        <circle cx="6" cy="6" r="3" fill="${textColor}" />
      </g>
      <!-- GUTS blocky text -->
      <text x="${width/2}" y="${height - 60}" font-family="'Outfit', sans-serif" font-weight="900" font-size="28" fill="${textColor}" letter-spacing="4" text-anchor="middle">GUTS</text>
    `;
  } else if (decorations.includes('artist-billie-ocean')) {
    fillBg = '#e0f2fe';
    decorContent = `
      <!-- Tears teardrop vectors -->
      <g fill="${textColor}" opacity="0.5">
        <path d="M12,2 Q16,8 16,12 A4,4 0 0,1 8,12 Q8,8 12,2 Z" transform="translate(35, 45) scale(1.3)" />
        <path d="M12,2 Q16,8 16,12 A4,4 0 0,1 8,12 Q8,8 12,2 Z" transform="translate(${width - 55}, 450) scale(1.3)" />
      </g>
    `;
  } else if (decorations.includes('artist-billie-hitme')) {
    fillBg = '#09152b';
    decorContent = `
      <text x="${width/2}" y="${height - 60}" font-family="'Outfit', sans-serif" font-weight="900" font-size="20" fill="white" letter-spacing="2" text-anchor="middle">HIT ME HARD AND SOFT</text>
    `;
  } else if (decorations.includes('artist-weeknd-afterhours')) {
    fillBg = '#090505';
    decorContent = `
      <!-- Red sun silhouette outline -->
      <circle cx="${width/2}" cy="${height - 180}" r="60" fill="none" stroke="${textColor}" stroke-width="3" opacity="0.5" />
      <line x1="${width/2 - 80}" y1="${height - 180}" x2="${width/2 + 80}" y2="${height - 180}" stroke="${textColor}" stroke-width="2" opacity="0.5" />
    `;
  } else if (decorations.includes('artist-weeknd-starboy')) {
    fillBg = '#1e053a';
    decorContent = `
      <!-- Neon crosses -->
      <g fill="${textColor}" opacity="0.6">
        <path d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8 Z" transform="translate(40, 40) scale(1.3)" />
      </g>
    `;
  } else if (decorations.includes('artist-niki-buzz')) {
    fillBg = '#0f172a';
    decorContent = `
      <!-- Starbursts -->
      <path d="M10,5 L12,9 L16,10 L12,11 L10,15 L8,11 L4,10 L8,9 Z" fill="${textColor}" transform="translate(30, 450) scale(1.3)" />
    `;
  }

  // Branding text
  let brandingText = '';
  if (decorations.includes('artist-')) {
    const artist = decorations.split('-')[1].toUpperCase();
    const theme = decorations.split('-')[2].replace(/-/g, ' ').toUpperCase();
    brandingText = `<text x="${width/2}" y="${height - 22}" font-family="'Outfit', sans-serif" font-weight="900" font-size="13" fill="${textColor}" letter-spacing="3" text-anchor="middle">${artist} ✦ ${theme}</text>`;
  } else if (height > 800) {
    brandingText = `<text x="${width/2}" y="${height - 25}" font-family="'Plus Jakarta Sans', 'Outfit', sans-serif" font-weight="800" font-size="14" fill="${textColor}" letter-spacing="3" text-anchor="middle">SNAPVIBE ✦ MEMORIES</text>`;
  } else {
    brandingText = `<text x="${width/2}" y="${height - 20}" font-family="'Plus Jakarta Sans', 'Outfit', sans-serif" font-weight="800" font-size="15" fill="${textColor}" letter-spacing="3" text-anchor="middle">SNAPVIBE ✦ STUDIO</text>`;
  }

  // Standard outer frame borders
  const mainBorder = `<rect width="${width}" height="${height}" fill="none" stroke="${textColor}" stroke-width="12" />`;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${width} ${height}">
      <defs>
        <mask id="hole-mask">
          ${maskContent}
        </mask>
        ${patternsDefs}
      </defs>
      <!-- Base Background Card -->
      <rect width="${width}" height="${height}" fill="${fillBg}" mask="url(#hole-mask)" />
      
      <!-- Slot outlines (adds a very nice border around punched slots for photo alignment) -->
      ${slots.map(s => `<rect x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}" rx="20" ry="20" fill="none" stroke="${textColor}" stroke-width="4" opacity="0.3" />`).join('\n')}
      
      <!-- Outer Border -->
      ${mainBorder}
      
      <!-- Decorations Layer -->
      ${decorContent}
      
      <!-- Branding Logo Text -->
      ${brandingText}
    </svg>
  `.trim();
}

// Vector sticker generator helpers
function getStickerSVG(name) {
  let shapeContent = '';
  let viewSize = 100;
  
  if (name === 'heart') {
    shapeContent = `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ff4d6d" stroke="#ca1d3d" stroke-width="1.5" />`;
    viewSize = 24;
  } else if (name === 'sparkle') {
    shapeContent = `<path d="M15,5 L17.5,12.5 L25,15 L17.5,17.5 L15,25 L12.5,17.5 L5,15 L12.5,12.5 Z" fill="#ffd166" stroke="#ca9b2b" stroke-width="1.5" />`;
    viewSize = 30;
  } else if (name === 'smile') {
    shapeContent = `
      <circle cx="50" cy="50" r="45" fill="#ffd166" stroke="#ca9b2b" stroke-width="3" />
      <circle cx="35" cy="40" r="5" fill="#ca9b2b" />
      <circle cx="65" cy="40" r="5" fill="#ca9b2b" />
      <path d="M 30,60 A 20,20 0 0,0 70,60" fill="none" stroke="#ca9b2b" stroke-width="4" stroke-linecap="round" />
    `;
    viewSize = 100;
  } else if (name === 'cat-ears') {
    shapeContent = `
      <path d="M15 45 L5 10 L30 25 Z" fill="#ffccd5" stroke="#ff4d6d" stroke-width="3" stroke-linejoin="round" />
      <path d="M85 45 L95 10 L70 25 Z" fill="#ffccd5" stroke="#ff4d6d" stroke-width="3" stroke-linejoin="round" />
      <path d="M10 42 C20 40, 80 40, 90 42" fill="none" stroke="#ff4d6d" stroke-width="3" />
    `;
    viewSize = 100;
  } else if (name === 'sunglasses') {
    shapeContent = `
      <path d="M10 30 L40 30 L45 45 C45 55, 25 55, 20 45 Z" fill="#111" stroke="#333" stroke-width="2" />
      <path d="M90 30 L60 30 L55 45 C55 55, 75 55, 80 45 Z" fill="#111" stroke="#333" stroke-width="2" />
      <line x1="40" y1="35" x2="60" y2="35" stroke="#111" stroke-width="4" />
      <path d="M15 32 L5 25" fill="none" stroke="#111" stroke-width="3" />
      <path d="M85 32 L95 25" fill="none" stroke="#111" stroke-width="3" />
    `;
    viewSize = 100;
  } else if (name === 'crown') {
    shapeContent = `
      <path d="M10 80 L90 80 L80 30 L50 60 L20 30 Z" fill="#ffb703" stroke="#fb8500" stroke-width="3" stroke-linejoin="round" />
      <circle cx="20" cy="27" r="4" fill="#fb8500" />
      <circle cx="50" cy="57" r="4" fill="#fb8500" />
      <circle cx="80" cy="27" r="4" fill="#fb8500" />
    `;
    viewSize = 100;
  } else {
    // Fallback cute circle
    shapeContent = `<circle cx="25" cy="25" r="20" fill="#a8dadc" />`;
    viewSize = 50;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${viewSize}" height="${viewSize}" viewBox="0 0 ${viewSize} ${viewSize}">
      ${shapeContent}
    </svg>
  `.trim();
}

// API Routes
app.get('/api/categories', (req, res) => {
  const db = readData();
  res.json(db.categories.filter(c => c.is_active));
});

app.get('/api/frames', (req, res) => {
  const db = readData();
  const catSlug = req.query.category;
  
  let frames = db.frames.filter(f => f.is_active);
  if (catSlug) {
    const category = db.categories.find(c => c.slug === catSlug);
    if (category) {
      frames = frames.filter(f => f.category_id === category.id);
    } else {
      frames = [];
    }
  }
  res.json(frames);
});

app.get('/api/frames/:id', (req, res) => {
  const db = readData();
  const frame = db.frames.find(f => f.id === req.params.id);
  if (!frame) return res.status(404).json({ error: 'Frame not found' });
  res.json(frame);
});

// Serve Frame overlay image dynamically as SVG
app.get('/api/frames/:id/overlay', (req, res) => {
  const db = readData();
  const frame = db.frames.find(f => f.id === req.params.id);
  if (!frame) return res.status(444).send('Frame not found');

  const svg = getFrameOverlaySVG(frame, false);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

// Serve Frame thumbnail image dynamically as SVG
app.get('/api/frames/:id/thumbnail', (req, res) => {
  const db = readData();
  const frame = db.frames.find(f => f.id === req.params.id);
  if (!frame) return res.status(404).send('Frame not found');

  const svg = getFrameOverlaySVG(frame, true);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

// Serve scraped frames statically from Downloads directory
app.get('/api/scraped-frames/:filename', (req, res) => {
  const filename = req.params.filename;
  const safeFilename = path.basename(filename);
  const filePath = path.join('/home/putra/Downloads/fremio-frames', safeFilename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Scraped frame not found');
  }
});

// Serve Stickers dynamically as SVG
app.get('/api/stickers/:name', (req, res) => {
  const svg = getStickerSVG(req.params.name);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
});

app.get('/api/stickers', (req, res) => {
  const db = readData();
  res.json(db.stickers.filter(s => s.is_active));
});

// Post increment for frame downloads (analytics)
app.post('/api/frames/:id/download', (req, res) => {
  const db = readData();
  const idx = db.frames.findIndex(f => f.id === req.params.id);
  if (idx !== -1) {
    db.frames[idx].download_count = (db.frames[idx].download_count || 0) + 1;
    writeData(db);
    return res.json({ success: true, count: db.frames[idx].download_count });
  }
  res.status(404).json({ error: 'Frame not found' });
});

// Health check / welcome route
app.get('/', (req, res) => {
  res.send('SnapVibe API Server running successfully.');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[SnapVibe Server] Running on http://localhost:${PORT}`);
  });
}

module.exports = app;
