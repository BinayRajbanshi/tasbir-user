'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/_components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form';
import { Textarea } from '@/_components/ui/textarea';
import { Input } from '@/_components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select';
// import { Textarea } from '@/_components/ui/textarea';
import { toast } from '@/_components/ui/use-toast';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useCartContext } from '@/contexts/cart-contexts';

const ForgotPasswordFormSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter an email address.',
    })
    .email(),
});

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordFormSchema>;

const defaultValues: Partial<ForgotPasswordFormValues> = {
  //   country: [],
  //   provinces: [],
  //   cities: [],
  //   urls: [{ value: 'https://shadcn.com' }, { value: 'http://twitter.com/shadcn' }],
};

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState();
  const [delivery, setDelivery] = useState();
  const [addresss, setAddress] = useState(null);
  const { setDeliveryData, setAddressId } = useCartContext();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  });
  const addAddressFunc = async (formData: any) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.tasbirstory.com/api/user/forgot-password`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === 200) {
        toast({
          title: 'Sucessful!',
          description: 'Your billing address has been updated!',
        });
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Something went wrong!',
        description: 'Please try again!',
      });
    } finally {
      setLoading(false);
    }
  };

  function onSubmit(data: ForgotPasswordFormValues) {
    const formData = {
      email: data.email,
    };
    addAddressFunc(formData);
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex max-w-md space-x-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button className="bg-[#800000] text-white hover:bg-[#AD3523]" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
}
