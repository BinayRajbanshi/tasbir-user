'use client';
import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { useDropzone } from 'react-dropzone';

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
const profileFormSchema = z.object({
  FullName: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  phoneNumber: z
    .string()
    .min(7, {
      message: 'Phone nubmer must be at least 7 digits.',
    })
    .max(10, {
      message: 'Phone number cannot me more that 10 digit',
    }),
  DateOfBirth: z.string({
    required_error: 'A date of birth is required.',
  }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  gender: z.string({
    required_error: 'Please select an email to display.',
  }),
  profilePicture: z
    .array(
      z.string().refine(
        (value) => {
          if (typeof value === 'string') {
            const allowedFormats = ['jpeg', 'jpg', 'png', 'webp', 'gif'];
            const fileFormat = value.split('.').pop()?.toLowerCase();
            console.log('File Format:', fileFormat);
            return fileFormat && allowedFormats.includes(fileFormat);
          }
          return false;
        },
        {
          message: 'File must be one of the following formats: jpeg, jpg, png, webp, gif.',
        }
      )
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.

export function ProfileForm(data: any) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [changeImage, setChangeImage] = useState<string | boolean>(false);
  const defDate = new Date(data?.data?.DateOfBirth);
  console.log(defDate);
  const defaultValues: Partial<ProfileFormValues> = {
    FullName: data?.data?.FullName,
    email: data?.data?.email,
    phoneNumber: data?.data?.phoneNo,
    gender: data?.data?.gender,
    DateOfBirth: data?.data?.DateOfBirth,
    // DateOfBirth: new Date(defDate),
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const removePreviewImage = () => {
    setFile(undefined);
    setPreviewImage(null);
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  });
  const updateProfile = async (formData: any) => {
    try {
      const res = await fetch(`/api/profile/update-profile`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data) {
        toast({
          title: 'Sucessful!',
          description: 'User profile has been updated successfully.',
        });
      }
      console.log(data);
    } catch (error) {
    } finally {
    }
  };

  function onSubmit(data: ProfileFormValues) {
    const formData = new FormData();
    formData.append('profilePicture', file || '');

    formData.append('FullName', data.FullName || '');
    formData.append('phoneNumber', data.phoneNumber || '');
    formData.append('DateOfBirth', data.DateOfBirth || '');
    formData.append('email', data.email || '');
    formData.append('gender', data.gender || '');
    formData.append('offersNotification', '0');
    updateProfile(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <FormField
          control={form.control}
          name="FullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name*</FormLabel>
              <FormControl>
                <Input readOnly placeholder="Enter Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email* </FormLabel>
              <FormControl>
                <Input readOnly placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone*</FormLabel>
              <FormControl>
                <Input placeholder="Enter Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Profile Picture</FormLabel>
              {data?.data?.profilePicture && !changeImage ? (
                <>
                  <img src={data?.data?.profilePicture} className="w-24 h-24" />
                  <span className="text-[#800000] cursor-pointer" onClick={() => setChangeImage(true)}>
                    Change Profile Picture
                  </span>
                </>
              ) : (
                <FormControl>
                  <div>
                    <div
                      {...getRootProps()}
                      className="dropzone border-2 border-dashed border-gray-300 w-full  rounded p-4 cursor-pointer transition ease-in-out duration-300 "
                    >
                      <Input type="file" {...getInputProps()} {...field} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>

                    {previewImage && (
                      <div>
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                        />
                        <span className="cursor-pointer text-red-500" onClick={removePreviewImage}>
                          Remove
                        </span>
                      </div>
                    )}
                  </div>
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <div className="w-full">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <div className="relative w-full">
                    <FormControl>
                      <select
                        className={cn(
                          buttonVariants({ variant: 'outline' }),
                          'w-full appearance-none bg-transparent font-normal'
                        )}
                        {...field}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </FormControl>
                    <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="DateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-10 p-2 mr-4 bg-[#800000] dark:text-gray-200 text-gray-50 hover:bg-[#AD3523]"
          type="submit"
        >
          Update profile
        </Button>
      </form>
    </Form>
  );
}
