'use client';

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Button } from '@/_components/ui/button';
import { Input } from '@/_components/ui/input';
import DateOfBirthPicker from '@/_components/_app-components/_signup-components/DateOfBirthPicker';
import { Label } from '@/_components/ui/label';
import Link from 'next/link';
import { AiOutlineLoading } from 'react-icons/ai';
import GenderPicker from '@/_components/_app-components/_signup-components/GenderPIcker';
import { useRouter } from 'next/navigation';
import { useToast } from '@/_components/ui/use-toast';
import SocialLogin from './social-login';
import axios from 'axios';

interface FormInputT {
  email: string;
  code: string;
  name: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  receiveOffers: boolean;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const RegisterForm: React.FC<RegisterFormProps> = ({ className, ...props }) => {
  const methods = useForm<FormInputT>();
  const Route = useRouter();
  const { toast } = useToast();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>('Select Gender');
  const [countdown, setCountdown] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = methods;

  const onSubmit = async (data: FormInputT) => {
    try {
      setIsLoading(true);
      const formData = {
        email: data.email,
        verificationCode: data.code,
        fullName: data.name,
        phoneNumber: data.phoneNumber,
        gender: selectedGender,
        dateOfBirth: selectedDate,
        offersNotification: data.receiveOffers,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const response = await fetch(`https://api.tasbirstory.com/system/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          description: 'Signup Successful!',
        });
        setServerError(null);
        Route.push('/');
      } else {
        const errorData = await response.json();
        if (errorData.message) {
          toast({
            description: errorData.message,
            variant: 'destructive',
          });
        } else {
          toast({
            description: 'Failed to sign up. Please try again.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Validation function for password
  function validatePassword(value: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return (
      passwordRegex.test(value) ||
      'Password should contain at least 6 characters with 1 capital letter, 1 small letter, 1 number, and 1 special character.'
    );
  }

  const sendVerificationCode = async (email: string): Promise<string | boolean> => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!email) {
      return 'Email is required.';
    } else if (!emailRegex.test(email)) {
      toast({
        description: 'Please enter a valid email.',
        variant: 'destructive',
      });
    }
    try {
      const response = await fetch(`https://api.tasbirstory.com/api/user/register/send-mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsEmailSent(true);
        setCountdown(60);
        toast({
          description: data.message,
        });
        return data.message;
      } else {
        toast({
          description: response.statusText,
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  // Function to handle sending the verification code
  const handleSendVerificationCode = async () => {
    const email = getValues('email');
    if (!email) {
      toast({
        description: 'Email is required.',
        variant: 'destructive',
      });
      return;
    }

    if (!isEmailSent || (isEmailSent && countdown === 0)) {
      // Send data to the API here and handle the response
      const isSent = await sendVerificationCode(email);
      if (isSent) {
        const intervalId = setInterval(() => {
          if (countdown === 1) {
            clearInterval(intervalId);
            setIsEmailSent(false);
            setCountdown(null);
          } else {
            setCountdown((prevCountdown) => (prevCountdown ? prevCountdown - 1 : prevCountdown));
          }
        }, 1000);
      }
    }
  };

  useEffect(() => {}, [countdown]);

  const handleSocialLogin = async (platform: 'facebook' | 'google') => {
    const apiEndpoint = `/api/authRedirect?platform=${platform}`;

    try {
      const res = await axios.get(apiEndpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        window.location.href = res.data;
        console.log('responsed data is : ', res.data);
      } else {
        throw new Error('Signup Failed');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          description: error.response?.data?.message || error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: `Unexpected Error`,
          description: `${error}`,
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="flex bg-gray-100 p-4">
      <div className={`mx-auto w-full`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Left Section */}
          <div className="flex space-x-4 py-4">
            <div className="w-full">
              <Label htmlFor="email" className="text-xs">
                Email Address*
              </Label>
              <div className="flex mt-2">
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required here.',
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0.9.-]+\.[A-Z|a-z]{2,4}$/,
                      message: 'Please enter a valid email address.',
                    },
                  })}
                  className="text-xs"
                />
                <Button
                  type="button"
                  className={`text-xs text-black-100 border border-gray-300 ${
                    isEmailSent
                      ? 'bg-white hover:bg-[#800000] hover:text-white'
                      : 'bg-white hover:bg-[#800000] hover:text-white'
                  }`}
                  onClick={handleSendVerificationCode}
                >
                  {isLoading && <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />}
                  {isEmailSent ? (countdown ? ` ${countdown}` : 'Resend') : 'Send'}
                </Button>
              </div>
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="w-full">
              <Label htmlFor="code" className="text-xs ">
                Verification Code*
              </Label>
              <Input
                type="text"
                id="code"
                placeholder="Enter verification code"
                {...register('code', { required: 'Verification code is required.' })}
                className="text-xs mt-2"
              />
              {errors.code && <span className="text-red-500">{errors.code.message}</span>}
            </div>
          </div>
          <div className="flex space-x-4 py-4">
            <div className="w-full">
              <Label htmlFor="password" className="text-xs">
                Password*
              </Label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    {...field}
                    className={`text-xs mt-2 ${errors.password ? 'border-red-500' : ''}`}
                  />
                )}
                rules={{
                  required: 'Password is required',
                  validate: (value) =>
                    validatePassword(value) ||
                    'Password should contain at least 6 characters with 1 capital letter, 1 small letter, 1 number, and 1 special character.',
                }}
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div className="w-full">
              <Label htmlFor="confirmPassword" className="text-xs">
                Confirm Password*
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                {...register('confirmPassword', {
                  required: 'Confirmation password is required.',
                  validate: (value) => value === methods.watch('password') || 'Passwords do not match',
                })}
                className="text-xs mt-2"
              />
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
            </div>
          </div>
          <div className="flex space-x-4 py-4">
            <div className="w-full">
              <Label htmlFor="name" className="text-xs">
                Full Name*
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your full name"
                {...register('name', { required: 'Full Name is required' })}
                className="text-xs mt-2"
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>
            <div className="w-full">
              <Label htmlFor="phoneNumber" className="text-xs">
                Phone Number*
              </Label>
              <Input
                type="tel"
                id="phoneNumber"
                placeholder="Enter your phone number"
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid phone number.',
                  },
                })}
                className="text-xs mt-2"
              />
              {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
            </div>
          </div>

          <div className="flex space-x-4 py-4">
            <div className="w-full mt-6">
              <div className="space-y-2 mb-2">
                <Button type="submit" className="bg-[#000000] text-white hover:bg-[#AD3523] w-full  p-4 h-10">
                  {isLoading && <AiOutlineLoading className="mr-2 h-6 w-6 animate-spin" />} SIGN UP
                </Button>
              </div>

              <p className="text-xs w-full text-gray-500 text-center">
                By clicking 'SIGN UP', I agree to Tasbir's
                <Link href="/terms-and-conditions" className="text-blue-400">
                  {' '}
                  Terms of Use{' '}
                </Link>
                and{' '}
                <Link href="/privacy" className="text-blue-400">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </form>
        <div className="flex w-full justify-center space-x-4">
          <hr className="border-t border-gray-300 my-4" />
          <div className="mt-4 flex flex-col items-center justify-center space-y-4">
            <p className="font-semibold text-gray-600">Or, sign up with:</p>
            <SocialLogin
              onFacebookLogin={() => handleSocialLogin('facebook')}
              onGoogleLogin={() => handleSocialLogin('google')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
