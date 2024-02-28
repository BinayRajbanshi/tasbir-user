import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import framesData from '@/_components/_app-components/frame-components/Data/framesData.json';
import { Frame } from '@/_types/frameTypes';

const Frame: React.FC = () => {
  return (
    <div className="my-container">
      <div className="flex grid grid-cols-4 gap-8 overflow-hidden mt-4">
        {framesData.map((frame: Frame, index: number) => (
          <div key={index} className="flex flex-col">
            <Link href={`/framed-prints/Selected-framed-prints`}>
              <div className="w-auto h-auto bg-gray-500 cursor-pointer">
                <img src={`/images/frames/${frame.imageName}`} width={296} height={222} alt="frame" />
              </div>
            </Link>
            <p className="mt-4 mb-2"> {frame.title} </p>
            <p className="text-gray-500 flex space-x-2 font-medium">
              From <span className="text-gray-500 line-through ml-1">Rs. {frame.price.originalPrice}</span>{' '}
              <span className="ml-1 text-red-500">{frame.price.discountedPrice}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frame;
