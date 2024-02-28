'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DynamicGrid = ({ images, border }) => {
  const theme = JSON.parse(localStorage.getItem('themeSelected'));
  const frame = JSON.parse(localStorage.getItem('preference'));
  const router = useRouter();
  const calculateColumns = () => {
    // You can customize this logic based on your requirements
    if (images.length >= 5) {
      return 5; // If you have 5 or more images, set 5 columns
    } else if (images.length >= 4) {
      return 4; // If you have 4 images, set 4 columns
    } else if (images.length >= 3) {
      return 3; // If you have 3 images, set 3 columns
    } else {
      return 2; // Default to 2 columns
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    try {
      // Create FormData to append each selected file
      const formData = new FormData();

      formData.append(`image[0]`, file);

      // Send the data to the API endpoint using FormData
      const response = await fetch(`https://api.tasbirstory.com/system/api/user/create-temporary-image`, {
        method: 'POST',
        body: formData,
      });

      // Handle the response from the API
      if (response.status === 200) {
        // Successfully sent data to the API
        const responseData = await response.json();

        // console.log(responseData);

        // Retrieve existing data from localStorage
        const existingData = localStorage.getItem('Images');

        // Parse existing data into a variable (or initialize as an empty array if there is no existing data)
        const existingArray = existingData ? JSON.parse(existingData) : [];

        // Concatenate the new response data to the existing array
        const updatedArray = existingArray.concat(responseData.data);

        // Save the updated array back to localStorage
        localStorage.setItem('Images', JSON.stringify(updatedArray));

        window.location.reload(true);
      } else {
        // Handle error response from the API
        console.error('Error uploading images to the API:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error uploading images:', error);
    }
  };

  const handleImageClick = (image) => {
    localStorage.setItem('SelectedImage', image);
  };

  return (
    <div
      className={`grid grid-cols-${calculateColumns()} gap-1 p-1 bg-white object-cover w-full h-full ${
        border ? 'border-8 gold-border' : ''
      }`}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden"
          style={{
            gridColumn: `span ${image.cols || 1}`,
            gridRow: `span ${image.rows || 1}`,
            paddingBottom: '100%', // Fixed aspect ratio (square, can be adjusted)
          }}
        >
          {theme.bg && (
            <div className="bg-[#f5efe3]">
              <img src={`/images/frames/${theme.imageName}`} />
            </div>
          )}
          {!image.src && !image.edited ? (
            <div className="w-full h-full object-cover">
              <label htmlFor="upload" className="cursor-pointer">
                <div className="absolute inset-0 object-cover w-full h-full border-dashed border-2 border-gray-300 p-4 flex items-center justify-center">
                  <input type="file" id="upload" className="hidden" accept="image/*" onChange={handleUpload} />
                  <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                      <svg
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        ></path>
                      </svg>
                    </p>
                  </div>
                </div>
              </label>
            </div>
          ) : (
            <Link href="zoom">
              {theme.bg ? (
                <img
                  onClick={() => handleImageClick(image.id)}
                  src={image.src === undefined ? image.edited.imagePath : image.src}
                  alt={`Image ${index + 1}`}
                  className="absolute inset-0"
                  style={{ width: '10.4rem', height: '8.8rem', top: '4.2rem', left: '3.6rem' }}
                />
              ) : (
                <img
                  onClick={() => handleImageClick(image.id)}
                  src={image.src === undefined ? image.edited.imagePath : image.src}
                  alt={`Image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicGrid;
