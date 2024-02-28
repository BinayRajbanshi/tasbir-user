'use client';

import React, { useEffect, useState } from 'react';
import { useToast } from '@/_components/ui/use-toast';
import ProductDetails from '../productDetails';
import { ApiResponse, ProductDetail } from '@/_types/productTypes';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [productData, setProductData] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    if (params) {
      const fetchData = async () => {
        try {
          const selectedProduct = await fetch(`https://api.tasbirstory.com/api/user/products/${params.slug}`);

          if (selectedProduct.ok) {
            const apiResponse: ApiResponse = await selectedProduct.json();
            setProductData(apiResponse.data);
            setLoading(false);
          } else {
            toast({
              title: 'Failed to fetch Product details.',
              description: selectedProduct.status,
              variant: 'destructive',
            });
            setLoading(false);
          }
        } catch (error) {
          toast({
            title: 'API Request Error:',
            variant: 'destructive',
          });
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [params, toast]);

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
    <div className="my-container">
      <div className="mt-4">
        <div>{productData && <ProductDetails productData={productData} />}</div>
      </div>
    </div>
  );
}
