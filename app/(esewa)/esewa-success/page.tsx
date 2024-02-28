'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartContext } from '@/contexts/cart-contexts';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const EsewaSucess = () => {
  const searchParams = useSearchParams();
  const { coupon, deliveryData, addressId, payment, setPayment } = useCartContext();
  const router = useRouter();

  const search = searchParams.get('orderId');
  // Split the string by '?'
  const parts = search.split('?');

  // Extract orderId and data
  const orderId = parts[0];
  const dataPart = parts[1].split('=')[1]; // Extract the part after 'data='

  console.log(orderId);
  console.log(dataPart);
  const createOrder = async (newData: any) => {
    try {
      const res = await fetch(`/api/order/create-order`, {
        method: 'POST',
        body: JSON.stringify(newData),
      });
      const data = await res.json();
      console.log(data.code);
      if (data.code === 200) {
        router.push('/order/list');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
    }
  };
  useEffect(() => {
    console.log(search);
    const newData = {
      orderId: Number(orderId),
      data: dataPart,
      paymentMethod: 'esewa',
    };
    createOrder(newData);
    // Your logic to handle the 'data' parameter
    // Add any other logic you need with the query parameter 'data'
    // Example: Redirect to another page after 2 seconds
    // const redirectTimeout = setTimeout(() => {
    //   router.push('/order/list'); // Replace '/your-destination-page' with the actual path
    // }, 2000);
    // Clear the timeout to avoid memory leaks
    // return () => clearTimeout(redirectTimeout);
  }, [search]);

  return (
    <div className="bg-white flex items-center h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Successful!</h3>
          <Loader2 className="h-8 w-8 mx-auto block animate-spin mt-5" />
          <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
          <p> Please wait! you will be redirected shortly...</p>
        </div>
      </div>
    </div>
  );
};

export default EsewaSucess;
