'use client';

import React, { useEffect, useState } from 'react';
import { useToast } from '@/_components/ui/use-toast';
import ProductDetails from '../productDetails';
import { ApiResponse, ProductDetail } from '@/_types/productTypes';
import { useCartContext } from '@/contexts/cart-contexts';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [orderData, setOrderData] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { navChange } = useCartContext();

  useLayoutEffect(() => {
    const isAuth = navChange;
    if (!isAuth) {
      redirect('/');
    }
  }, []);
  const { toast } = useToast();
  const getOrderDetails = async () => {
    setLoading(true);
    const formData = {
      id: params.id,
    };
    try {
      const res = await fetch(`/api/order/order-detail`, {
        method: 'POST',
        body: JSON.stringify(formData),
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
    getOrderDetails();
  }, [params]);

  return (
    <div className="my-container">
      <section className="flex items-center py-8 font-poppins dark:bg-gray-800 ">
        <div className="justify-center flex-1  px-4 py-4 mx-auto bg-white border rounded-md dark:border-gray-900 dark:bg-gray-900 md:py-10 md:px-10">
          <div>
            <h1 className="mb-8 text-2xl font-semibold tracking-wide text-gray-700 dark:text-gray-300 ">
              Your order has been received!
            </h1>
            <div className="flex flex-wrap items-center pb-4 mb-10 border-b border-gray-200 dark:border-gray-700">
              <div className="w-full px-4 mb-4 md:w-1/5">
                <div className="flex flex-col items-start justify-start space-y-2">
                  <p className="text-lg font-semibold leading-4 text-left text-gray-800 dark:text-gray-400">
                    {orderData && orderData.accountInformation['Customer Name']}
                  </p>
                  <p className="text-sm leading-4 text-gray-600 dark:text-gray-400">
                    {orderData && orderData.accountInformation['Customer Phone']}
                  </p>
                  <p className="text-sm leading-4 cursor-pointer dark:text-gray-400">
                    {orderData && orderData.accountInformation['Customer Email']}
                  </p>
                </div>
              </div>
              <div className="w-full px-4 mb-4 md:w-1/5">
                <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">Order ID</p>
                <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400 ">
                  #{orderData && orderData.id}
                </p>
              </div>
              <div className="w-full px-4 mb-4 md:w-1/5">
                <p className="mb-2 text-sm leading-5 text-gray-600 dark:text-gray-400 ">Date: </p>
                <p className="text-base font-semibold leading-4 text-gray-800 dark:text-gray-400">
                  {orderData && orderData.orderedDate}
                </p>
              </div>
              <div className="w-full px-4 mb-4 md:w-1/5">
                <p className="mb-2 text-sm font-medium leading-5 text-gray-800 dark:text-gray-400 ">Total: </p>
                <p className="text-base font-semibold leading-4 text-[#800000]">
                  {orderData && orderData.priceInformation.total}
                </p>
              </div>
              <div className="w-full px-4 mb-4 md:w-1/5">
                <p className="mb-2 text-sm font-medium leading-5 text-gray-800 dark:text-gray-400 ">Status: </p>
                <p className="text-base font-semibold leading-4 text-[#800000]">{orderData && orderData.orderStatus}</p>
              </div>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-400">Order details</h2>
            <div className="px-4 h-64 overflow-scroll">
              {orderData &&
                orderData.itemsOrdered.map((item) => (
                  <div className="flex font-normal justify-between py-2 text-sm uppercase">
                    <div className="flex flex-col w-2/3">
                      <span className="truncate">{`${item.quantity} X ${item.name}`}</span>
                      <span className="text-gray-500 text-xs">{`${item.variant} ${item.size}`}</span>
                    </div>
                    <span className="w-1/3 flex font-semibold justify-end">
                      Rs. {Number(item.discountedPrice).toFixed(2) * item.quantity}
                    </span>
                  </div>
                ))}
            </div>
            <div className="border-t mt-8">
              <div className="flex justify-between mt-4 mb-5">
                <span className="font-normal text-sm uppercase">Subtotal</span>
                <span className="font-normal text-sm">{orderData && orderData.priceInformation.subtotal}</span>
              </div>
              <div className="flex justify-between mt-4 mb-5">
                <span className="font-normal text-sm uppercase">Delivery</span>
                <span className="font-normal text-sm">{orderData && orderData.priceInformation.deliveryCharge}</span>
              </div>
              <div className="flex justify-between mt-4 mb-5">
                <span className="font-semibold text-sm uppercase">Total</span>
                <span className="font-semibold text-sm">{orderData && orderData.priceInformation.total}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
