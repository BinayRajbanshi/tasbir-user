// components/Collage.js
import { useEffect } from 'react';

const Collage = ({ canvas, collageConfig }) => {
  useEffect(() => {
    const ctx = canvas.getContext('2d');

    const loadImages = async () => {
      for (const config of collageConfig) {
        const { src, cols, rows } = config;
        const img = new Image();
        img.src = src;
        await img.decode();
        drawCollage(ctx, img, cols, rows);
      }
    };

    const drawCollage = (context, image, cols, rows) => {
      const canvasWidth = canvas.width / cols;
      const canvasHeight = canvas.height / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * canvasWidth;
          const y = j * canvasHeight;
          context.drawImage(image, x, y, canvasWidth, canvasHeight);
        }
      }
    };

    loadImages();
  }, [canvas, collageConfig]);

  return null;
};

export default Collage;
