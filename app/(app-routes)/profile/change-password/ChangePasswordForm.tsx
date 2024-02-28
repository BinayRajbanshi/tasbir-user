'use client';
import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/_components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select';
import { Textarea } from '@/_components/ui/textarea';
import { toast } from '@/_components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/_components/ui/popover';
import { Calendar } from '@/_components/ui/calendar';
import { CalendarIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { RadioGroup, RadioGroupItem } from '@/_components/ui/radio-group';

const changePasswordFormSchema = z.object({
  currentPassword: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  newPassword: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(30, {
      message: 'Password must not be longer than 30 characters.',
    }),
});

type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

// This can come from your database or API.

export function ChangePasswordForm(data: any) {
  const [loading, setLoading] = useState(false);
  const defaultValues: Partial<ChangePasswordFormValues> = {
    // DateOfBirth: new Date(data?.data?.DateOfBirth),
    // DateOfBirth: new Date(defDate),
  };

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema),
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
      const res = await fetch(`/api/profile/change-password`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data) {
        toast({
          title: 'Sucessful!',
          description: 'Your Password is changed',
        });
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  function onSubmit(data: ChangePasswordFormValues) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    addAddressFunc(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter Current Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter Current Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter Current Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-10 p-2 mr-4 bg-[#800000] dark:text-gray-200 text-gray-50 hover:bg-[#AD3523]"
          type="submit"
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
}
