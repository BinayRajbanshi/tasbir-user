'use client';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from '@/_components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { toast } from '@/_components/ui/use-toast';
import { useCartContext } from '@/contexts/cart-contexts';

const FormSchema = z.object({
  couponCode: z.string().min(2, {
    message: 'Coupon Code must be at least 2 characters.',
  }),
});

export default function Coupon() {
  const [loading, setLoading] = useState(false);

  const { coupon, setCoupon } = useCartContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      couponCode: '',
    },
  });

  const removeItem = () => {
    setCoupon(null);
  };

  async function onSubmit(coupon: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/coupon`, {
        method: 'POST',
        body: JSON.stringify(coupon),
      });
      const data = await res.json();
      if (data.data) {
        setCoupon(data.data);
        setLoading(false);
        toast({
          title: data.message,
          description: `${JSON.stringify(coupon.couponCode)} was successfully applied.`,
        });
      } else {
        toast({
          title: data.message,
          variant: 'destructive',
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: 'Something went wrong!',
        variant: 'destructive',
      });
      setLoading(false);
    }
  }

  if (coupon) {
    return (
      <>
        {/* <div className="flex justify-between mt-10 mb-5">
          <div className="flex flex-col">
            <span className="font-medium inline-block mb-3 text-sm uppercase">{couponData && couponData.code}</span>
            <ConfirmDialog type="remove">
              <a
                onClick={() => removeItem()}
                className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs"
              >
                Delete
              </a>
            </ConfirmDialog>
          </div>
          <span className="font-medium text-sm">-Rs. {couponData && Number(couponData.value).toFixed(2)}</span>
        </div> */}
        <div className="mt-4 p-4 border border-dashed border-orange-500  rounded">
          <div className="flex justify-between items-center mb-2">
            <p className="text-orange-500 font-semibold">Coupon Applied: {coupon && coupon.code}</p>
            {/* <button onClick={handleRemoveCoupon} className="text-red-500 hover:text-red-700 focus:outline-none">
              Remove
            </button> */}
            <ConfirmDialog type="remove">
              <a
                onClick={() => removeItem()}
                className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-xs"
              >
                Delete
              </a>
            </ConfirmDialog>
          </div>
          <p className="text-sm text-gray-600">
            Congratulations! You've applied a special discount with this coupon code.
          </p>
          {/* You can provide additional details or messages here */}
        </div>
      </>
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 space-y-6">
        <FormField
          control={form.control}
          name="couponCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold inline-block mb-1 text-sm uppercase">Promo code</FormLabel>
              <FormControl>
                <Input className="p-2 text-sm w-full" placeholder="Enter promo code" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          disabled={loading}
          className="bg-[#800000] hover:bg-[#AD3523] px-4 mt-1 py-2 text-sm text-white uppercase"
          type="submit"
        >
          Apply{loading && 'ing...'}
        </button>
      </form>
    </Form>
  );
}
