'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bannerData from '@/_components/_app-components/home-component/data/bannerdata.json';
import { Banner, Settings } from '@/_types/homeTypes';
import { Loader2 } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Products from '@/_components/_app-components/home-component/products';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [homeContent, setHomeContent] = useState();
  const [banner, setBanner] = useState();
  const sliderRef = useRef<Slider | null>(null);

  const getOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/home/contents`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data) {
        setHomeContent(data.data);
        setBanner(data.data.banner[0]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    getOrder();
  }, []);
  const settings: Settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };
  const CustomPrevArrow = (props: any) => (
    <p
      {...props}
      style={{
        width: '30px', // Set the width of your custom arrow
        height: '30px', // Set the height of your custom arrow
        backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/130/130871.png")`, // Set the image URL
      }}
    >
      Prev
    </p>
  );

  const CustomNextArrow = (props: any) => (
    <p
      {...props}
      style={{
        width: '30px', // Set the width of your custom arrow
        height: '30px', // Set the height of your custom arrow
        backgroundImage: `url("https://cdn-icons-png.flaticon.com/512/130/130871.png")`, // Set the image URL
      }}
    >
      Next
    </p>
  );
  const testimonialSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white`}>
        <div className="bg-transparent rounded p-4 flex flex-col items-center">
          <img width={80} height={80} alt="tasbir's logo" src="/images/TasbirLogo.png" />
          <Loader2 className="h-8 w-8 animate-spin mt-5" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container-fluid font-poppins relative">
        <Slider ref={sliderRef} {...settings}>
          {homeContent &&
            homeContent.slider.map((banner: Banner, index: number) => (
              <div key={index} className=" relative">
                <img
                  src={`${banner.featured_image}`}
                  width={1200}
                  height={300}
                  alt={`banner ${index}`}
                  className="w-full h-full object-fit"
                />
              </div>
            ))}
        </Slider>
      </div>
      <section className="py-14 sm:py-18 bg-white">
        <div className="flex flex-col w-full py-14 sm:py-18 items-center justify-center gap-8 p-20 relative bg-white">
          <p className="relative max-w-3xl mt-[-1.00px] font-kurale text-black text-[2.188rem] text-center tracking-[0] leading-[normal]">
            Hi, we&#39;re Tasbir. We make it easy to surround yourself with your favorite moments. If a photo makes you
            happy, it deserves to be on your wall.
          </p>
        </div>
      </section>
      <section className="py-14 sm:py-18 bg-white">
        <div className="relative max-w-6xl mx-auto">
          <div className="font-kurale text-black text-[24px] text-center tracking-[0] leading-[normal]">
            How It Works
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            <div className="inline-flex flex-col items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-white">
              <img className="relative w-[60px] h-[60px] object-cover" alt="Image" src="/images/image.png" />
              <p className="relative w-fit font-kurale text-black text-[20px] text-center tracking-[0] leading-[normal]">
                Choose your photo and frame
              </p>
            </div>
            <div className="inline-flex flex-col items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-white">
              <img className="relative w-[60px] h-[60px] object-cover" alt="Painting" src="/images/painting.png" />
              <p className="relative w-fit font-kurale text-black text-[20px] text-center tracking-[0] leading-[normal]">
                Your frame is handmade locally
              </p>
            </div>
            <div className="inline-flex flex-col items-center justify-center gap-[10px] p-[10px] relative flex-[0_0_auto] bg-white">
              <img className="relative w-[60px] h-[60px] object-cover" alt="Shipped" src="/images/shipped.png" />
              <div className="relative w-fit font-kurale text-black text-[20px] text-center tracking-[0] leading-[normal]">
                Your order is delivered
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-container font-poppins relative py-14 sm:py-18">
        <div className="flex flex-col space-y-14 group">
          <Products />
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-max py-2 px-8 m-auto bg-[#800000] dark:text-gray-200 text-gray-50 hover:bg-[#AD3523]"
          >
            View All
          </Link>
        </div>
      </section>
      <section className="my-container py-14 sm:py-18 bg-white">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
          <img className="w-full" src="/images/rec1.png" />
          <img className="w-full" src="/images/rec2.png" />
        </div>
      </section>
      <section className="bg-[#fff9f4] ">
        <div className="my-container  py-14 sm:py-18 gap-12 flex flex-col items-center md:flex-row my-10">
          <div className="md:w-3/6 h-max">
            <img className="object-cover" alt="Rectangle" src="/images/Rectangle10.png" />
          </div>
          <div className="md:w-3/6 ">
            <p className="font-kurale text-md font-normal leading-10 tracking-wider text-gray-400">
              &#34;The most beautiful part of every picture is the frame&#34;
            </p>
            <div className="font-kurale max-w-xl mt-2 mb-6 text-xl font-normal dark:text-gray-300 md:text-4xl">
              Oder your Customized Frame.
            </div>
            <p className="font-kurale font-normal mb-8 text-gray-700 dark:text-gray-400">
              &#34;Capture the essence of your memories with our custom frames – a blend of craftsmanship and
              creativity. Elevate the beauty of your pictures with frames that speak volumes. Choose the frame that
              complements your style, and let your memories become timeless pieces of art. Unleash your imagination,
              frame your world, and cherish every moment beautifully framed.
            </p>
          </div>
        </div>
      </section>

      <section className="">
        <div className="my-container  py-14 sm:py-18 flex flex-col items-center gap-12 md:flex-row my-10">
          <div className="md:w-3/6 ">
            <p className="font-kurale text-md font-normal leading-10 tracking-wide text-gray-400">
              &#34;The most beautiful part of every picture is the frame&#34;
            </p>
            <div className="font-kurale max-w-xl mt-2 mb-6 text-xl font-normal dark:text-gray-300 md:text-4xl">
              From Your Mobile to Your Wall
            </div>
            <p className="font-kurale font-normal mb-8 text-gray-700 dark:text-gray-400">
              &#34;Capture the essence of your memories with our custom frames – a blend of craftsmanship and
              creativity. Elevate the beauty of your pictures with frames that speak volumes. Choose the frame that
              complements your style, and let your memories become timeless pieces of art. Unleash your imagination,
              frame your world, and cherish every moment beautifully framed.
            </p>
          </div>
          <div className="md:w-3/6 h-max">
            <img className="object-cover" alt="Rectangle" src="/images/Rectangle15.png" />
          </div>
        </div>
      </section>
      <section className="container-fluid relative flex justify-center items-center">
        <img
          className="w-full h-[42rem] object-cover"
          src={'/images/Rectangle16.png'}
          height={1400}
          alt="Placeholder"
        />
        <div className="testimonial absolute p-12 px-20 top-[25%] bg-[#fff9f4] max-w-2xl">
          <Slider ref={sliderRef} {...testimonialSettings}>
            <div>
              <div className="flex flex-wrap items-center mb-6 justify-center">
                <ul className="flex mb-4 mr-2 lg:mb-0">
                  <li>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 mr-1 text-[#800000]  bi bi-star "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 mr-1 text-[#800000]  bi bi-star "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 mr-1 text-[#800000]  bi bi-star "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 mr-1 text-[#800000]  bi bi-star "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </a>
                  </li>
                </ul>
                {/* <a className="mb-4 text-xs underline  dark:hover:text-gray-300 lg:mb-0" href="#">
                    Be the first to review the product
                  </a> */}
              </div>
              <p className="font-kurale font-normal text-[#181717] text-xl text-center tracking-[0] leading-[normal]">
                &#34;Capture the essence of your memories with our custom frames – a blend of craftsmanship and
                creativity. Elevate the beauty of your pictures with frames that speak volumes. Choose the frame that
                complements your style, and let your memories become timeless pieces of art.
              </p>
              <p className="mt-6 font-kurale font-light text-[#181717] text-base text-center tracking-[0] leading-[normal]">
                Prazeen
              </p>
            </div>
          </Slider>
        </div>
      </section>
    </>
  );
};

export default HomePage;
