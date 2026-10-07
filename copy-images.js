import fs from 'fs';
import path from 'path';

const sourceDir = path.join(process.cwd(), 'public', 'nm_extracted_images');
const destDir = path.join(process.cwd(), 'src', 'assets', 'images');

const mapping = {
  'page_01_image_01.png': '01-hero-township-dusk.jpg',
  'page_01_image_02.png': 'logo-nm-group.png',
  'page_02_image_01.png': '02-philosophy-nm-pride-gate.jpg',
  'page_03_image_01.png': '03-about-heritage-facade.jpg',
  'page_03_image_02.png': '03-about-masterplan-aerial.jpg',
  'page_03_image_03.png': '03-about-township-dusk-2.jpg',
  'page_04_image_01.png': '04-mission-courtyard.jpg',
  'page_05_image_01.png': '05-business-nm-verge.jpg',
  'page_05_image_02.png': '05-business-nm-london-villas.jpg',
  'page_06_image_01.png': '06-opportunities-verge-wide.jpg',
  'page_06_image_02.png': '06-opportunities-grande.jpg',
  'page_07_image_01.png': '07-architecture-heritage-dusk.jpg',
  'page_09_image_01.png': '09-founder-niket-mangal.jpg',
  'page_10_image_01.png': '10-ceo-priya-mangal.jpg',
  'page_11_image_01.png': '11-journey-nm-pride.jpg',
  'page_11_image_02.png': '11-journey-nm-heritage.jpg',
  'page_11_image_03.png': '11-journey-nm-hills.jpg',
  'page_12_image_01.png': '12-projects-heritage-wide.jpg',
  'page_12_image_02.png': '12-projects-verge.jpg',
  'page_12_image_03.png': '12-projects-london-villas.jpg',
  'page_12_image_04.png': '12-projects-pride.jpg',
  'page_13_image_01.png': '13-grande-elevation.jpg',
  'page_14_image_01.png': '14-upcoming-rajwada.jpg',
  'page_15_image_01.png': '15-lifestyle-family-walk.jpg',
  'page_15_image_02.png': '15-lifestyle-pride-masterplan.jpg',
  'page_15_image_03.png': '15-lifestyle-pride-entrance.jpg',
  'page_16_image_01.png': '16-inclusive-amenity-deck.jpg',
  'page_19_image_01.png': '19-testimonial-video-poster.jpg',
  'page_20_image_01.png': '20-awards-pride.jpg',
  'page_20_image_02.png': '20-awards-veda.jpg',
  'page_20_image_03.png': '20-awards-london-villas.jpg',
  'page_20_image_04.png': '20-awards-heritage-garden.jpg',
  'page_21_image_01.png': '21-foundation-classroom.jpg',
  'page_23_image_01.png': '23-journal-heritage.jpg',
  'page_23_image_02.png': '23-journal-verge.jpg',
  'page_23_image_03.png': '23-journal-courtyard.jpg',
  'page_24_image_01.png': '24-videos-pride-featured.jpg',
  'page_25_image_01.png': '25-careers-handshake.jpg',
  'page_27_image_01.png': '27-connect-office-bg.jpg'
};

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

let copied = 0;
let errors = 0;

for (const [srcName, destName] of Object.entries(mapping)) {
  const srcPath = path.join(sourceDir, srcName);
  const destPath = path.join(destDir, destName);
  
  if (fs.existsSync(srcPath)) {
    try {
      fs.copyFileSync(srcPath, destPath);
      copied++;
    } catch (e) {
      console.error(`Error copying ${srcName}:`, e.message);
      errors++;
    }
  } else {
    console.warn(`Source file not found: ${srcName}`);
    errors++;
  }
}

console.log(`Copied ${copied} files with ${errors} errors.`);
