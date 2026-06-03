import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiUser, CiSettings, CiMoneyBill } from 'react-icons/ci';

const WalletGuide = () => {
  return (
    <div className="p-4 max-w-screen-2xl mx-auto">
      {/* First Row: Image and Text */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-4 py-8 mt-16">
        <div className="flex justify-center items-center">
          {/* <img src="/sample1.png" alt="Organization" className="max-w-full h-auto" /> */}
          <iframe class="w-full aspect-video" src="https://www.aparat.com/video/video/embed/videohash/MpnOH/vt/frame?autoplay=false"></iframe>
        </div>
        <div className="flex flex-col justify-center lg:items-end items-center text-right space-y-2">
          <h2 className="text-gray-700 dark:text-gray-300 text-4xl">
          برای پرداخت در خــرید
          </h2>
          <h2 className="text-gray-700 dark:text-gray-300 text-4xl">
          !فرصت بیشتری دارید
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-md lg:pl-16 lg:text-start text-center" dir='rtl'>
          با پیوستن به شبکه فروشگاهی کیپا، کسب و کارتان را در معرض کاربران کیپا قرار می‌دهیم تا افزایش فروش را برای کسب و کارتان رقم بزنیم.          </p>
          <div className='flex flex-row space-x-4'>
            <NavLink
              to="/"
              exact
              className="bg-sky-400 hover:bg-sky-500 text-gray-100 py-2 px-8 rounded inline-flex items-center transition-all duration-300 space-x-1"
            >
              <span className="text-md">دریافت اعتبار</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded flex flex-col items-center">
          <CiUser className="text-4xl text-sky-400 mb-2" />
          <p className="text-gray-700 dark:text-gray-300">Card 1 Content</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded flex flex-col items-center">
          <CiSettings className="text-4xl text-sky-400 mb-2" />
          <p className="text-gray-700 dark:text-gray-300">Card 2 Content</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded flex flex-col items-center">
          <CiMoneyBill className="text-4xl text-sky-400 mb-2" />
          <p className="text-gray-700 dark:text-gray-300">Card 3 Content</p>
        </div>
      </div>
      <div className="flex justify-center items-center mb-16">
        <img src="/bannerDesktop.39d66fef.webp" alt="Another Client Image" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default WalletGuide;
