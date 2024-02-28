'use client';
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Button } from '@/_components/ui/button';
import { useRouter } from 'next/navigation';
import Cropper from 'react-easy-crop';
import { useDebounceEffect } from './useDebounceEffect';
import { canvasPreview } from './canvasPreview';

export default function ZoomPage() {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [frameSize, setFrameSize] = useState<string>(null);
  const [bolbData, setBlobData] = useState<string>('');
  const [aspect, setAspect] = useState<number>(0);
  const blobUrlRef = useRef<string>('');
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cropData, setCropData] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useDebounceEffect(
    async () => {
      if (crop && imgRef.current && previewCanvasRef.current) {
        canvasPreview(imgRef.current, previewCanvasRef.current, crop);
      }
    },
    100,
    [crop]
  );

  const handlePreviewClick = async () => {
    const previewCanvas = previewCanvasRef.current;

    if (!previewCanvas) return;

    const requestData = {
      id: image && image.id,
      x: cropData.x,
      y: cropData.y,
      width: cropData.width,
      height: cropData.height,
    };

    try {
      // Send the data to the API endpoint
      const response = await fetch(`https://api.tasbirstory.com/system/api/user/create-temporary-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // Handle the response from the API
      if (response.ok) {
        // Successfully sent data to the API
        console.log('Image data sent successfully.');

        // Parse the API response to get the new image data
        const newImageData = await response.json();

        // Retrieve existing data from localStorage
        const existingData = localStorage.getItem('Images');

        const selectedItem = localStorage.getItem('SelectedImage');

        // Parse existing data into a variable (or initialize as an empty array if there is no existing data)
        const existingArray = existingData ? JSON.parse(existingData) : [];

        // Find the index of the item with the matching id in the array
        const index = existingArray.findIndex((item) => {
          console.log('Comparing:', item.id, newImageData.data.id);
          return item.id === newImageData.data.id;
        });

        console.log('index', index);

        // If the item is found, replace it with the new image data; otherwise, add the new image data to the array
        if (index !== -1) {
          existingArray[index] = newImageData.data;
        } else {
          existingArray.push(newImageData.data);
        }

        // Save the updated array back to localStorage
        localStorage.setItem('Images', JSON.stringify(existingArray));

        router.push(`/themes/view`);
      } else {
        // Handle error response from the API
        console.error('Error sending image data to the API:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error sending image data:', error);
    }
  };
  useEffect(() => {
    setSelectedFrame(localStorage.getItem('preference'));
    if (selectedFrame) {
      setFrameSize(JSON.parse(selectedFrame).size);
    }
    const selectedId = localStorage.getItem('SelectedImage');
    const storedImage = JSON.parse(localStorage.getItem('Images'));
    const selectedItem = storedImage.find((item) => item.id === parseInt(selectedId));
    console.log(storedImage);
    if (storedImage) {
      setImage(selectedItem);
    }
  }, []);
  function convertFractionString(input) {
    // Split the input string by '*'
    const parts = input.split('*');

    // Check if there are exactly two parts
    if (parts.length !== 2) {
      throw new Error('Invalid input format. Expected "a*b".');
    }

    // Format the result string
    const result = `${parts[0].trim()} / ${parts[1].trim()}`;

    return result;
  }

  useLayoutEffect(() => {
    console.log(frameSize);
    if (imageLoaded && imgRef.current) {
      setAspect(convertFractionString(frameSize));
    }
  }, [imageLoaded]);

  return (
    <div className="my-container flex justify-center items-center flex-col">
      <div className="mt-10 text-center items-center mb-10 relative w-96 h-96">
        {!!image && (
          <div className="items-center justify-center text-center border border-black">
            <Cropper
              image={image.image_path ? image.image_path : image.imagePath}
              crop={crop}
              zoom={zoom}
              // aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              aspect={14 / 15}
              showGrid={false}
              onCropComplete={(croppedArea, croppedAreaPixels) => {
                setCropData(croppedAreaPixels);
              }}
              // onMediaLoaded={(mediaSize) => {
              //   // handle media loaded if needed
              // }}
            />
          </div>
        )}
      </div>
      <div className="controls">
        <input
          type="range"
          value={zoom}
          min={1}
          max={4}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => {
            setZoom(e.target.value);
          }}
          className="zoom-range"
        />
      </div>
      <p className="md:text-md text-sm">Click and drag your photo to reposition.</p>
      {!!crop && (
        <>
          <div className="mt-4 relative bg-cover md:w-[500px] md:h-[300px] w-[200px] h-[200px] hidden">
            <canvas ref={previewCanvasRef} className="w-full h-full p-6 md:p-10 object-fit absolute inset-0 m-auto" />
          </div>

          <Button
            className="border border-orange-500 my-4 text-orange-500 hover:border-red-500 hover:text-red-500 rounded-full"
            onClick={handlePreviewClick}
          >
            Preview
          </Button>
        </>
      )}
    </div>
  );
}
