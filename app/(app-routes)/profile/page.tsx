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

import { useRouter } from 'next/navigation';
import { useToast } from '@/_components/ui/use-toast';
import { ProfileForm } from './ProfileForm';
import SideBar from '@/_components/_app-components/profile-components/sidebar/index';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function RootLayout() {
  const [loading, setLoading] = React.useState(false);
  const [profileData, setProfileData] = useState();
  const { setPayment, navChange } = useCartContext();
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
  const getOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/profile/get-profile`, {
        method: 'GET',
      });
      const data = await res.json();
      if (data) {
        setProfileData(data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    getOrder();
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
          <h1 className="font-semibold text-2xl">Profile</h1>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SideBar page="profile" />
          <div className="flex-1 lg:max-w-full space-y-6">
            <ProfileForm data={profileData} />
          </div>
        </div>
      </div>
    </div>
  );
}
