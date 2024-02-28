// components/PictureFrame.js
import { useEffect, useRef } from 'react';

const PictureFrame = ({ imageUrls }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.onload = function () {
      // Draw background image
      ctx.drawImage(backgroundImage, 70, 70, canvas.width - 140, canvas.height - 140);

      // Load frame image
      const frameImage = new Image();
      frameImage.onload = function () {
        // Draw frame image
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

        // Calculate grid dimensions based on the number of images
        const rows = Math.ceil(Math.sqrt(imageUrls.length));
        const cols = Math.ceil(imageUrls.length / rows);

        // Calculate cell dimensions and margin
        const cellWidth = (canvas.width - 150) / cols;
        const cellHeight = (canvas.height - 150) / rows;
        const cellMargin = 10; // Adjust the margin as needed

        // Load and draw multiple images in a grid
        imageUrls.forEach((imageUrl, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;

          const x = 70 + col * (cellWidth + cellMargin);
          const y = 70 + row * (cellHeight + cellMargin);

          // Draw image
          const image = new Image();
          image.onload = function () {
            ctx.drawImage(image, x, y, cellWidth, cellHeight);
          };
          image.src = imageUrl;
        });
      };
      frameImage.src = '/images/frames/Full-frame.png'; // Replace with the actual path to your frame image
    };
    backgroundImage.src = 'https://t3.ftcdn.net/jpg/03/88/40/56/360_F_388405670_0CyoZYAqHUGJkwxWxq6FquVGjEv4UJ5K.jpg'; // Replace with the actual path to your background image
  }, [imageUrls]);

  return <canvas ref={canvasRef} width="400" height="400"></canvas>;
};

export default PictureFrame;
