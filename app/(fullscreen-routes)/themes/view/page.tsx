import React from 'react';
import ViewPage from './viewPage';
import axios from 'axios';

const View = () => {
  const serverAdd = async (formData: any) => {
    'use server';
    console.log(formData);
    try {
      const response = await fetch(`https://api.tasbirstory.com/system/api/user/cart/add`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json', // Make sure to set the Content-Type header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
      } else {
        const responseData = await response.json();
        console.log(responseData);
      }
    } catch (error) {
      console.error('Network error:', error);
      console.log(error);
    }
  };

  return (
    <div className="">
      <ViewPage server={serverAdd} />
    </div>
  );
};

export default View;
