'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/_components/ui/card';
import { Button } from '@/_components/ui/button';
import CartQuantity from './CartQuantity';
import { ConfirmDialog } from './ConfirmDialog';
import { Loader2 } from 'lucide-react';
import Coupon from './Coupon';
import { useCartContext } from '@/contexts/cart-contexts';

export default function RootLayout() {
  const [loading, setLoading] = React.useState(false);
  const [cardData, setCartData] = useState();
  const [delivery, setDelivery] = useState();
  const { deliveryData, addressId, coupon } = useCartContext();
  const [esewaData, setEsewaData] = useState();

  const getPaymentData = async () => {
    setLoading(true);
    const formData = {
      addressId: addressId,
      couponCode: coupon?.code,
      paymentMethod: 'esewa',
    };
    try {
      const res = await fetch(`/api/cart/payment`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data) {
        setLoading(false);
        setEsewaData(data.data);
      }
      console.log(data);
    } catch (error) {
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
    getPaymentData();
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
    <div className="flex flex-col justify-start items-start">
      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
        <input id="amount" name="amount" defaultValue={esewaData && esewaData?.amount} required type="hidden" />
        <input type="hidden" id="tax_amount" name="tax_amount" defaultValue={esewaData?.tax_amount} required />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          defaultValue={esewaData && esewaData?.total_amount}
          required
        />
        <input
          type="hidden"
          id="transaction_uuid"
          defaultValue={esewaData?.transaction_uuid}
          name="transaction_uuid"
          required
        />
        <input type="hidden" id="product_code" name="product_code" defaultValue={esewaData?.product_code} required />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          defaultValue={esewaData?.product_service_charge}
          required
        />
        <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" defaultValue={0} required />
        <input type="hidden" id="success_url" name="success_url" defaultValue={esewaData?.success_url} required />
        <input type="hidden" id="failure_url" name="failure_url" defaultValue={esewaData?.failure_url} required />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          defaultValue={esewaData?.signed_field_names}
          required
        />
        <input type="hidden" id="signature" defaultValue={esewaData?.signature} name="signature" required />
        <input
          defaultValue="Continue Payment"
          type="submit"
          className="w-full h-10 p-2 mr-4 bg-[#800000] dark:text-gray-200 text-gray-50 hover:bg-[#AD3523]"
        />
      </form>
    </div>
  );
}
