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

const AddressFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select a Landmark.',
    })
    .email(),
  area: z
    .string()
    .min(5, {
      message: 'Area must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  phoneNumber: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  //   country: z.enum({
  //     invalid_type_error: 'Select a Country',
  //     required_error: 'Please select a country.',
  //   }),
  //   provinces: z.enum({
  //     invalid_type_error: 'Select a Country',
  //     required_error: 'Please select a country.',
  //   }),
  //   cities: z.enum({
  //     invalid_type_error: 'Select a Country',
  //     required_error: 'Please select a country.',
  //   }),
  countryId: z.string({
    required_error: 'Please select an country to display.',
  }),
  deliveryChargeId: z.string({
    required_error: 'Please select a delivery.',
  }),

  provinceId: z.string({
    required_error: 'Please select an country to display.',
  }),
  cityId: z.string({
    required_error: 'Please select an country to display.',
  }),
  landmark: z.string().max(160).min(4),
  //   urls: z
  //     .array(
  //       z.object({
  //         value: z.string().url({ message: 'Please enter a valid URL.' }),
  //       })
  //     )
  //     .optional(),
});

type AddressFormValues = z.infer<typeof AddressFormSchema>;

export default function AddressForm(address: any) {
  console.log(address.address);
  const defaultValues: Partial<AddressFormValues> = {
    firstName: address?.address?.firstName,
    lastName: address?.address?.lastName,
    email: address?.address?.email,
    area: address?.address?.area,
    phoneNumber: address?.address?.phoneNumber,
    nearestLandmark: address?.address?.landmark,
  };

  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState();
  const [delivery, setDelivery] = useState();
  const { setAddressId } = useCartContext();

  const getLocation = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/location`, {
        method: 'GET',
      });
      const data = await res.json();
      setLocation(data.data);
    } catch (error) {
      // Handle the error
    } finally {
      setLoading(false);
    }
  };
  const getDelivery = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/delivery`, {
        method: 'GET',
      });
      const data = await res.json();
      setDelivery(data.data);
    } catch (error) {
      // Handle the error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    getLocation();
    getDelivery();
  }, []);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(AddressFormSchema),
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
      const res = await fetch(`/api/cart/address`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data) {
        toast({
          title: 'Sucessful!',
          description: 'Your billing address has been updated!',
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

  function onSubmit(data: AddressFormValues) {
    const countryParts = data.countryId.split(',');
    const provinceParts = data.provinceId.split(',');
    const cityParts = data.cityId.split(',');
    const deliveryParts = data.deliveryChargeId.split(',');
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      area: data.area,
      phoneNumber: data.phoneNumber,
      countryId: countryParts[0],
      provinceId: provinceParts[0],
      cityId: cityParts[0],
      nearestLandmark: data.landmark,
      deliveryChargeId: deliveryParts[0],
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <div className="flex space-x-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="countryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className="text-[#000]" placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {location &&
                        location.country.map((item) => (
                          <SelectItem key={item.id} value={`${item.id},${item.name}`}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="provinceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className="text-[#000]" placeholder="Select a Province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {location &&
                        location.provinces.map((item) => (
                          <SelectItem key={item.id} value={`${item.id},${item.name}`}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="cityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cities</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className="text-[#000]" placeholder="Select a City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {location &&
                        location.cities.map((item) => (
                          <SelectItem key={item.id} value={`${item.id},${item.name}`}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="deliveryChargeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className="text-[#000]" placeholder="Select Delivery" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {delivery &&
                        delivery.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={`${item.id},${item.description + ' Rs.' + item.deliveryCharge}`}
                          >
                            {item.description}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input placeholder="Area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="landmark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nearest Landmark</FormLabel>
                  <FormControl>
                    <Textarea placeholder="i.e Bhatbhateni, Nabil Bank" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button className="bg-[#800000] text-white hover:bg-[#AD3523]" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
