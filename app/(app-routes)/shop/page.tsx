'use client';
import React, { useState, useEffect } from 'react';
import { ApiResponse, ProductDetail } from '@/_types/productTypes';
import { useRouter } from 'next/navigation';

const Shop = () => {
  const router = useRouter();
  const [productData, setProductData] = useState<ProductDetail | null>(null);
  const [category, setCategory] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleFilterPrice = async (selectedValue: any) => {
    try {
      const response = await fetch('https://api.tasbirstory.com/api/user/filter-by-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceOrder: selectedValue }),
      });

      const data = await response.json();
      // Process the data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event) => {
    console.log('hit');
    const value = event.target.value;
    handleFilterPrice(value);
  };

  const handleNextPage = (link: string) => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const selectedProduct = await fetch(link);

        if (selectedProduct.ok) {
          const apiResponse: ApiResponse = await selectedProduct.json();
          setProductData(apiResponse.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    fetchData();
  };
  const handleProductClick = (slug: string) => {
    router.push(`/selected-product/${slug}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedProduct = await fetch(`https://api.tasbirstory.com/api/user/frames`);

        if (selectedProduct.ok) {
          const apiResponse: ApiResponse = await selectedProduct.json();
          setProductData(apiResponse.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    const fetchCat = async () => {
      try {
        const selectedProduct = await fetch(`https://api.tasbirstory.com/api/user/categories`);

        if (selectedProduct.ok) {
          const apiResponse: ApiResponse = await selectedProduct.json();
          setCategory(apiResponse.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchCat();
    fetchData();
  }, []);
  return (
    <div className="my-container">
      <section className="py-8 font-poppins ">
        <div className="px-4 py-4 mx-auto max-w-7xl lg:py-6 md:px-6">
          <div className="flex flex-wrap mb-24 -mx-3">
            <div className="w-full pr-2 lg:w-1/4 lg:block lg:sticky top-[5rem] h-max">
              <div className="p-4 mb-5 bg-white border border-gray-200 dark:border-gray-900 dark:bg-gray-900">
                <h2 className="text-2xl font-medium dark:text-gray-400"> Categories</h2>
                <div className="w-16 pb-2 mb-6 border-b border-[#800000] dark:border-gray-400" />
                <ul>
                  {category &&
                    category.map((item) => (
                      <li className="mb-4">
                        <label htmlFor="" className="flex items-center dark:text-gray-400 ">
                          <input type="checkbox" value={item.id} className="w-4 h-4 mr-2" />
                          <span className="text-lg truncate">{item.name}</span>
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="w-full px-3 lg:w-3/4">
              <img className="object-cover mb-4" alt="Rectangle" src="/images/shopbanner.png" />
              <div className="mb-4">
                <div className="items-center justify-between hidden px-3 py-2 bg-gray-100 md:flex dark:bg-gray-900 ">
                  <div className="flex sticky top-[5rem]">
                    <p className="block w-40 text-base bg-gray-100 cursor-pointer dark:text-gray-400 dark:bg-gray-900">
                      Showing {productData && productData.data.length} Frames.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="">
                      <select
                        onChange={handleChange}
                        name=""
                        id=""
                        className="block w-40 text-base bg-gray-100 cursor-pointer dark:text-gray-400 dark:bg-gray-900"
                      >
                        <option value="">Default</option>
                        <option value="desc">Sort by low to high</option>
                        <option value="asc">Sort by high to low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {productData &&
                  productData.data?.map((item) => (
                    <div className="group cursor-pointer relative">
                      <div
                        onClick={() => handleProductClick(item.slug)}
                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-1 xl:aspect-w-1"
                      >
                        <img
                          alt="Metallic Brush Frame with Photo"
                          src={item.files[0].fileUrl}
                          className="h-full w-full object-cover object-center "
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div className="w-full">
                          <h3 className="max-w-xl mt-2 mb-2 text-lg text-center font-normal truncate dark:text-gray-300 ">
                            {item.name}
                          </h3>
                          <div className="flex justify-center">
                            <p className="inline-block text-base font-semibold text-[#800000] dark:text-gray-400 ">
                              <span>{item.price}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-end mt-6">
                <nav aria-label="page-navigation">
                  <ul className="flex list-style-none">
                    {productData &&
                      productData.links.map((item) => (
                        <li
                          className={`page-item cursor-pointer ${
                            item.url === null && 'pointer-events-none opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <a
                            onClick={() => handleNextPage(item.url)}
                            className={`relative block px-3 py-1.5 mr-3 text-base hover:text-[#fff] transition-all duration-300 hover:bg-gray-400 dark:hover:text-gray-400 dark:hover:bg-gray-700 rounded-md text-gray-700 ${
                              item.active && 'bg-[#800] text-white'
                            }`}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
