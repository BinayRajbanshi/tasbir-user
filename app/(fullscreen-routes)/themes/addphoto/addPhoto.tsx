'use client';

import React, { ChangeEvent, useState, useLayoutEffect, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/_components/ui/button';
import { useRouter } from 'next/navigation';
import DropzoneUploader from '@/_components/_app-components/DropzoneUploder/index';

const AddPhoto = () => {
  const [images, setImages] = useState<string[]>([]); // Change from image to images
  const [showImages, setShowImages] = useState(false);
  const [imageUploded, setImageUploded] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState();
  const router = useRouter();

  useEffect(() => {
    setSelectedTheme(localStorage.getItem('themeSelected'));
    if (localStorage.getItem('Images')) {
      setImages(JSON.parse(localStorage.getItem('Images')));
    }
    localStorage.removeItem('Images');
  }, []);

  const handleFileUpload = async (selectedFiles: File[]) => {
    try {
      setLoading(true);
      // Create FormData to append each selected file
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`image[${i}]`, selectedFiles[i]);
        console.log(i);
      }

      // Send the data to the API endpoint using FormData
      const response = await fetch('https://api.tasbirstory.com/api/user/create-temporary-image', {
        method: 'POST',
        body: formData,
      });
      // Handle the response from the API
      if (response.status === 200) {
        // Successfully sent data to the API
        const responseData = await response.json();

        // Retrieve existing data from localStorage
        const existingData = localStorage.getItem('Images');

        // Parse existing data into a variable (or initialize as an empty array if there is no existing data)
        const existingArray = existingData ? JSON.parse(existingData) : [];

        // Concatenate the new response data to the existing array
        const updatedArray = existingArray.concat(responseData.data);

        // Save the updated array back to localStorage

        localStorage.setItem('Images', JSON.stringify(updatedArray));

        setShowImages(true);
        setLoading(false);
      } else {
        // Handle error response from the API
        console.error('Error uploading images to the API:', response.statusText);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error uploading images:', error);
    }
  };

  const handlePreviewChange = (previews: string[]) => {
    // Handle the preview data in the parent component
    console.log('Preview data changed:', previews);
    setImageUploded(previews.length);
  };

  const handleFramesClick = () => {
    router.push(`/themes/zoom`);
  };

  const handlePreview = () => {
    router.push(`/themes/view`);
  };

  return (
    <div className="my-container">
      {loading && (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white`}>
          <div className="bg-transparent rounded p-4 flex flex-col items-center">
            <img width={80} height={80} alt="tasbir's logo" src="/images/TasbirLogo.png" />
            <Loader2 className="h-8 w-8 animate-spin mt-5" />
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-4 items-center justify-center text-center ">
        <div className="flex flex-col space-y-4 items-center justify-center text-center mt-10 relative ">
          <p className="text-xl font-semibold cursor-pointer">Upload Your Photos</p>
          <p className="text-md font-normal cursor-pointer">
            Please pick {selectedTheme && JSON.parse(selectedTheme).imageCount} photo. The first{' '}
            {selectedTheme && JSON.parse(selectedTheme).imageCount} photo that you select will be uploaded. You can edit
            your creation further on the next screen.
          </p>
          <DropzoneUploader
            fileLimit={selectedTheme && JSON.parse(selectedTheme).imageCount}
            onPreviewChange={handlePreviewChange}
            onFileUpload={handleFileUpload}
          />
        </div>

        <div className="flex">
          <div className={`my-10 relative flex flex-col items-center justify-center text-center`}>
            {/* <div>
              
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="p-6 w-[350px] h-[350px] cursor-pointer"
                  onClick={handleFramesClick}
                />
              ))}
            </div> */}
            {selectedTheme && JSON.parse(selectedTheme).imageCount == imageUploded && (
              <Button
                className="border border-red-500 text-red-500 text3xl hover:border-orange-500 hover:text-orange-500 rounded-full "
                onClick={handlePreview}
              >
                Preview
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPhoto;
