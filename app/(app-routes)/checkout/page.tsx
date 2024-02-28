'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card';
import { Button } from '@/_components/ui/button';
import { Label } from '@/_components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/_components/ui/radio-group';

import Coupon from '../cart/Coupon';
import CheckoutForm from './CheckoutForm';
import { useCartContext } from '@/contexts/cart-contexts';
import PayEsewa from '@/_components/_app-components/PayEsewa';
import { useRouter } from 'next/navigation';
import { useToast } from '@/_components/ui/use-toast';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function RootLayout() {
  const [loading, setLoading] = React.useState(false);
  const [cardData, setCartData] = useState();
  const { coupon, deliveryData, addressId, payment, setPayment, navChange } = useCartContext();

  useLayoutEffect(() => {
    const isAuth = navChange;

    if (!isAuth) {
      redirect('/');
    }
  }, []);

  const router = useRouter();
  const { toast } = useToast();
  const handlePaymentMethodChange = (value) => {
    setPayment(value);
  };

  const checkoutFunc = async () => {
    const formData = {
      data: '',
      couponCode: coupon?.code,
      paymentMethod: payment,
      addressId: addressId,
    };
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/create-order`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data) {
        toast({
          title: 'Sucessful !!',
          description: 'Your order has been placed sucessfully!',
        });
        router.push(`/order/list`);
      }
      console.log(data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const getCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data) {
        setCartData(data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    getCart();
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

  const subTotal = cardData && cardData?.total;
  const deliveryCharge = 5;

  return (
    <div className="my-container">
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

      <div className="container mx-auto mt-10"></div>
      <div className="flex flex-col md:flex-row shadow-md my-10">
        <div className="md:w-3/4 bg-white px-10 py-10">
          <Link href="/cart" className="flex font-semibold text-indigo-600 text-sm mb-5">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Back to cart
          </Link>
          <div className="flex flex-col justify-between pb-8">
            <h1 className="font-semibold text-2xl">1. Details</h1>
            <p className=" ">Your Billing address</p>
          </div>
          <CheckoutForm />
          <hr className="dark:border-gray-700  my-4 lg:my-12" />
          <div className="flex flex-col justify-between mt-8 pb-5">
            <h1 className="font-semibold text-2xl">2. Coupon</h1>
            <p className=" ">Discount Coupon.</p>
          </div>
          <Coupon />
          <hr className="dark:border-gray-700  my-4 lg:my-12 " />
          <div className="flex flex-col justify-between mt-8 pb-5">
            <h1 className="font-semibold text-2xl">3. Payments</h1>
            <p className=" ">Compelete Payments</p>
          </div>
          <RadioGroup value={payment} onValueChange={handlePaymentMethodChange} className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
              <Label
                htmlFor="cod"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-slate-900 peer-data-[state=checked]:border-slate-900 [&:has([data-state=checked])]:border-orange-500 ring ring-primary"
              >
                <div className="w-28 h-28 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100} id="cod">
                    <g transform="translate(69.121 -221.431) scale(.80905)">
                      <rect
                        width="63.214"
                        height="40.714"
                        x="-73.879"
                        y="317.729"
                        fill="#fff"
                        fillRule="evenodd"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth=".8"
                        rx="3.599"
                        ry="3.599"
                      />
                      <g
                        style={{
                          lineHeight: '125%',
                          InkscapeFontSpecification: '"Segoe WP Black, Ultra-Bold"',
                        }}
                      >
                        <path
                          style={{
                            textAlign: 'start',
                            lineHeight: '125%',
                            InkscapeFontSpecification: '"Segoe WP Black, Ultra-Bold"',
                          }}
                          d="M-54.939 346.532c-.188.068-.43.145-.727.231-.297.087-.64.166-1.031.237-.39.071-.826.132-1.307.18-.481.05-1.003.074-1.567.074-1.435 0-2.674-.215-3.718-.643-1.045-.428-1.905-1.007-2.581-1.735a6.98 6.98 0 0 1-1.505-2.541 9.512 9.512 0 0 1-.49-3.071c0-1.277.207-2.45.62-3.516a7.915 7.915 0 0 1 1.775-2.761c.77-.774 1.702-1.375 2.795-1.803 1.093-.428 2.32-.643 3.68-.643.938 0 1.748.059 2.428.175.68.117 1.222.227 1.628.333v4.496a5.32 5.32 0 0 0-.603-.299 6.391 6.391 0 0 0-.8-.276 8.087 8.087 0 0 0-.975-.203 7.653 7.653 0 0 0-1.127-.079c-.563 0-1.104.081-1.622.243a3.686 3.686 0 0 0-1.364.76c-.39.346-.703.785-.935 1.319-.233.533-.35 1.168-.35 1.904 0 .624.094 1.193.282 1.708.188.514.462.954.823 1.318.36.365.802.648 1.324.851.522.203 1.114.304 1.775.304a6.9 6.9 0 0 0 1.098-.084c.35-.057.675-.13.975-.22.3-.09.577-.188.828-.293.252-.105.476-.207.671-.304zm17.907-7.685c0 1.285-.21 2.443-.631 3.476a7.831 7.831 0 0 1-1.742 2.649 7.677 7.677 0 0 1-2.603 1.69 8.655 8.655 0 0 1-3.217.592 8.696 8.696 0 0 1-3.139-.564 7.594 7.594 0 0 1-2.569-1.617c-.732-.702-1.31-1.557-1.735-2.564-.425-1.006-.637-2.14-.637-3.403 0-1.262.203-2.42.609-3.47.405-1.053.972-1.956 1.701-2.711a7.592 7.592 0 0 1 2.62-1.758c1.018-.417 2.14-.626 3.364-.626 1.157 0 2.224.194 3.2.58.977.388 1.819.94 2.525 1.657.706.718 1.258 1.59 1.656 2.615.398 1.025.598 2.177.598 3.454zm-5.162.135c0-.691-.07-1.303-.208-1.837-.14-.533-.334-.982-.586-1.346a2.583 2.583 0 0 0-.902-.829 2.424 2.424 0 0 0-1.166-.281c-.548 0-1.018.112-1.409.338-.39.225-.71.53-.958.912-.247.384-.428.83-.54 1.341a7.573 7.573 0 0 0-.17 1.634c0 .752.083 1.392.248 1.922.166.53.387.961.665 1.296.278.334.598.578.958.732.36.154.736.231 1.127.231.376 0 .74-.08 1.093-.242.353-.162.667-.41.941-.744.274-.334.494-.76.66-1.279.165-.518.247-1.134.247-1.848zm22.696-.293c0 1.262-.2 2.404-.603 3.426-.402 1.022-.969 1.891-1.701 2.609-.733.717-1.615 1.271-2.648 1.662-1.033.39-2.181.586-3.443.586h-6.84v-16.16h6.693c1.09 0 2.057.092 2.902.276.845.184 1.585.445 2.22.783a5.886 5.886 0 0 1 1.6 1.217 6.192 6.192 0 0 1 1.054 1.59c.27.585.466 1.216.586 1.892.12.677.18 1.383.18 2.12zm-5.172.045c0-.526-.08-1.037-.237-1.532a3.82 3.82 0 0 0-.721-1.319 3.498 3.498 0 0 0-1.228-.918c-.496-.23-1.082-.344-1.758-.344h-1.251v8.542h1.363a3.84 3.84 0 0 0 1.6-.321 3.417 3.417 0 0 0 1.206-.902 4.04 4.04 0 0 0 .761-1.397 5.843 5.843 0 0 0 .265-1.809z"
                          fontFamily="Segoe WP Black"
                          fontSize="23.079"
                          fontWeight={800}
                          letterSpacing={0}
                          wordSpacing={0}
                        />
                      </g>
                      <rect
                        width="44.527"
                        height="40.714"
                        x="-16.051"
                        y="317.729"
                        fill="#fff"
                        fillRule="evenodd"
                        stroke="#000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth=".8"
                        rx="3.599"
                        ry="3.599"
                      />
                    </g>
                    <path
                      style={{
                        textIndent: 0,
                        textAlign: 'start',
                        lineHeight: 'normal',
                        textTransform: 'none',
                        blockProgression: 'tb',
                        marker: 'none',
                        InkscapeFontSpecification: 'Sans',
                      }}
                      d="M28.368 989.05a1.025 1.025 0 0 0 .296 2.028H45.36l-.76 2.072H31.368a1.015 1.015 0 0 0-.21 0 1.02 1.02 0 0 0 .21 2.029h12.513l-.761 2.113a1.015 1.015 0 0 0-.254-.042H34.92a1.015 1.015 0 0 0-.211 0 1.02 1.02 0 0 0 .211 2.03h7.482l-4.142 11.37a1.015 1.015 0 0 0 .972 1.395h15.09a1.015 1.015 0 0 0 1.015-1.1c-.019-.233-.042-.356-.042-.422a5.734 5.734 0 0 1 5.749-5.749 5.734 5.734 0 0 1 5.749 5.75c0 .06-.026.178-.043.422a1.015 1.015 0 0 0 1.015 1.1h3.72a1.015 1.015 0 0 0 1.014-1.016v-7.693a1.015 1.015 0 0 0-.76-1.014l-7.017-1.86L58 989.515a1.015 1.015 0 0 0-.845-.465H28.665a1.015 1.015 0 0 0-.212 0 1.02 1.02 0 0 0-.084 0zm19.191 2.028h9.046l6.637 10.822a1.015 1.015 0 0 0 .592.465l6.636 1.733v5.918h-1.775c-.277-4.036-3.548-7.27-7.651-7.27-4.106 0-7.42 3.231-7.694 7.27H40.711l6.848-18.938zm7.355 1.776-5.283.084a1.015 1.015 0 0 0-.973.761l-1.86 6.932a1.015 1.015 0 0 0 .972 1.269h10.357a1.015 1.015 0 0 0 .93-1.395l-3.17-7.06a1.015 1.015 0 0 0-.973-.591zm-.634 2.029 2.283 4.988h-7.482l1.31-4.904 3.89-.084zm6.89 12.047c-2.4 0-4.353 1.995-4.353 4.396a4.358 4.358 0 0 0 4.353 4.354 4.358 4.358 0 0 0 4.354-4.354c0-2.4-1.952-4.396-4.354-4.396zm0 2.03a2.37 2.37 0 0 1 2.368 2.366c0 1.305-1.063 2.283-2.368 2.283-1.304 0-2.367-.978-2.367-2.283a2.37 2.37 0 0 1 2.367-2.367z"
                      color="#000"
                      fontFamily="Sans"
                      fontWeight={400}
                      overflow="visible"
                      transform="translate(40 -612.053) scale(.66377)"
                    />
                  </svg>
                </div>
                Cash On Delivery
              </Label>
            </div>
            <div>
              <RadioGroupItem value="esewa" id="esewa" className="peer sr-only" />
              <Label
                htmlFor="esewa"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-slate-900 peer-data-[state=checked]:border-slate-900 [&:has([data-state=checked])]:border-primary ring ring-primary"
              >
                <div className="w-28 h-28 flex items-center">
                  <img width={100} height={100} alt="esewa logo" src="/images/esewa-logo.webp" />
                </div>
                Esewa
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div id="summary" className="md:w-2/6 px-8 py-10 h-max sticky top-2">
          <h1 className="font-semibold mt-5 text-2xl border-b pb-8">Order Summary</h1>
          <div className="h-64 overflow-scroll">
            {cardData &&
              cardData?.items.map((item) => (
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
            <div className="flex justify-between mt-4 mb-5">
              <span className="font-normal text-sm uppercase">Subtotal</span>
              <span className="font-normal text-sm">Rs. {cardData?.total}</span>
            </div>
            {coupon && (
              <div className="flex justify-between mt-10">
                <span className="font-normal text-sm uppercase">Coupon</span>
                <span className="font-normal text-sm">-Rs. {coupon.value}</span>
              </div>
            )}

            {deliveryData && (
              <div className="flex justify-between mt-4 mb-5">
                <span className="font-normal text-sm uppercase">Delivery</span>
                <span className="font-normal text-sm">+Rs. {deliveryData.amount}</span>
              </div>
            )}
            <div className="flex justify-between mt-4 mb-5">
              <span className="font-semibold text-sm uppercase">{cardData?.count} Items</span>
              <span className="font-semibold text-sm">
                Rs.{' '}
                {parseInt(cardData?.total) - (coupon && coupon.value) + (deliveryData && parseInt(deliveryData.amount))}
              </span>
            </div>
            {payment == 'esewa' ? (
              <PayEsewa />
            ) : (
              <Button
                onClick={() => checkoutFunc()}
                disabled={addressId ? false : true}
                className={`w-full h-10 p-2 mr-4 bg-[#800000] dark:text-gray-200 text-gray-50 hover:bg-[#AD3523]`}
              >
                Checkout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
