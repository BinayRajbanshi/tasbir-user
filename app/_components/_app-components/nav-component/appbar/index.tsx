'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const AppBar = ({ active }) => {
  const [currentPage, setCurrentPage] = useState('');

  const pathname = usePathname();
  const router = useRouter();
  const handleGoBack = () => {
    if (pathname == '/themes/addphoto') {
      router.push('/themes');
    } else if (pathname == '/themes/view') {
      router.push('/themes/addphoto');
    } else if (pathname == '/themes/zoom') {
      router.push('/themes/view');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="bg-white p-4 md:h-full shadow-md">
      {/* Back Button */}
      <span className="font-bold text-gray-600 block my-4 py-2 px-5 text-xl">
        <span onClick={() => handleGoBack()} className="cursor-pointer flex items-center">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          BACK
        </span>
      </span>

      {/* Stepper List */}
      <ol className="relative ml-6 mt-10 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mb-10 ms-6">
          <span
            className={`absolute flex items-center justify-center w-8 h-8 ${
              pathname !== '/themes' ? 'bg-green-200' : 'bg-gray-100'
            } rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}
          >
            {pathname !== '/themes' ? (
              <svg
                className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            ) : (
              <svg
                fill="currentColor"
                className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
              >
                <path d="M475.691.021c-14.656 0-27.776 8.725-33.451 22.251l-32.64 77.973c-9.728-9.152-22.421-14.933-36.267-14.933h-320C23.936 85.312 0 109.248 0 138.645v320c0 29.397 23.936 53.333 53.333 53.333h320c29.397 0 53.333-23.936 53.333-53.333V225.152l81.92-172.821c2.24-4.757 3.413-10.048 3.413-16.043C512 16.299 495.701.021 475.691.021zm-70.358 458.624c0 17.643-14.357 32-32 32h-320c-17.643 0-32-14.357-32-32v-320c0-17.643 14.357-32 32-32h320c11.243 0 21.312 6.101 27.072 15.573l-37.739 90.197v-52.437c0-5.888-4.779-10.667-10.667-10.667H74.667c-5.888 0-10.667 4.779-10.667 10.667v85.333c0 5.888 4.779 10.667 10.667 10.667h269.76l-8.939 21.333h-90.155c-5.888 0-10.667 4.779-10.667 10.667v128c0 .277.128.512.149.789-8.768 7.787-14.144 10.389-14.528 10.539a10.68 10.68 0 00-6.699 7.616 10.706 10.706 0 002.859 9.941c15.445 15.445 36.757 21.333 57.6 21.333 26.645 0 52.48-9.643 64.128-21.333 16.768-16.768 29.056-50.005 19.776-74.773l47.381-99.925v188.48zm-134.698-61.12c2.944-9.685 5.739-18.859 14.229-27.349 15.083-15.083 33.835-15.083 48.917 0 13.504 13.504 3.2 45.717-10.667 59.584-11.563 11.541-52.672 22.677-80.256 8.256 3.669-2.859 7.893-6.549 12.672-11.328 8.918-8.939 12.075-19.221 15.105-29.163zM256 375.339v-76.672h70.571l-16.363 39.083c-14.251-.256-28.565 5.483-40.448 17.387-6.635 6.634-10.752 13.524-13.76 20.202zm75.264-32.598l28.715-68.629 16.128 7.915-32.555 68.651c-3.947-3.201-8.021-5.931-12.288-7.937zm10.069-172.096v64h-256v-64h256zM489.28 43.243l-104.064 219.52-17.003-8.341 54.08-129.237 39.616-94.677c2.325-5.568 7.744-9.152 13.803-9.152 8.235 0 14.933 6.699 14.933 15.659 0 2.132-.469 4.329-1.365 6.228z" />
                <path d="M181.333 277.312H74.667c-5.888 0-10.667 4.779-10.667 10.667v149.333c0 5.888 4.779 10.667 10.667 10.667h106.667c5.888 0 10.667-4.779 10.667-10.667V287.979c-.001-5.888-4.78-10.667-10.668-10.667zm-10.666 149.333H85.333v-128h85.333v128z" />
              </svg>
            )}
          </span>
          <h3 className="font-medium leading-tight">Choose Theme</h3>
          <p className="text-sm">Choose frame theme</p>
        </li>
        <li className="mb-10 ms-6">
          <span
            className={`absolute flex items-center justify-center w-8 h-8 ${
              pathname !== '/themes/addphoto' && pathname !== '/themes' ? 'bg-green-200' : 'bg-gray-100'
            } rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}
          >
            {pathname !== '/themes/addphoto' && pathname !== '/themes' ? (
              <svg
                className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
              >
                <g stroke="#1C274C" strokeWidth={1.5}>
                  <path
                    d="M22 13.438c0 3.77 0 5.656-1.172 6.828-1.171 1.172-3.057 1.172-6.828 1.172h-4c-3.771 0-5.657 0-6.828-1.172C2 19.094 2 17.209 2 13.438 2 9.665 2 7.78 3.172 6.609 4.343 5.438 6.229 5.438 10 5.438h4c3.771 0 5.657 0 6.828 1.171.664.664.952 1.556 1.076 2.891"
                    strokeLinecap="round"
                  />
                  <path d="M3.988 6c.112-.931.347-1.574.837-2.063C5.765 3 7.279 3 10.307 3h3.211c3.028 0 4.541 0 5.482.937.49.489.725 1.132.837 2.063" />
                  <circle cx={17.5} cy={9.9375} r={1.5} />
                  <path
                    d="M2 13.938l1.752-1.533a2.3 2.3 0 013.14.105l4.29 4.29a2 2 0 002.564.221l.299-.21a3 3 0 013.731.226l3.224 2.9"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            )}
          </span>
          <h3 className="font-medium leading-tight">Add Photos</h3>
          <p className="text-sm">Upload Image</p>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
          </span>
          <h3 className="font-medium leading-tight">Edit</h3>
          <p className="text-sm">Edit Photos and Frames</p>
        </li>
        <li className="ms-6">
          <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
            </svg>
          </span>
          <h3 className="font-medium leading-tight">Order</h3>
          <p className="text-sm">Order the Frame.</p>
        </li>
      </ol>
    </div>
  );
};

export default AppBar;
