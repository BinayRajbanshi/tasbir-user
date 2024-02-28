'use client';

import { Button } from '@/_components/ui/button';
import { IdeaItem, ImageItem } from '@/_types/frameTypes';
import { ProductDetail } from '@/_types/productTypes';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/_components/ui/use-toast';
import { Settings } from '@/_types/homeTypes';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PreviewPop from './PreviewPop';

interface ProductDetailsProps {
  productData: {
    product: {
      name: string;
      shortDescription: string;
      specialPrice: string | null;
      price: string;
      description: string;
    };
    mediaFiles: Array<{ baseImage: string; additionalImage?: string[] }>;
    variants: Array<{ variant: ProductVariant }>;
    relatedProductData: any[];
    upSellProductData: any[];
    crossSellProductData: any[];
  };
}

interface ProductVariant {
  id: number;
  name: string;
  url: string;
  isRequired: number;
  values: Array<{
    id: number;
    size: string;
    originalPrice: string;
    discountedPrice: string;
    product_variant_id: number;
    images: Array<{
      id: number;
      baseImage: string;
      pivot: {
        model_id: number;
        file_id: number;
      };
    }>;
  }>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productData }) => {
  // console.log('data received is: ', productData);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [newSize, setNewSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const isSelectionValid = selectedImage !== null && selectedButton !== null;

  if (
    !productData ||
    !productData.product ||
    !productData.mediaFiles ||
    !productData.mediaFiles.length ||
    !productData.mediaFiles[1]?.additionalImage
  ) {
    return <div>No product data available.</div>;
  }

  const { product, mediaFiles, variants, productReviews } = productData;
  // console.log(productData);
  const userPref = {
    size: size,
    color: selectedImage,
    id: productData.product.id,
    variants: variants,
  };

  const handleTheme = () => {
    if (!isSelectionValid) {
      toast({
        title: `Please select both a variant and a size.`,
        variant: 'destructive',
      });
      return;
    }
    localStorage.setItem('preference', JSON.stringify(userPref));
    router.push('/themes');
  };

  const handleButton = (index: number, data: object) => {
    if (data != '') {
      setNewSize(data);
    }
    setSelectedButton(index);
    console.log(data);
    setSize(data);
  };

  // console.log(productData);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!mediaFiles) return;

    const additionalImages = mediaFiles.flatMap((media) => media.additionalImage || []);
    if (additionalImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % additionalImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [mediaFiles]);

  const images: string[] = mediaFiles.reduce<string[]>(
    (images, media) => [...images, ...(media.additionalImage || [])],
    []
  );

  const sizesSet = new Set<string>();
  const groupedImages: { [name: string]: string[] } = {};

  variants.forEach((variant) => {
    const uniqueVariantImages: string[] = [];
    variant.variant.values.forEach((value) => {
      sizesSet.add(value.size);
      if (!uniqueVariantImages.includes(value?.files[0]?.baseImage)) {
        uniqueVariantImages.push(value?.files[0]?.baseImage);
      }
    });
    groupedImages[variant.variant.name] = uniqueVariantImages;
  });
  console.log(variants);
  // console.log(variants[0]?.variant?.values);

  const uniqueSizes = Array.from(sizesSet);
  const variantNames = Object.keys(groupedImages);

  const imagesInRow = variantNames.map((name, index) => (
    <div key={index} className="mb-4">
      <div className="flex space-x-4">
        {groupedImages[name].map((img, idx) => (
          <div key={idx} className="w-[80px] h-[80px] flex space-x-4">
            <img
              src={img}
              alt={`${name}-${idx}`}
              width={80}
              height={80}
              className={`rounded-full bg-gray-100 cursor-pointer w-full h-full ${
                selectedImage === img ? 'border-2 border-red-500' : 'border border-gray-300'
              }`}
              onClick={() => handleImageClick(img)}
            />
          </div>
        ))}
      </div>
    </div>
  ));

  const handleImageClick = (img: string) => {
    console.log(img.values);
    setSelectedSize(img.values);
    if (selectedImage === img) {
      setSelectedImage(null);
    } else {
      setSelectedImage(img);
    }
    setColor(img);
  };

  const renderStars = (rating: number) => {
    const starsArray = Array.from({ length: 5 }, (_, index) => index + 1);

    return starsArray.map((index) => (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill={index <= rating ? '#000000' : 'none'}
        stroke={index <= rating ? '#000000' : 'currentColor'}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 mr-1 bi bi-star-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
      </svg>
    ));
  };

  const ideas: IdeaItem[] = [
    { src: '/images/frames/selected-image-1.jpg', alt: 'frame 1', index: 0 },
    { src: '/images/frames/selected-image-5.jpg', alt: 'frame 2', index: 1 },
    { src: '/images/frames/selected-image-6.jpg', alt: 'frame 3', index: 2 },
  ];
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="overflow-hidden font-poppins">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 md:w-1/2 ">
              <div className="overflow-hidden ">
                {/* <div className="relative mb-6 lg:mb-10" style={{ height: 450 }}>
                  {images.map((image, index) => (
                    <Image
                      src={image}
                      alt={`Image ${index}`}
                      width={615}
                      height={615}
                      className="object-cover w-full h-full"
                    />
                  ))}
                </div> */}
                <Slider ref={sliderRef} {...settings}>
                  {images &&
                    images.map((image: any, index: number) => (
                      <div key={index} className=" relative">
                        <img
                          src={`${image}`}
                          width={615}
                          height={615}
                          alt={`product ${index}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                </Slider>
                <div className="flex-wrap hidden flex-col md:flex">
                  <h1 className="mt-2 text-2xl font-medium leading-10 tracking-tight text-[#0F2137]">Product Detail</h1>
                  <p className="mt-4 text-lg text-gray-600 mb-9 leading-relaxed">{product.description}</p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-8">
                <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="max-w-xl mt-2 mb-6 text-xl font-normal dark:text-gray-300 md:text-3xl">
                    {product.name}
                  </h2>
                  <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">{product.shortDescription}</p>
                  {newSize ? (
                    newSize.discountedPrice ? (
                      <p className="inline-block text-2xl font-semibold text-[#800000]   ">
                        <span>Rs. {Number(newSize.discountedPrice).toFixed(0)}</span>
                        <span className="text-base font-normal text-gray-500 line-through">
                          Rs. {Number(newSize.originalPrice).toFixed(0)}
                        </span>
                      </p>
                    ) : (
                      <p className="inline-block text-2xl font-semibold text-[#800000]">
                        <span>Rs. {Number(product.price).toFixed(0)}</span>
                      </p>
                    )
                  ) : product.specialPrice ? (
                    <p className="inline-block text-2xl font-semibold text-[#800000]   ">
                      <span>Rs. {Number(product.specialPrice).toFixed(0)}</span>
                      <span className="text-base font-normal text-gray-500 line-through">
                        Rs. {Number(product.price).toFixed(0)}
                      </span>
                    </p>
                  ) : (
                    <p className="inline-block text-2xl font-semibold text-[#800000]">
                      <span>Rs. {Number(product.price).toFixed(0)}</span>
                    </p>
                  )}
                </div>
                <div className="mb-8">
                  <h2 className="mb-2 text-xl font-normal dark:text-gray-400">VARIANTS</h2>
                  <div className="flex space-x-4">
                    {variants.map((item) => (
                      <div className="flex items-center flex-col">
                        <div className="flex space-x-14 ">
                          <div key={item.variant.id} className="mb-4">
                            <div className="flex space-x-4">
                              <div className="w-20 h-20 flex space-x-4">
                                <img
                                  src={item.variant?.files[0]?.baseImage}
                                  alt={`hello`}
                                  width={80}
                                  height={80}
                                  className={`rounded-full bg-gray-100 cursor-pointer w-full h-full ${
                                    selectedImage && selectedImage.id === item.variant.id
                                      ? 'border-2 border-[#800000] text-[#800000]'
                                      : 'border border-gray-300'
                                  }`}
                                  onClick={() => handleImageClick(item.variant)}
                                />
                              </div>
                            </div>
                            <p
                              className="mt-2 text-md text-center font-normal leading-10 tracking-tight text-gray-400"
                              key={item.variant.id}
                            >
                              {item.variant.name}
                            </p>
                          </div>
                        </div>

                        <PreviewPop image={item.variant?.files[0]?.baseImage} />
                      </div>
                    ))}
                  </div>
                </div>
                {selectedSize && (
                  <div className="pb-6 mb-8 border-b border-gray-300 dark:border-gray-700">
                    <h2 className="mb-2 text-xl font-normal dark:text-gray-400">SIZES</h2>

                    <div className="flex space-x-6">
                      {selectedSize.map((size, idx) => (
                        <div key={idx} className="flex flex-wrap grid ">
                          <div className="w-max sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
                            <Button
                              className={`py-1 mb-2 mr-1 border w-max hover:border-[#800000] hover:text-[#800000]  ${
                                selectedButton === idx ? 'border-[#800000] text-[#800000]' : 'border-gray-300'
                              } inline-block w-max h-10 rounded-sm`}
                              onClick={() => handleButton(idx, size)}
                            >
                              {size.size}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-col">
                  <button
                    onClick={handleTheme}
                    className="w-full h-10 p-2 mr-4 bg-[#800000] dark:text-gray-200 text-gray-50 hover:bg-[#AD3523]"
                  >
                    Choose Theme
                  </button>
                </div>
                {productData.relatedProductData.length > 0 && (
                  <div className="flex-wrap w-full mt-10 hidden flex-col md:flex">
                    <h1 className="mb-5 text-2xl font-normal leading-10 tracking-tight text-[#0F2137]">You may like</h1>
                    <div className="flex gap-4">
                      {productData.relatedProductData.map((item) => (
                        <div className="group cursor-pointer relative">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-1 xl:aspect-w-1">
                            <img
                              alt="Metallic Brush Frame with Photo"
                              src={`http://tasbirapi.gharbetibaa.com/system/public/files/09074818012024x0J6Tt.jpg`}
                              className="h-full w-full object-cover object-center "
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div className="w-full">
                              <h3 className="max-w-xl mt-2 mb-6 text-lg text-center font-normal  dark:text-gray-300 ">
                                Metallic Brush Frame with Photo
                              </h3>
                              <div className="flex justify-center">
                                <p className="inline-block text-base font-semibold text-[#800000] dark:text-gray-400 ">
                                  <span>Rs. 7200</span>
                                  <span className="text-sm font-normal text-gray-500 line-through dark:text-gray-400">
                                    Rs. 7500
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <h2 className="mb-4 text-2xl font-normal text-left font-gray-600 dark:text-gray-400">Reviews</h2>

        {productReviews.length !== 0 ? (
          productReviews.map((item) => (
            <div className="flex flex-wrap py-4 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
              <div className="w-full flex items-center space-x-2 mb-6 lg:mb-0">
                <div className="flex items-center"> {renderStars(item.rating)}</div>
                <h2 className="text-lg font-normal text-black-900 dark:text-gray-400">{item.name}</h2>
              </div>
              <div className="w-full">
                <h2 className="mb-2 text-lg font-normal text-gray-700 dark:text-gray-300">{item.comment}</h2>
                <p className="text-gray-600">Prazeen</p>
                <div className="flex space-x-2">
                  {/* {item.Images.map((item: any) => (
                <img className="h-24" src={item} />
              ))} */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-wrap py-4 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
            <div className="w-full mb-4 lg:mb-0 md:w-2/5">
              <h2 className="mb-1 text-lg text-gray-900 dark:text-gray-400">No Review Yet.</h2>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
