'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { useEffect } from 'react';

import * as z from 'zod';
import styles from '@/_assets/login.module.css';
import { Checkbox } from '@/_components/ui/checkbox';
import { useRouter } from 'next/navigation';

import { Button } from '@/_components/ui/button';
import Link from 'next/link';
import { useToast } from '@/_components/ui/use-toast';
import { ToastAction } from '@/_components/ui/toast';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form';
import { Input } from '@/_components/ui/input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useCartContext } from '@/contexts/cart-contexts';

interface FormInputT {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(2, {
    message: 'password must be at least 2 characters.',
  }),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const page = ({ className, ...props }: UserAuthFormProps) => {
  const [loginData, setLoginData] = useState(null);
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { setNavChange } = useCartContext();
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  const loginUser = async (values: FormInputT) => {
    try {
      setIsLoading(true);
      const res = await axios.post('/api/login', values);
      if (res.status == 200) {
        router.back();
        setIsLoading(false);
        setNavChange(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsLoading(false);
        toast({
          description: 'Please Check your email & password',
          variant: 'destructive',
        });
      } else {
        setIsLoading(false);
        toast({
          title: `Unexpected Error`,
          description: `${error}`,
          variant: 'destructive',
        });
        return 'error occured';
      }
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    loginUser(values);
  };

  return (
    <Form {...form}>
      <div className="mx-auto mt-6 w-96 mb-10 ">
        <h1 className="text-center font-normal font-kurale text-2xl">Login</h1>
        <p className="font-kurale font-normal mb-4 mt-4 text-gray-700 dark:text-gray-400 text-center">
          Enter your email and password to login:
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96 justify-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl className={form.formState.errors.email ? styles['error-border'] : ''}>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className=" flex items-center relative">
                    <Input
                      placeholder="Password"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      className={`w-full px-3  py-2 mt-1   rounded-md focus:ring-indigo-500 ${
                        form.formState.errors.password ? styles['error-border'] : ''
                      }`}
                    />
                    <div className="absolute top-1 right-2">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="   flex  inset-y-2 right-0  items-center  text-gray-500"
                      >
                        {showPassword ? <AiFillEyeInvisible className="h-10" /> : <AiFillEye className="h-10" />}
                      </button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2"></div>
          </div>
          <Button type="submit" className="bg-[#000000] text-white hover:bg-[#AD3523] right-0  w-96  text-md">
            LOGIN
          </Button>
          <p className="text-base font-kurale font-normal text-start">
            <Link
              href="/forgot-password"
              className="text-[#800000] ml-2 transition duration-150 ease-in-out hover:text-blue-600"
            >
              Forgot Password ?
            </Link>
          </p>
          <p className="text-base py-4 font-kurale font-normal text-center">
            Don't have an account?
            <Link
              href="/signup"
              className="text-[#800000] ml-2 transition duration-150 ease-in-out hover:text-blue-600"
            >
              Register here
            </Link>
          </p>

          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-normal dark:text-white">Or</p>
          </div>

          <h3 className="font-normal text-center  text-sm">Sign with</h3>

          <div className="flex">
            <Link
              href=""
              className="mb-3 ml-12 flex w-32 bg-blue-600 items-center justify-center rounded  px-7 pb-2.5 pt-3 text-center text-xs font-medium uppercase leading-normal text-white"
              // style="background-color: #3b5998"
              role="button"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <div className="mr-4">
                <FaFacebookF />
              </div>
              Facebook
            </Link>
            <Link
              href=""
              className="mb-3 flex w-32 ml-6 items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-xs font-medium uppercase leading-normal bg-red-600 text-white "
              role="button"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <div className="mr-4">
                {' '}
                <BiLogoGmail />
              </div>
              Gmail
            </Link>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default page;
