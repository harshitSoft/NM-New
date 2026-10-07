import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'assets', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const files = [
  '01-hero-township-dusk.jpg',
  '02-philosophy-nm-pride-gate.jpg',
  '03-about-heritage-facade.jpg',
  '03-about-masterplan-aerial.jpg',
  '03-about-township-dusk-2.jpg',
  '04-mission-courtyard.jpg',
  '05-business-nm-verge.jpg',
  '05-business-nm-london-villas.jpg',
  '06-opportunities-verge-wide.jpg',
  '06-opportunities-grande.jpg',
  '07-architecture-heritage-dusk.jpg',
  '09-founder-niket-mangal.jpg',
  '10-ceo-priya-mangal.jpg',
  '11-journey-nm-pride.jpg',
  '11-journey-nm-heritage.jpg',
  '11-journey-nm-hills.jpg',
  '12-projects-heritage-wide.jpg',
  '12-projects-verge.jpg',
  '12-projects-london-villas.jpg',
  '12-projects-pride.jpg',
  '13-grande-elevation.jpg',
  '14-upcoming-rajwada.jpg',
  '15-lifestyle-family-walk.jpg',
  '15-lifestyle-pride-masterplan.jpg',
  '15-lifestyle-pride-entrance.jpg',
  '16-inclusive-amenity-deck.jpg',
  '19-testimonial-video-poster.jpg',
  '20-awards-pride.jpg',
  '20-awards-veda.jpg',
  '20-awards-london-villas.jpg',
  '20-awards-heritage-garden.jpg',
  '21-foundation-classroom.jpg',
  '23-journal-heritage.jpg',
  '23-journal-verge.jpg',
  '23-journal-courtyard.jpg',
  '24-videos-pride-featured.jpg',
  '25-careers-handshake.jpg',
  '27-connect-office-bg.jpg',
  'logo-nm-group.png'
];

files.forEach(file => {
  const isPortrait = file.includes('founder') || file.includes('ceo');
  const width = isPortrait ? 600 : 1200;
  const height = isPortrait ? 800 : 800;
  const color = '#d1d5db';
  const textColor = '#4b5563';
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="${color}" />
    <text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
      ${file}
    </text>
  </svg>`;
  
  // Save as file. Even though they end in .jpg, the browser will render the SVG content if we save it as a text file.
  // Actually it's better to just write the SVG content directly.
  fs.writeFileSync(path.join(dir, file), svg);
});

console.log('Placeholders generated successfully.');
