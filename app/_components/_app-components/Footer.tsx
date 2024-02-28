import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
interface SocialLinkProps {
  href: string;
  color: string;
  children: React.ReactNode;
}
function renderFooterLink(href: string, text: string) {
  return (
    <Link href={href}>
      <p className="cursor-pointer text-sm font-semibold dark:text-white hover:text-gray-500 dark:hover:text-gray-500">
        {text}
      </p>
    </Link>
  );
}
function SocialLink({ href, color, children }: SocialLinkProps) {
  return (
    <Link href={href}>
      <p className={`cursor-pointer text-${color} dark:text-gray-100 dark:hover:text-gray-500 hover:text-${color}-800`}>
        {children}
      </p>
    </Link>
  );
}
export default function MyComponent() {
  return (
    <footer className="shadow-sm bg-primary border-t dark:border-gray-700">
      <div className="px-2 py-2 lg:py-4 rounded-md ">
        <div className="flex flex-col lg:flex-row justify-between items-center px-2 lg:px-10 space-y-2 lg:space-y-0 ml-2 lg:ml-20 mr-2 lg:mr-20 mt-4 lg:mt-6">
          <div className="text-center mb-4 lg:mb-0">
            <Link href="/">
              <img src="/images/TasbirLogo.png" alt="Logo" height={10} width={80} />
            </Link>
          </div>
          <div className="text-center items-center flex space-x-8 ">
            <p>Payment Partner - </p>
            <a href="https://esewa.com.np/" target="_blank">
              <img src="/images/esewa.png" alt="" className="object-cover h-16 mr-2 w-26 rounded" />
            </a>
          </div>
        </div>
        <hr className="dark:border-gray-700  my-4 lg:my-6 ml-4 lg:ml-20 mr-4 lg:mr-20" />

        <div className="flex flex-col lg:flex-row justify-between  px-2 lg:px-10 space-y-2 lg:space-y-0 ml-2 lg:ml-20 mr-2 lg:mr-20">
          <div className="w-full px-4 mb-11 md:w-1/2 lg:w-4/12 lg:mb-0">
            <a href="#" className="inline-block mb-4 text-xl font-normal">
              About Tasbir
            </a>
            <p className="text-gray-700 dark:text-gray-400 leading-6 ">
              Framing Memories, Crafting Stories. Explore exquisite frames at TasbirStory.com – Your Canvas for Timeless
              Moments.
            </p>
            {/* <div className="text-center flex space-x-8 mt-8 lg:space-x-16">
              <SocialLink href="https://www.facebook.com/gadgetbytenepal" color="blue-600">
                <Facebook className="lg:w-6 lg:h-6" />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/gadgetbyte/?hl=en" color="pink-600">
                <Instagram className="lg:w-6 lg:h-6" />
              </SocialLink>
              <SocialLink href="https://twitter.com/gadgetbytenepal?lang=en" color="blue-400">
                <Twitter className="lg:w-6 lg:h-6" />
              </SocialLink>
              <SocialLink href="https://www.youtube.com/@GadgetByte" color="red-600">
                <Youtube className="lg:w-6 lg:h-6" />
              </SocialLink>
            </div> */}
          </div>
          <div className="w-full px-4 md:w-1/4 lg:w-2/12 mb-11 lg:mb-0">
            <h2 className="mb-4 text-xl font-normal ">Quick Links </h2>
            <ul>
              <li className="flex items-center mb-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="w-3 h-3 mr-1  bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                <Link href="/" className="inline-block text-base font-normal">
                  Home
                </Link>
              </li>
              <li className="flex items-center mb-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="w-3 h-3 mr-1  bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                <Link href="/about" className="inline-block text-base font-normal">
                  About
                </Link>
              </li>
              <li className="flex items-center mb-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="w-3 h-3 mr-1  bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                <Link href="/shop" className="inline-block text-base font-normal">
                  Shop
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 md:w-1/4 lg:w-2/12  lg:mb-0">
            <h2 className="mb-4 text-xl font-normal ">Links </h2>
            <ul>
              <li className="flex items-center mb-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="w-3 h-3 mr-1  bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                <Link href="/privacy" className="inline-block text-base font-normal">
                  Privacy
                </Link>
              </li>
              <li className="flex items-center mb-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="w-3 h-3 mr-1  bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                <Link href="/terms-and-conditions" className="inline-block text-base font-normal">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="dark:border-gray-700  my-4 lg:my-6 ml-4 lg:ml-20 mr-4 lg:mr-20" />
        <div className="lg:text-center text-center mt-2 lg:mr-20 lg:mt-5">
          <p className="text-xs space-x-2  lg:whitespace-nowrap dark:text-gray-200">
            &copy; 2024 TasbirStory.com. All rights reserved. | Designed by{' '}
            <a
              className="text-[#800000] transition duration-150 ease-in-out hover:text-blue-600"
              href="https://squarebx.com/"
              target="_blank"
            >
              SquareBx
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
