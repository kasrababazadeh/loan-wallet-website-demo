import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { CiUser, CiSettings, CiMoneyBill } from 'react-icons/ci';

const Clients = () => {
  const [storeCards, setStoreCards] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:8000/api/store-cards/')
      .then(response => {
        // Extract the results array from the response data
        if (response.data && Array.isArray(response.data.results)) {
          setStoreCards(response.data.results);
        } else {
          console.error('API response does not contain an array in "results":', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the store cards!', error);
      });
  }, []);

  return (
    <div className="p-4 max-w-screen-2xl mx-auto">
      {/* First Row: Image and Text */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex justify-center items-center">
          <img src="/Remove-bg.ai_1720287915345.png" alt="Client Image" className="max-w-full h-auto" />
        </div>
        <div className="flex flex-col justify-center lg:items-end items-center text-right space-y-2">
          <h2 className="text-gray-700 dark:text-gray-300 text-4xl">
            ،با ما اعتباری خرید کنید
          </h2>
          <h2 className="text-gray-700 dark:text-gray-300 text-3xl">
            !!!بـــعدا پــرداخــت کـــنید 
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-md lg:pl-16 lg:text-right text-center">
            با فعالسازی کیف پول های کیپا، اعتبار خرید از بیش از 8000+ فروشگاه را دریافت کنید و اعتبار خود را اقساطی تسویه کنید
          </p>
          <div className='flex flex-row space-x-4'>
            <NavLink
              to="/"
              exact
              className="bg-sky-400 hover:bg-sky-300 text-gray-100 py-2 px-8 rounded inline-flex items-center transition-all duration-300 space-x-1"
            >
              <span className="text-md">دریافت اعتبار</span>
            </NavLink>
            <NavLink
              to="/"
              exact
              className="bg-sky-400 hover:bg-sky-300 text-gray-100 py-2 px-8 rounded inline-flex items-center transition-all duration-300 space-x-1"
            >
              <span className="text-md">اپلیکیشن</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Second Row: Cards */}
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

      {/* Third Row: Single Image */}
      <div className="flex justify-center items-center mb-16">
        <img src="/bannerDesktop.39d66fef.webp" alt="Another Client Image" className="w-full h-auto" />
      </div><br /><br />
      <div className="flex flex-col justify-center items-center mb-12">
        <h2 className='text-gray-800 dark:text-gray-200 font-bold text-2xl mb-2'>فروشگاه&zwnj;ها</h2>
        <p className='text-gray-600 dark:text-gray-400 text-sm'>با فعالسازی کیف پول برای خرید از فروشگاه های زیر اعتبار دارید</p>
      </div>
      {/* Fourth Row: Store Cards from API */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {storeCards.map((card, index) => (
          <NavLink
          to={`/shop/?word=${card.url}`}
            key={card.id}
            className={`bg-card-${index % 6} shadow-md p-4 rounded flex flex-col items-center card-size`}
          >
            <img src={card.image_url} alt={card.title} className="h-24 w-24 object-cover mb-2" />
            <p className="text-white">{card.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Clients;
