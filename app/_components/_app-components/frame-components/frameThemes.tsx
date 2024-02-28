import React from 'react';
import Image from 'next/image';

const FrameThemes = () => {
  return (
    <div className="ml-6 flex grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 sm:grid-cols-1 gap-14 overflow-hidden">
      <div className="w-[120px] h-auto bg-gray-100 shadow-lg mb-1 flex flex-col justify-start">
        <div className="w-auto h-auto bg-gray-300 cursor-pointer">
          <img src="/images/frames/frame1.png" width={80} height={80} alt="frame" />
        </div>
        <p className="text-sm"> All Themes </p>
      </div>
      <div className=" w-[120px] h-auto  bg-gray-100 shadow-lg mb-1 flex flex-col ">
        <div className="w-auto h-auto bg-gray-300 cursor-pointer ">
          <img src="/images/frames/frame1.png" width={80} height={80} alt="frame" />
        </div>
        <p className="text-sm"> Celebration </p>
      </div>
      <div className=" w-[120px] h-auto  bg-gray-100 shadow-lg mb-1 flex flex-col ">
        <div className="w-auto h-auto bg-gray-300 cursor-pointer ">
          <img src="/images/frames/frame1.png" width={80} height={80} alt="frame" />
        </div>
        <p className="text-sm"> Family and Kids </p>
      </div>
      <div className=" w-[120px] h-auto  bg-gray-100 shadow-lg mb-1 flex flex-col ">
        <div className="w-auto h-auto bg-gray-300 cursor-pointer ">
          <img src="/images/frames/frame1.png" width={80} height={80} alt="frame" />
        </div>
        <p className="text-sm"> Friendship & Love </p>
      </div>
      <div className=" w-[120px] h-auto  bg-gray-100 shadow-lg mb-1 flex flex-col ">
        <div className="w-auto h-auto bg-gray-300 cursor-pointer ">
          <img src="/images/frames/frame1.png" width={80} height={80} alt="frame" />
        </div>
        <p className="text-sm"> Travel & Nature </p>
      </div>
    </div>
  );
};

export default FrameThemes;
