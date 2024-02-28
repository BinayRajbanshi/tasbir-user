'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/_types/homeTypes';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const Products = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.tasbirstory.com/api/user/products`);
        if (response.ok) {
          const data = await response.json();
          setProductData(data.data);
          console.log(data.data.data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (slug: string) => {
    router.push(`/selected-product/${slug}`);
  };

  // if (loading) {
  //   return (
  //     <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white`}>
  //       <div className="bg-transparent rounded p-4 flex flex-col items-center">
  //         <Image width={80} height={80} alt="gadgetbyte's logo" src="/images/TasbirLogo.png" />
  //         <Loader2 className="h-8 w-8 animate-spin mt-5" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      {/* <div className="ml-0">
        <div className="flex my-2 max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
          <div className="flex grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 overflow-hidden mt-4">
            {Array.isArray(productData) &&
              productData.map((product: Product) => (
                <div
                  key={product.id}
                  className="group shadow-sm mb-1 mt-1 bg-transparent w-[348px] h-[370px] relative hover:shadow-lg"
                  onClick={() => handleProductClick(product.slug)}
                >
                  <div className="ml-5 mt-4 bg-gray-100 w-[310px] h-[250px] relative rounded-lg">
                    <div className="py-8 px-14">
                      <div className="relative">
                        <Image
                          src={product?.files[0]?.fileThumbnailUrl}
                          width={200}
                          height={180}
                          alt={product.name}
                          className="w-[200px] h-[180px] p-2 bg-white shadow-md mb-1 pointer-cursor rounded-lg"
                        />
                      </div>
                      <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-300 opacity-25"></div>
                    </div>
                  </div>
                  <h2 className="font-semibold mt-4 text-md ml-5">{product.name}</h2>
                  <div className="flex">
                    {product.specialPrice !== null ? (
                      <p className="flex space-x-2 text-sm font-regular ml-5 mt-1">
                        From Rs.
                        <span>
                          <span className="line-through ml-1">{Number(product.price).toFixed(0)}</span>
                          <span className="ml-1 text-red-500">{Number(product.specialPrice).toFixed(0)}</span>
                        </span>
                      </p>
                    ) : (
                      <p className="flex space-x-2 text-sm font-regular ml-5 mt-1">
                        Rs.
                        <span className="ml-1">{Number(product.price).toFixed(0)}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div> */}
      <div className="my-container">
        <h2 className="font-kurale font-normal uppercase text-3xl tracking-tight text-gray-900 text-center tracking-widest">
          Find your Frame
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {Array.isArray(productData) &&
            productData.map((product: Product) => (
              <div onClick={() => handleProductClick(product.slug)} className="group cursor-pointer relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-1 xl:aspect-w-1">
                  <img
                    alt={product.name}
                    // src="/images/frame-product.png"
                    src={product?.files[0]?.fileUrl}
                    className="h-full w-full object-cover object-center "
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="w-full">
                    <h3 className="max-w-xl mt-2 mb-2 text-lg text-center font-normal truncate dark:text-gray-300 ">
                      {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                      {product.name}
                    </h3>
                    <div className="flex justify-center">
                      {/* {product.specialPrice ? (
                        <p className="inline-block text-base font-semibold text-[#800000] dark:text-gray-400 ">
                          <span>Rs. {Number(product.specialPrice).toFixed(0)}</span>
                          <span className="text-sm font-normal text-gray-500 line-through dark:text-gray-400">
                            Rs. {Number(product.price).toFixed(0)}
                          </span>
                        </p>
                      ) : (
                        <p className="inline-block text-base font-semibold text-[#800000] dark:text-gray-400 ">
                          <span>Rs. {Number(product.price).toFixed(0)}</span>
                        </p>
                      )} */}
                      <p className="inline-block text-base font-semibold text-[#800000] dark:text-gray-400 ">
                        <span>Rs. {Number(product.price).toFixed(0)}</span>
                      </p>
                    </div>
                    {/* <p className="mt-1 text-sm text-gray-500">Black</p> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;
