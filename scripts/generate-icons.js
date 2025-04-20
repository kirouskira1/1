import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [192, 512];
const sourceIcon = join(__dirname, '../public/base-icon.svg');
const outputDir = join(__dirname, '../public');

async function generateIcons() {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  for (const size of sizes) {
    await sharp(sourceIcon)
      .resize(size, size)
      .png()
      .toFile(join(outputDir, `logo${size}.png`));
    console.log(`Generated ${size}x${size} icon`);
  }

  // Generate favicon.ico
  await sharp(sourceIcon)
    .resize(32, 32)
    .toFile(join(outputDir, 'favicon.ico'));
  console.log('Generated favicon.ico');
}

generateIcons().catch(console.error); 