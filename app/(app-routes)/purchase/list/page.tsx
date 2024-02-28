'use client';
import React, { useEffect, useState } from 'react';
import Image from '@/../node_modules/next/image';
import { Loader2 } from 'lucide-react';
import { useCartContext } from '@/contexts/cart-contexts';
import { useRouter } from '@/../node_modules/next/navigation';
import { useToast } from '@/_components/ui/use-toast';

import SideBar from '@/_components/_app-components/profile-components/sidebar/index';
import ReviewForm from './ReviewForm';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function RootLayout() {
  const [loading, setLoading] = React.useState(false);
  const [orderData, setOrderData] = useState();
  const { setPayment, navChange } = useCartContext();
  useLayoutEffect(() => {
    const isAuth = navChange;
    if (!isAuth) {
      redirect('/');
    }
  }, []);

  const router = useRouter();
  const { toast } = useToast();
  const handlePaymentMethodChange = (value: any) => {
    setPayment(value);
  };

  const getPurchase = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/profile/get-purchase`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data) {
        setOrderData(data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    getPurchase();
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
    <div className="my-container mt-10">
      {/* <div className="flex justify-center items-center ">
        <div className="flex space-x-4">
          <div className="relative">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">1</div>
            <div className="absolute top-4 left-0 -ml-2 text-center text-xs">Cart</div>
          </div>

          <div className="flex-1 h-1 bg-gray-300 my-4"></div>

          <div className="relative">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">2</div>
            <div className="absolute top-4 left-0 -ml-2 text-center text-xs">Checkout</div>
          </div>
        </div>
      </div> */}

      <div className="shadow-md my-10 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Order List</h1>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SideBar page="purchase-list" />
          <div className="flex-1 lg:max-w-full">
            {orderData &&
              orderData?.data.map((item: any) => (
                <div className="flex hover:bg-gray-100 cursor-pointer mt-4 p-4 items-center">
                  <div className="flex space-x-4">
                    <img className="h-24" src={item.image} alt={item.productName} />
                    <div className="space-y-1 flex flex-col justify-between">
                      <p className="text-base font-medium leading-none">{item.productName}</p>
                      <div className="flex space-x-4">
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                        <p className="text-sm text-muted-foreground">Variant: {item.variant}</p>
                      </div>
                      {item.isReviewed == 0 ? (
                        <ReviewForm getPurchase={getPurchase} id={item.orderItemId} />
                      ) : (
                        <div className="flex flex-wrap items-center mb-6">
                          <ul className="flex mb-4 mr-2 lg:mb-0">
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={16}
                                  height={16}
                                  fill="#800000"
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
                      )}
                    </div>
                  </div>

                  <div className="ml-auto font-medium">{item.total}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
