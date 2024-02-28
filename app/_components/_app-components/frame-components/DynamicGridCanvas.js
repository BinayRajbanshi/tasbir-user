// components/DynamicGridCanvas.js
import { useEffect, useRef } from 'react';

const DynamicGridCanvas = ({ themeData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop through themeData to draw images and frames
    themeData.forEach((theme, themeIndex) => {
      theme.forEach((image, imageIndex) => {
        const x = imageIndex * (canvas.width / theme.length);
        const y = themeIndex * (canvas.height / themeData.length);

        // Draw frame based on theme
        if (theme[themeIndex].bg) {
          // Draw background
          ctx.fillStyle = theme[themeIndex].bgColor || '#f5efe3';
          ctx.fillRect(x, y, canvas.width / theme.length, canvas.height / themeData.length);

          // Draw frame image
          const frameImage = new Image();
          frameImage.onload = function () {
            ctx.drawImage(frameImage, x, y, canvas.width / theme.length, canvas.height / themeData.length);

            // Draw image
            const img = new Image();
            img.onload = function () {
              // Adjust the position and dimensions based on your design
              ctx.drawImage(
                img,
                x + 10,
                y + 10,
                canvas.width / theme.length - 20,
                canvas.height / themeData.length - 20
              );
            };
            img.src = image.src;
          };
          frameImage.src = `/images/frames/Full-frame.png}`;
        } else {
          // Draw image without frame
          const img = new Image();
          img.onload = function () {
            // Adjust the position and dimensions based on your design
            ctx.drawImage(img, x, y, canvas.width / theme.length, canvas.height / themeData.length);
          };
          img.src = image.src;
        }
      });
    });
  }, [themeData]);

  return <canvas ref={canvasRef} width="800" height="600"></canvas>;
};

export default DynamicGridCanvas;
