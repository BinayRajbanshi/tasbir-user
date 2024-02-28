import React from 'react';
import RegisterForm from './user-register-form';
import Link from 'next/link';

const SignUp = () => {
  return (
    <div className="my-container mx-auto mb-6 mt-4 flex w-full flex-col justify-center space-y-8">
      <div className="p-4 max-w-3xl mx-auto space-y-3 grid gap-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-gray-700 font-medium tracking-tight">Create your Tasbir Account</h1>
          <p className="text-gray-600  text-xs">
            Already member?{' '}
            <Link href="/login" className="text-blue-500">
              Login{' '}
            </Link>
            here
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default SignUp;
