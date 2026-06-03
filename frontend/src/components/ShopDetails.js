import React, { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';

const ShopDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get('store');
  
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/store/${storeId}/`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStore(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (storeId) {
      fetchStoreDetails();
    }
  }, [storeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-12 grid lg:grid-cols-4 gap-8 max-w-screen-2xl" dir="rtl">
      <div className="lg:col-span-3">
        {store ? (
          <div className='shadow-md relative rounded-lg'>
            <div className='block bg-white dark:bg-gray-700 overflow-hidden relative group'>
            <img src={store.banner} alt="banner" className="w-full lg:h-64 h-32 object-cover rounded-t-lg" />
            <div className="absolute lg:top-36 top-16 right-4 flex items-center bg-white p-1 rounded shadow-md">
              <img src={store.icon} alt="icon" className="h-20 lg:h-32 w-20 lg:w-32" />
            </div>
            
            {/* <img src={store.banner} alt={`${store.name} banner`} />
            <div className="absolute top-2/3 transform -translate-y-2/3 right-4 flex items-center bg-white p-1 rounded shadow-md">
                  <img src={store.icon} alt="icon" className="h-40 w-40" />
            </div> */}
            <div className='py-16 px-4'>
            <h3 className='dark:text-gray-300'>نام فروشگاه: {store.name}</h3>
            {/* <p>Owner: {store.owner}</p> */}
            <p className='dark:text-gray-300'>نوع خرید: {store.type}</p>
            <p className='dark:text-gray-300'>شماره تلفن: {store.phone_number}</p>
            <p className='dark:text-gray-300'>استان: {store.province}</p>
            </div>
            </div>
            {/* <p>Created At: {new Date(store.created_at).toLocaleDateString()}</p> */}
          </div>
        ) : (
          <p>No store details available.</p>
        )}
      </div>
      <div className="lg:col-span-1 grid gap-4">
        <div className="card bg-white dark:bg-gray-700 shadow-md p-4">
          <h3 className='font-semibold dark:text-gray-200'>Card 1 Title</h3>
          <p className='text-gray-400 dark:text-gray-300'>Card 1 content goes here.</p>
        </div>
        <div className="card bg-white dark:bg-gray-700 shadow-md p-4">
          <h3 className='font-semibold dark:text-gray-200'>راهنمای خرید</h3>
          <hr className='my-4' />
          <p className='text-gray-400 dark:text-gray-300'>برای خرید از فروشگاه‌ها ابتدا وارد اپلیکیشن ما شوید و درخواست کیف پول خود را ثبت کنید. پس از تکمیل مدارک و دریافت کیف پول می‌توانید از فروشگاه‌های حضوری یا آنلاین طرف قرارداد با کیف پول به صورت اعتباری و اقساطی خرید کنید.</p>
          <div className='text-center'>
          <NavLink
              to="/"
              className="bg-sky-400 w-full hover:bg-sky-500 text-gray-100 py-2 rounded transition-all duration-300 inline-block mt-4"
            >
              <span className="text-md">شروع خرید</span>
            </NavLink>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
