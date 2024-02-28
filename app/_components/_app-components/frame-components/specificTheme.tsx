'use client';
import { Button } from '@/_components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import themeData from '@/_components/_app-components/frame-components/Data/themeData.json';
import { Scan } from 'lucide-react';
import { Theme } from '@/_types/frameTypes';

const SpecificTheme = () => {
  const handleThemeClick = (frame) => {
    console.log(frame);
  };
  useEffect(() => {
    localStorage.removeItem('theme');
  }, []);
  return (
    <div className="ml-6">
      <p className="text-4xl font-semibold">01. Choose a theme</p>
      <div className="flex flex-col space-y-10">
        {/* <div className="flex flex-col space-y-4">
          <div className="flex space-x-6">
            <Button className="border border-black px-4"> SIMPLE </Button>
            <Button className="border border-black px-4"> DESIGNER </Button>
          </div>
          <p className="text-gray-500 text-sm">You will be charged extra Rs 29 for designer theme</p>
        </div> */}
        <div className="flex flex-col sm:flex-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-14 overflow-hidden mt-4">
          {themeData.map((frame: Theme, index: number) => (
            <div
              key={index}
              className="group shadow-sm mb-1 mt-1 bg-white w-[348px] h-[300px] text-center relative border hover:border-blue-500"
            >
              <div className="ml-5 mt-4 bg-gray-100 w-[310px] h-[230px] relative">
                <div className="py-6 px-14">
                  <Link href="/themes/addphoto">
                    <div className="relative">
                      <img
                        src={`/images/frames/${frame.imageName}`}
                        width={200}
                        height={180}
                        alt="frame"
                        className="w-[200px] h-[180px] p-2 bg-white shadow-md mb-1 pointer-cursor"
                      />
                    </div>

                    <div
                      onClick={() => localStorage.setItem('themeSelected', JSON.stringify(frame))}
                      className="flex flex-col absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-300 bg-blue-300 text-white text-2xl font-bold text-center group-hover:opacity-50"
                    >
                      <Scan className="w-10 h-10" />
                      Quick Preview
                    </div>
                  </Link>
                </div>
              </div>
              <h2 className="font-semibold mt-4 text-md"> {frame.title} </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificTheme;
