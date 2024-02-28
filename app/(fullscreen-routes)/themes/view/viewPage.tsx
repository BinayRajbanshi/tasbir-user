'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/_components/ui/button';
import { useRouter } from 'next/navigation';
import { AiOutlineStop } from 'react-icons/ai';
import { Loader2 } from 'lucide-react';
import DynamicGrid from '@/_components/_app-components/frame-components/DynamicGrid';
import axios from 'axios';
import { useToast } from '@/_components/ui/use-toast';
import PictureFrame from '@/_components/_app-components/frame-components/PictureFrame';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/_components/ui/resizable';

const ViewPage = ({ server }) => {
  const [image, setImage] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState('white');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState(1);
  const [background, setBackground] = useState<string | null>('white');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [userPref, setUserPref] = useState<string | null>(null);
  const [frame, setFrame] = useState<string | null>(null);
  const [variants, setVariants] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  // Function to toggle the checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const router = useRouter();

  const { toast } = useToast();

  const [selectedFrame, setSelectedFrame] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const [response, setResponse] = useState(null);
  const [token, setToken] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUserPref = JSON.parse(localStorage.getItem('preference'));
      setUserPref(storedUserPref);
      console.log('pref ', storedUserPref);

      const storedSelectedTheme = JSON.parse(localStorage.getItem('themeSelected'));
      setSelectedTheme(storedSelectedTheme);
      console.log('Frame ', storedSelectedTheme);

      const storedFrame = JSON.parse(localStorage.getItem('preference'));
      setFrame(storedFrame);
      console.log('pref ', storedFrame);

      const storedVariants = storedFrame && storedFrame.variants;
      setVariants(storedVariants);

      const storedSelectedFrame = storedFrame && storedFrame.size && storedFrame.size.files[0].baseImage;
      setSelectedFrame(storedSelectedFrame);
    }
  }, []);
  const handleFrameSelect = (frame) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const existingPreference = JSON.parse(localStorage.getItem('preference'));

      // Update the color value inside the preference object
      existingPreference.color = frame;

      // Update the selected frame in local storage
      localStorage.setItem('preference', JSON.stringify(existingPreference));
    }
    setSelectedFrame(frame.values[0].files[0].baseImage);
  };
  const getToken = async () => {
    try {
      const res = await axios.get('/api/cookie');
      if (res.status == 200) {
        setToken(res.data);
        console.log(res.data);
      }
    } catch (error) {
      return error;
    }
  };
  const addCartFunc = async (formData) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/cart/add-cart`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data) {
        toast({
          title: 'Added to cart',
          description: 'Your order has been added to cart!',
        });
        router.push(`/cart`);
      }
      console.log(data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
      // localStorage.removeItem('Images');
      // localStorage.removeItem('themeSelected');
      // localStorage.removeItem('preference');
      // localStorage.removeItem('SelectedImage');
    }
  };

  const addToCart = async () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const cartData = JSON.parse(localStorage.getItem('preference'));
        const images = JSON.parse(localStorage.getItem('Images'));

        const imagesData = [];

        // Append images to imagesData
        if (cartData && Array.isArray(images)) {
          images.forEach((image, index) => {
            imagesData.push({ position: index, imageId: image.id });
          });
        }
        const formData = {
          productId: cartData.id,
          variantId: cartData.color.id,
          variantValue: cartData.size.id,
          uploadedImages: imagesData,
          borderColor: background,
          hasInternalBorder: isChecked ? 1 : 0,
        };

        // console.log('procc', formData);

        // Make the API call using Axios to your new addToCart API route
        // const response = await axios.post('http://45.117.153.69:91/user/cart/add', formData, {
        //   withCredentials: true,
        // });
        addCartFunc(formData);

        // Handle the response
        // console.log(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendLogin = () => {
    router.push(`/login`);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedImage = localStorage.getItem('Images');

      const existingArray = storedImage ? JSON.parse(storedImage) : [];

      // Map through the existing array and extract the "image" key from each object
      const imageKeysArray = existingArray.map((item) => item);

      // Parse the string back into an array
      const storedImageArray = storedImage ? JSON.parse(storedImage) : [];
      setImage(imageKeysArray);
      setActiveTheme(storedImageArray.length);
      setActiveImage(storedImageArray.length);
      console.log('here ', imageKeysArray);

      const storedImage2 = localStorage.getItem('Image2');
      if (storedImage2) {
        setImageSrc(storedImage2);
      }

      const selectedThemeIndex = Math.min(storedImageArray.length, themeData.length - 1);
      const selectedTheme = themeData[selectedThemeIndex];
      console.log(selectedTheme); // result 2 (assuming storedImageArray has two elements)
      getToken();
    }
    console.log(background);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedImage = localStorage.getItem('Images');

      const storedImageArray = storedImage ? JSON.parse(storedImage) : [];

      handleImageClick(storedImageArray.length);
    }
  }, []);

  const handleImageClick = (imageIndex: string) => {
    setBackground(imageIndex);
  };

  const handleFramesClick1 = () => {
    router.push(`/themes/zoom`);
  };
  const handleFramesClick2 = () => {
    router.push(`/themes/zoom`);
  };

  // Grid 2
  const themeData = [
    [],
    [
      {
        id: image && image[0] && image[0].id,
        src: image && image[0] && image[0].image_path,
        edited: image && image[0] && image[0].editedImage,
        cols: 3,
        rows: 3,
      },
    ],
    [
      {
        id: image && image[0] && image[0].id,
        src: image && image[0] && image[0].image_path,
        edited: image && image[0] && image[0].editedImage,
        cols: 1,
        rows: 2,
      },
      {
        id: image && image[1] && image[1].id,
        src: image && image[1] && image[1] && image[1].image_path,
        edited: image && image[1] && image[1].editedImage,
        cols: 1,
        rows: 2,
      },
    ],
    [
      {
        id: image && image[0] && image[0].id,
        src: image && image[0] && image[0].image_path,
        edited: image && image[0] && image[0].editedImage,
        cols: 2,
        rows: 2,
      },
      {
        id: image && image[1] && image[1].id,
        src: image && image[1] && image[1].image_path,
        edited: image && image[1] && image[1].editedImage,
        cols: 1,
        rows: 1,
      },
      {
        id: image && image[2] && image[2].id,
        src: image && image[2] && image[2].image_path,
        edited: image && image[2] && image[2].editedImage,
        cols: 1,
        rows: 1,
      },
    ],
    [
      {
        id: image && image[0] && image[0].id,
        src: image && image[0] && image[0].image_path,
        edited: image && image[0] && image[0].editedImage,
        cols: 2,
        rows: 4,
      },
      {
        id: image && image[1] && image[1].id,
        src: image && image[1] && image[1].image_path,
        edited: image && image[1] && image[1].editedImage,
        cols: 2,
        rows: 4,
      },
      {
        id: image && image[2] && image[2].id,
        src: image && image[2] && image[2].image_path,
        edited: image && image[2] && image[2].editedImage,
        cols: 2,
        rows: 4,
      },
      {
        id: image && image[3] && image[3].id,
        src: image && image[3] && image[3].image_path,
        edited: image && image[3] && image[3].editedImage,
        cols: 2,
        rows: 4,
      },
    ],
    [
      {
        id: image && image[0] && image[0].id,
        src: image && image[0] && image[0].image_path,
        edited: image && image[0] && image[0].editedImage,
        cols: 4,
        rows: 4,
      },
      {
        id: image && image[1] && image[1].id,
        src: image && image[1] && image[1].image_path,
        edited: image && image[1] && image[1].editedImage,
        cols: 1,
        rows: 2,
      },
      {
        id: image && image[2] && image[2].id,
        src: image && image[2] && image[2].image_path,
        edited: image && image[2] && image[2].editedImage,
        cols: 1,
        rows: 2,
      },
      {
        id: image && image[3] && image[3].id,
        src: image && image[3] && image[3].image_path,
        edited: image && image[3] && image[3].editedImage,
        cols: 1,
        rows: 2,
      },
      {
        id: image && image[4] && image[4].id,
        src: image && image[4] && image[4].image_path,
        edited: image && image[4] && image[4].editedImage,
        cols: 1,
        rows: 2,
      },
    ],
  ];
  console.log(userPref);

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
      <div className="flex flex-col space-y-4 items-center justify-center text-center mt-8 ">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-4/6">
            <div
              className={`relative max-w-md group bg-${background} ${
                selectedTheme && selectedTheme.imageCount == '3'
                  ? `aspect-[${userPref?.size.size}] h-full`
                  : `aspect-[${userPref?.size.size}] h-auto`
              } overflow-hidden p-8 block mx-auto`}
            >
              {image && (
                <div className={`p-8 object-cover w-full h-full`}>
                  <DynamicGrid border={isChecked} images={themeData[activeTheme]} />
                </div>
              )}

              {/* <ResizablePanelGroup direction="horizontal" className="p-8 object-cover w-full h-full">
                <ResizablePanel defaultSize={50}>
                  <div className="flex object-cover w-full h-full items-center justify-center p-1">
                    <img className="object-cover w-full h-full" src={image && image[0].image_path} />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={25}>
                      <div className="flex object-cover w-full h-full items-center justify-center p-1 ">
                        <img className="object-cover w-full h-full " src={image && image[0].image_path} />
                      </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={75}>
                      <div className="flex object-cover w-full h-full items-center justify-center p-1 ">
                        <img className="object-cover w-full h-full" src={image && image[0].image_path} />
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup> */}

              <div className="absolute inset-0 flex items-start h-max justify-center z-[9] opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gray-800 text-white py-2 px-4 rounded relative">
                  Click on the image to edit
                  {/* Triangle Pointer */}
                  <div className="absolute left-1/2 bottom-[-15px] transform -translate-x-1/2 -mt-1 w-0 h-0 border-solid border-8 border-t-transparent border-l-transparent border-r-transparent border-b-gray-800 rotate-180"></div>
                </div>
              </div>

              {selectedFrame && (
                <img
                  src={`${selectedFrame}`} // Adjust the path to your frame images
                  alt="Selected Frame"
                  className="absolute inset-0 w-full h-full z-[2]"
                />
              )}
            </div>
            <p className="text-center w-full mt-8 text-gray-700 dark:text-gray-400">
              Note: Click on the image you want to crop
            </p>
          </div>
          <div className="md:w-2/6 mx-12">
            <div className="flex flex-col space-y-16">
              <p className="text-md font-regular ml-5 mt-4 mb-5 text-gray-400 w-max">Change Frame</p>
              <div className="flex space-x-4">
                {variants &&
                  variants.map((item) => (
                    <div
                      onClick={() => handleFrameSelect(item.variant)}
                      className={`frame-selector cursor-pointer ${
                        selectedFrame === item.variant.values[0].files[0].baseImage
                          ? 'border-b-4 pb-4 border-orange-500'
                          : ''
                      }`}
                    >
                      <img className="w-40 p-4" src={item.variant.files[0].baseImage} />
                      <p className="mt-5">{item.variant.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="sm:col-span-12 bg-gray-700"></div>
        </div>

        <div className="fixed bg-gray-100 dark:bg-gray-900 w-full p-8 bottom-[0] z-20 flex items-center justify-center text-center md:space-x-60 space-x-20">
          {/* <Button className="p-4 border border-orange-500 text-orange-500 hover:border-red-900 hover:text-red-900 hover:shadow-lg ">
            Save Creation
          </Button> */}
          {token ? (
            <Button
              onClick={() => addToCart()}
              className="p-4 border border-orange-500 text-orange-500 hover:border-red-900 hover:text-red-900 hover:shadow-lg "
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              onClick={() => sendLogin()}
              className="p-4 border border-orange-500 text-orange-500 hover:border-red-900 hover:text-red-900 hover:shadow-lg "
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
      {/* ...............Footer.................... */}
      <div className="w-full flex h-max px-16 py-6 justify-between bg-gray-100 dark:bg-gray-900 mt-8 mb-20">
        <div>
          <p className="text-md font-regular ml-5 mb-5 text-gray-400">Change Background Color</p>
          <div className="flex space-x-10 items-center ml-5">
            <div className={`w-max relative  cursor-pointer`} onClick={() => handleImageClick('white')}>
              <button
                className={`${
                  background === 'white' || background == '1' ? 'border-orange-500' : 'border-gray-300'
                }  w-12 h-12 focus:outline-none border-2 `}
              >
                <AiOutlineStop className="w-8 h-8 m-auto text-gray-500" />
              </button>
            </div>
            <div className={`w-max relative  cursor-pointer`} onClick={() => handleImageClick('[#b2ac8b]')}>
              <button
                className={`${
                  background === '[#b2ac8b]' ? 'border-orange-500' : 'border-gray-300'
                }  bg-[#b2ac8b] w-12 h-12 focus:outline-none border-2 `}
              ></button>
            </div>
            <div className={`w-max relative  cursor-pointer`} onClick={() => handleImageClick('[#94081a]')}>
              <button
                className={`${
                  background === '[#94081a]' ? 'border-orange-500' : 'border-gray-300'
                }  w-12 h-12 bg-[#94081a] focus:outline-none border-2 `}
              ></button>
            </div>
            <div className={`w-max relative  cursor-pointer`} onClick={() => handleImageClick('[#9f7755]')}>
              <button
                className={`${
                  background === '[#9f7755]' ? 'border-orange-500' : 'border-gray-300'
                }  w-12 h-12 bg-[#9f7755] focus:outline-none border-2 `}
              ></button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-md font-regular ml-5 mb-5 text-gray-400">Golden Border</p>

          <div className="flex w-full items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              checked={isChecked}
              onChange={toggleCheckbox}
              id="bordered-checkbox-2"
              type="checkbox"
              name="bordered-checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="bordered-checkbox-2"
              className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Yes
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
