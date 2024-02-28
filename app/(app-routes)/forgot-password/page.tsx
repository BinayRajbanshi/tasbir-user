'use client';
import React, { useEffect, useState } from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = () => {
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
          <h1 className="font-semibold text-2xl">Forgot your password?</h1>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 lg:max-w-full space-y-6">
            <p className="mt-2">Please enter the account that you want to reset the password.</p>
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
