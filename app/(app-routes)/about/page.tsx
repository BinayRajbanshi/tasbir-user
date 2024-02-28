import React from 'react';

const About = () => {
  return (
    <div className="my-container">
      <section className="my-container py-14 sm:py-18 bg-white">
        <h1 className="font-kurale text-black text-[2.188rem] text-center tracking-[0] leading-[normal]">About Us</h1>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
          <img className="w-full" src="/images/rec1.png" />
          <img className="w-full" src="/images/rec2.png" />
          <img className="w-full" src="/images/rec2.png" />
        </div>
      </section>

      <section className="">
        <div className="my-container  py-14 sm:py-18 flex flex-col items-center gap-12 md:flex-row my-10">
          <div className="md:w-3/6 ">
            <p className="font-kurale text-md font-normal leading-10 tracking-wide text-gray-400">THE GENESIS</p>
            <div className="font-kurale max-w-xl mt-2 mb-6 text-xl font-normal dark:text-gray-300 md:text-4xl">
              We promise impeccable service for every tasbir photo product.
            </div>
            <p className="font-kurale font-normal mb-8 text-gray-700 dark:text-gray-400">
              At Tasbir, every member is super special to us. You are a VIP for us, and we strive to make sure that your
              experience with Tasbir is perfect. To back up our commitment to your satisfaction, we work very hard to
              bring you premium quality materials and printing processes. We want you to be able to make the most of
              your memories… through your photos.
            </p>
          </div>
          <div className="md:w-3/6 h-max">
            <img className="object-cover" alt="Rectangle" src="/images/Rectangle15.png" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
