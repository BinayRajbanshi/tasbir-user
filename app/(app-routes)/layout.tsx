import '../_assets/globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/_components/ui/toaster';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@/_components/ui/theme-provider';
import Navbar from '@/_components/_app-components/Navbar';
import Footer from '@/_components/_app-components/Footer';
import { poppins } from '@/lib/font';
import CartContextProvider from '@/contexts/cart-contexts';

export const metadata: Metadata = {
  title: 'Tasbir',
  description:
    'Tasbir is a tech news site providing technology News, reviews, price & more about Smartphone, Laptop, Tablets, Drones, Camera & Apps in Nepal.',
};

const fetchMenus = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/menu`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log('error', error);
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const menuData = await fetchMenus();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-white">
        <CartContextProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Toaster />
            <Navbar menuData={menuData} />
            {children}
            <Footer />
          </ThemeProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
