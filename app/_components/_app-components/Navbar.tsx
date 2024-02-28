'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

import Image from 'next/image';
import { navVariants } from '@/_utils/animations/animation';
import NoChildrenItems from './nav-component/mobile/NoChildrenItems';
import { ToggleMode } from '../ui/theme-switcher';
import { motion } from 'framer-motion';
import { Menu, User, Search, ShoppingCart, Instagram, Facebook } from 'lucide-react';
import { MenuT } from '@/_types/menuTypes';
import ChildrenItems from './nav-component/mobile/ChildrenItems';
import '@/_assets/hamburger.module.css';
import styles from '@/_assets/hamburger.module.css';
import Link from 'next/link';
import { ChildrenDesktop } from './nav-component/desktop/ChildrenItems';
import NoChildrenDesktop from './nav-component/desktop/NoChildrenItems';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/_components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/_components/ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { ToggleModeDesktop } from '../ui/theme-switcher-desktop';
import axios from 'axios';
import { useCartContext } from '@/contexts/cart-contexts';

interface propT {
  menuData: MenuT[];
}

export default function (props: propT) {
  const [navOpen, setNavOpen] = useState(false);
  const [token, setToken] = useState('');
  const { navChange, cart, setCart, setNavChange } = useCartContext();
  const [cardData, setCartData] = useState();

  function useForceUpdate() {
    const [, setForceUpdate] = useState(false);

    return () => setForceUpdate((prev) => !prev);
  }

  const forceUpdate = useForceUpdate();

  // nav open function
  const handleNavOpen = () => {
    setNavOpen(!navOpen);
  };
  const getCart = async () => {
    try {
      const res = await fetch(`/api/cart`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data) {
        setCart(data.data);
      }
    } catch (error) {
    } finally {
    }
  };
  const getToken = async () => {
    try {
      const res = await axios.get('/api/cookie');
      setNavChange(true);
      if (res.status == 200) {
        setToken(res);
        if (res) {
          getCart();
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint with POST method
      const response = await axios.post('/api/logout', {}, { withCredentials: true });

      // Check if the response indicates success (e.g., status code 200)
      if (response.status === 200) {
        // Redirect to the login page using Next.js router
        setNavChange(false);
      } else {
        // Handle the error scenario
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <nav className="shadow-sm relative sticky z-20 bg-background top-0 z-10">
      <div className="flex items-center justify-between py-2 px-4 my-container">
        <Link href="/">
          <img width={55} height={10} alt="tasbit's logo" src="/images/TasbirLogo.png" />
        </Link>
        {/* ----------------------- */}
        {/* <div className="lg:flex items-center hidden justify-center border dark:border-gray-700 rounded-lg">
          <div className="flex rounded-lg ">
            <input
              type="text"
              className="px-4 py-2 text-sm w-96 rounded-l-lg lg:w-[600px] bg-accent/10 focus:outline-none"
              placeholder="Search..."
            />
            <button className="flex items-center justify-center px-4 border-l dark:border-gray-700">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
              </svg>
            </button>
          </div>
        </div> */}
        {/* ----------------------- */}
        <div className="flex">
          <div className="hidden lg:block py-2 my-container lg:sticky top-0 left-0">
            <NavigationMenu>
              <NavigationMenuList>
                {props.menuData?.map((item) => {
                  if (item.children) {
                    return <ChildrenDesktop name={item.name} key={item.id} children={item.children} />;
                  } else {
                    return <NoChildrenDesktop key={item.id} name={item.name} route={item.route} />;
                  }
                })}
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-kurale font-normal`}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-kurale font-normal`}>
                      About
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/shop" legacyBehavior passHref>
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} font-kurale font-normal`}>
                      Shop
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {!navChange ? (
            <div className="flex items-center gap-4">
              {/* <Search className="lg:hidden" /> */}
              <Link className="flex items-center space-x-2" href="/login">
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 5C12.3478 5 9.8043 6.05357 7.92893 7.92893C6.05357 9.8043 5 12.3478 5 15C5 16.3132 5.25866 17.6136 5.7612 18.8268C6.02812 19.4712 6.36105 20.0843 6.7537 20.6567C9.31617 19.4003 12.1373 18.7458 15.0009 18.75C17.9572 18.7501 20.7565 19.435 23.2464 20.6565C23.639 20.0842 23.9719 19.4711 24.2388 18.8268C24.7413 17.6136 25 16.3132 25 15C25 12.3478 23.9464 9.8043 22.0711 7.92893C20.1957 6.05357 17.6522 5 15 5ZM24.5814 23.0279C25.397 22.0545 26.0609 20.9608 26.5485 19.7835C27.1767 18.267 27.5 16.6415 27.5 15C27.5 11.6848 26.183 8.50537 23.8388 6.16117C21.4946 3.81696 18.3152 2.5 15 2.5C11.6848 2.5 8.50537 3.81696 6.16116 6.16117C3.81696 8.50537 2.5 11.6848 2.5 15C2.5 16.6415 2.82332 18.267 3.45151 19.7835C3.93912 20.9608 4.60302 22.0545 5.41861 23.0279C5.43703 23.0514 5.45617 23.074 5.47599 23.0959C5.69393 23.3523 5.92247 23.6001 6.16116 23.8388C7.3219 24.9996 8.69989 25.9203 10.2165 26.5485C11.733 27.1767 13.3585 27.5 15 27.5C16.6415 27.5 18.267 27.1767 19.7835 26.5485C21.3001 25.9203 22.6781 24.9996 23.8388 23.8388C24.0775 23.6001 24.3061 23.3523 24.524 23.0959C24.5438 23.074 24.563 23.0514 24.5814 23.0279ZM21.4981 22.601C19.509 21.7319 17.312 21.25 15 21.25L14.9981 21.25C12.7567 21.2466 10.5454 21.7091 8.50226 22.6013C9.29977 23.283 10.2009 23.8361 11.1732 24.2388C12.3864 24.7413 13.6868 25 15 25C16.3132 25 17.6136 24.7413 18.8268 24.2388C19.7993 23.836 20.7005 23.2828 21.4981 22.601ZM15.0009 18.75C15.0013 18.75 15.0016 18.75 15.0019 18.75L15 20V18.75C15.0003 18.75 15.0006 18.75 15.0009 18.75ZM15 10C14.337 10 13.7011 10.2634 13.2322 10.7322C12.7634 11.2011 12.5 11.837 12.5 12.5C12.5 13.163 12.7634 13.7989 13.2322 14.2678C13.7011 14.7366 14.337 15 15 15C15.663 15 16.2989 14.7366 16.7678 14.2678C17.2366 13.7989 17.5 13.163 17.5 12.5C17.5 11.837 17.2366 11.2011 16.7678 10.7322C16.2989 10.2634 15.663 10 15 10ZM11.4645 8.96447C12.4021 8.02678 13.6739 7.5 15 7.5C16.3261 7.5 17.5979 8.02678 18.5355 8.96447C19.4732 9.90215 20 11.1739 20 12.5C20 13.8261 19.4732 15.0979 18.5355 16.0355C17.5979 16.9732 16.3261 17.5 15 17.5C13.6739 17.5 12.4021 16.9732 11.4645 16.0355C10.5268 15.0979 10 13.8261 10 12.5C10 11.1739 10.5268 9.90215 11.4645 8.96447Z"
                    fill="#800000"
                  />
                </svg>
                <p className="text-sm text-[#800000] hover:text-red-700">Login</p>
              </Link>
              <p className="text-sm text-[#800000]">|</p>
              <Link href="/signup">
                <p className="text-sm text-[#800000] hover:text-red-700">Register</p>
              </Link>{' '}
              {/* <ToggleModeDesktop /> */}
              <label className={`${styles.label} bg-background z-40 lg:hidden`} id="nav-toggle" htmlFor="check">
                <input className={styles.input} checked={navOpen} onChange={handleNavOpen} type="checkbox" id="check" />
                <span className={`${styles.span} dark:bg-white`}></span>
                <span className={`${styles.span} dark:bg-white`}></span>
                <span className={`${styles.span} dark:bg-white`}></span>
              </label>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* <Search className="lg:hidden" /> */}
              {/* <Link href="/login">
              <User />
            </Link> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <a className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15 5C12.3478 5 9.8043 6.05357 7.92893 7.92893C6.05357 9.8043 5 12.3478 5 15C5 16.3132 5.25866 17.6136 5.7612 18.8268C6.02812 19.4712 6.36105 20.0843 6.7537 20.6567C9.31617 19.4003 12.1373 18.7458 15.0009 18.75C17.9572 18.7501 20.7565 19.435 23.2464 20.6565C23.639 20.0842 23.9719 19.4711 24.2388 18.8268C24.7413 17.6136 25 16.3132 25 15C25 12.3478 23.9464 9.8043 22.0711 7.92893C20.1957 6.05357 17.6522 5 15 5ZM24.5814 23.0279C25.397 22.0545 26.0609 20.9608 26.5485 19.7835C27.1767 18.267 27.5 16.6415 27.5 15C27.5 11.6848 26.183 8.50537 23.8388 6.16117C21.4946 3.81696 18.3152 2.5 15 2.5C11.6848 2.5 8.50537 3.81696 6.16116 6.16117C3.81696 8.50537 2.5 11.6848 2.5 15C2.5 16.6415 2.82332 18.267 3.45151 19.7835C3.93912 20.9608 4.60302 22.0545 5.41861 23.0279C5.43703 23.0514 5.45617 23.074 5.47599 23.0959C5.69393 23.3523 5.92247 23.6001 6.16116 23.8388C7.3219 24.9996 8.69989 25.9203 10.2165 26.5485C11.733 27.1767 13.3585 27.5 15 27.5C16.6415 27.5 18.267 27.1767 19.7835 26.5485C21.3001 25.9203 22.6781 24.9996 23.8388 23.8388C24.0775 23.6001 24.3061 23.3523 24.524 23.0959C24.5438 23.074 24.563 23.0514 24.5814 23.0279ZM21.4981 22.601C19.509 21.7319 17.312 21.25 15 21.25L14.9981 21.25C12.7567 21.2466 10.5454 21.7091 8.50226 22.6013C9.29977 23.283 10.2009 23.8361 11.1732 24.2388C12.3864 24.7413 13.6868 25 15 25C16.3132 25 17.6136 24.7413 18.8268 24.2388C19.7993 23.836 20.7005 23.2828 21.4981 22.601ZM15.0009 18.75C15.0013 18.75 15.0016 18.75 15.0019 18.75L15 20V18.75C15.0003 18.75 15.0006 18.75 15.0009 18.75ZM15 10C14.337 10 13.7011 10.2634 13.2322 10.7322C12.7634 11.2011 12.5 11.837 12.5 12.5C12.5 13.163 12.7634 13.7989 13.2322 14.2678C13.7011 14.7366 14.337 15 15 15C15.663 15 16.2989 14.7366 16.7678 14.2678C17.2366 13.7989 17.5 13.163 17.5 12.5C17.5 11.837 17.2366 11.2011 16.7678 10.7322C16.2989 10.2634 15.663 10 15 10ZM11.4645 8.96447C12.4021 8.02678 13.6739 7.5 15 7.5C16.3261 7.5 17.5979 8.02678 18.5355 8.96447C19.4732 9.90215 20 11.1739 20 12.5C20 13.8261 19.4732 15.0979 18.5355 16.0355C17.5979 16.9732 16.3261 17.5 15 17.5C13.6739 17.5 12.4021 16.9732 11.4645 16.0355C10.5268 15.0979 10 13.8261 10 12.5C10 11.1739 10.5268 9.90215 11.4645 8.96447Z"
                        fill="#800000"
                      />
                    </svg>
                  </a>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/profile/change-password">
                      <DropdownMenuItem>Change Password</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/order/list">
                      <DropdownMenuItem>Orders</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/purchase/list">
                      <DropdownMenuItem>Purchase List</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => handleLogout()}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link className="relative" href="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.5806 4.33058C11.7527 3.15848 13.3424 2.5 15 2.5C16.6576 2.5 18.2473 3.15848 19.4194 4.33058C20.5915 5.50268 21.25 7.0924 21.25 8.75V10H23.75C24.4001 10 24.9417 10.4983 24.9957 11.1462L26.2457 26.1462C26.2747 26.4946 26.1566 26.8391 25.9199 27.0964C25.6832 27.3536 25.3496 27.5 25 27.5H5C4.65044 27.5 4.31684 27.3536 4.08015 27.0964C3.84346 26.8391 3.72529 26.4946 3.75432 26.1462L5.00432 11.1462C5.05831 10.4983 5.59989 10 6.25 10H8.75V8.75C8.75 7.0924 9.40848 5.50268 10.5806 4.33058ZM8.75 12.5V13.75C8.75 14.4404 9.30965 15 10 15C10.6904 15 11.25 14.4404 11.25 13.75V12.5H18.75V13.75C18.75 14.4404 19.3096 15 20 15C20.6904 15 21.25 14.4404 21.25 13.75V12.5H22.5998L23.6415 25H6.3585L7.40017 12.5H8.75ZM18.75 10H11.25V8.75C11.25 7.75544 11.6451 6.80161 12.3484 6.09835C13.0516 5.39509 14.0054 5 15 5C15.9946 5 16.9484 5.39509 17.6517 6.09835C18.3549 6.80161 18.75 7.75544 18.75 8.75V10Z"
                    fill="#800000"
                  />
                </svg>
                {cart && cart?.count > 0 && (
                  <span className="bg-red-500 text-white font-semibold text-xs rounded-full flex items-center justify-center absolute border border-white w-4 h-4 right-5 top-[0.1rem] -mt-1 -mr-7">
                    {cart?.count}
                  </span>
                )}
              </Link>

              {/* <label className={`${styles.label} z-40 bg-background lg:hidden`} id="nav-toggle" htmlFor="check">
              <input className={styles.input} checked={navOpen} onChange={handleNavOpen} type="checkbox" id="check" />
              <span className={`${styles.span} dark:bg-white`}></span>
              <span className={`${styles.span} dark:bg-white`}></span>
              <span className={`${styles.span} dark:bg-white`}></span>
            </label> */}
            </div>
          )}
        </div>
      </div>

      {/* ==========================sidebar navigarion MOBILE VERSION =========================*/}
      <motion.div
        animate={navOpen ? 'open' : 'closed'}
        variants={{
          open: {
            transition: {
              staggerChildren: 0.04,
              duration: 0.4,
            },
          },
        }}
        className={`${
          navOpen ? 'pointer-events-all opacity-100' : 'opacity-0 pointer-events-none'
        } absolute inset-0 bg-background w-screen h-full overflow-scroll min-h-screen lg:hidden`}
      >
        <div className="px-4 py-2 sticky z-30 top-0 bg-background border-b dark:border-custom shadow-sm flex items-center justify-between">
          <Link href="/">
            <img src="/images/TasbirLogo.png" className="rounded-md" height={40} width={30} alt="tasbir small logo" />
          </Link>
          <div className="flex items-center mr-12">
            <ToggleMode />
          </div>
        </div>
        <div className="mt-1 h-screen px-5 mt-4">
          {/* {props.menuData?.map((item) => {
            // after bug filter by sortOrder 1
            if (item.name == 'Dr. G') {
              return (
                <>
                  <motion.p
                    variants={navVariants}
                    className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2"
                  >
                    Doctor G
                  </motion.p>
                  {item.children?.map((item) => {
                    return <ChildrenItems childrenItem={item.children} name={item.name} icon={item.icon} />;
                  })}
                  <motion.p
                    variants={navVariants}
                    className="text-xl font-medium text-gray-600 dark:text-gray-400  my-3"
                  >
                    Page Links
                  </motion.p>
                </>
              );
            }
            return (
              <div className="flex flex-col gap-3">
                {item.children ? (
                  <ChildrenItems childrenItem={item.children} name={item.name} />
                ) : (
                  <NoChildrenItems
                    className="border-b dark:border-custom py-2 font-medium"
                    name={item.name}
                    route={item.route}
                    icon={item.icon}
                  />
                )}
              </div>
            );
          })} */}
        </div>
        {/* <div className="sticky bottom-0 w-full py-2 border-t dark:border-custom bg-background left-0">
          <p className="text-center mb-1">All Rights Reserve. © Gadgetbyte 2023</p>
          <div className="flex items-center text-gray-700 dark:text-gray-400 justify-center w-full mx-auto gap-3">
            <Link href="https://www.instagram.com/gadgetbyte/?hl=en">
              <Instagram />
            </Link>
            <Link href="https://www.youtube.com/@GadgetByteNepali">
              <Youtube />
            </Link>
            <Link href="https://www.facebook.com/gadgetbytenepal/">
              <Facebook />
            </Link>
          </div>
        </div> */}
      </motion.div>

      <Separator className=" hidden lg:block" />
    </nav>
  );
}
