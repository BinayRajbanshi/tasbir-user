'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/_components/ui/button';
import CartQuantity from './CartQuantity';
import { ConfirmDialog } from './ConfirmDialog';
import { Loader2 } from 'lucide-react';
import { useCartContext } from '@/contexts/cart-contexts';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const { cart, setCart, navChange } = useCartContext();
  useLayoutEffect(() => {
    const isAuth = navChange;
    if (!isAuth) {
      redirect('/');
    }
  }, []);
  const getCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data) {
        setCart(data.data);
        console.log(data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const removeItem = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/delete/${id}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data) {
        getCart();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white`}>
        <div className="bg-transparent rounded p-4 flex flex-col items-center">
          <Image width={80} height={80} alt="gadgetbyte's logo" src="/images/TasbirLogo.png" />
          <Loader2 className="h-8 w-8 animate-spin mt-5" />
        </div>
      </div>
    );
  }

  return (
    <div className="my-container">
      {cart && cart.count !== 0 ? (
        <div className="flex flex-col md:flex-row shadow-md my-10">
          <div className="md:w-4/6 bg-white px-10 py-10">
            <a href="#" className="flex font-semibold text-indigo-600 text-sm mb-5">
              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </a>
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cart?.count} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
            </div>
            {cart &&
              cart?.items.map((item: any) => (
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    {' '}
                    {/* product */}
                    <div className="w-20 h-20 relative group bg-1 overflow-hidden">
                      <div className="object-fill">
                        <img className="absolute inset-0 w-full h-full object-cover" src={item.image} alt="" />
                      </div>

                      <img className="absolute inset-0 w-20 h-20" src={item.frame} />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.productName}</span>
                      <span className="text-gray-500 text-xs">{`${item.variant} ${item.size}`}</span>
                      <div className="flex space-x-4">
                        <ConfirmDialog type="remove">
                          <a
                            onClick={() => removeItem(item.id)}
                            className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs"
                          >
                            Delete
                          </a>
                        </ConfirmDialog>
                      </div>
                    </div>
                  </div>
                  <CartQuantity
                    removeCart={removeItem}
                    getCart={getCart}
                    rowId={item.id}
                    defaultValue={item.quantity}
                  />
                  <span className="text-center w-1/5 font-semibold text-sm">
                    Rs. {Number(item.discountedPrice).toFixed(2)}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    Rs. {Number(item.discountedPrice).toFixed(2) * item.quantity}
                  </span>
                </div>
              ))}
          </div>
          <div id="summary" className="md:w-2/6 px-8 py-10 h-max md:sticky md:top-2">
            <h1 className="font-semibold mt-5 text-2xl border-b pb-8">Order Summary</h1>
            <div className="h-h-64 overflow-scroll">
              {cart &&
                cart?.items.map((item) => (
                  <div className="flex font-normal justify-between py-2 text-sm uppercase">
                    <div className="flex flex-col w-2/3">
                      <span className="truncate">{`${item.quantity} X ${item.productName}`}</span>
                      <span className="text-gray-500 text-xs">{`${item.variant} ${item.size}`}</span>
                    </div>
                    <span className="w-1/3 flex font-semibold justify-end">
                      Rs. {Number(item.discountedPrice).toFixed(2) * item.quantity}
                    </span>
                  </div>
                ))}
            </div>

            <div className="border-t mt-8">
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">{cart?.count} Items</span>
                <span className="font-semibold text-sm">Rs. {cart?.total}</span>
              </div>
              <Button className="w-full h-10 p-2 mr-4 bg-[#800000] dark:text-gray-200 text-gray-50 hover:bg-[#AD3523]">
                <Link href="/checkout">Continue Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="shadow-md my-10 p-12 ">
          <a href="#" className="flex font-semibold text-indigo-600 text-sm mb-5">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </a>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <img
                className="w-64 h-64"
                src="https://res.cloudinary.com/daqsjyrgg/image/upload/v1690257804/jjqw2hfv0t6karxdeq1s.svg"
                alt="image empty states"
              />
            </div>
            <h1 className="text-gray-700 font-medium text-2xl text-center mb-3">Your Cart is currenty empty!</h1>
            {/* <p className="text-gray-500 text-center mb-6">
              :( Need some help? Unlock 20% off & free Shipping at checkout!
            </p> */}
            <div className="flex flex-col justify-center">
              <Link
                href="/"
                className="flex items-center inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-orange-500 tracking-wide text-white text-lg hover:bg-orange-700 hover:text-white rounded-md"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
