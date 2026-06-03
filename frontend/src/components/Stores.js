import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { CiUser, CiSettings, CiMoneyBill, CiEdit, CiCirclePlus, CiCircleMinus } from 'react-icons/ci';

const QuestionAnswerRow = ({ question, answer, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`py-4 ${!isLast ? 'border-b border-gray-200' : ''}`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
        <h2 className="text-lg font-medium dark:text-gray-100">{question}</h2>
        <button className="text-xl">
          {isOpen ? (
            <span className="text-gray-500 dark:text-gray-200"><CiCircleMinus /></span>
          ) : (
            <span className="text-gray-500 dark:text-gray-200"><CiCirclePlus /></span>
          )}
        </button>
      </div>
      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{answer}</p>
      </div>
    </div>
  );
};
const Store = () => {
  const [selectedOption, setSelectedOption] = useState('1');
  const [selectedOption2, setSelectedOption2] = useState('1');
  const [selectedOption3, setSelectedOption3] = useState('1');
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const faqData = [
    {
      question: 'مقدار اعتبار برای کارمندان سازمانی چقدر است؟',
      answer: 'سقف اعتبار و تعداد دسترسی به فروشگاه‌های همکار ما به درخواست سازمان شما تعیین می‌شود.',
    },
    {
      question: 'با اعتبار دریافتی از ما، از چه خدماتی می‌توان استفاده کرد؟',
      answer: 'خدمات ما در گستره‌ی متنوعی شامل خدمات سلامت و درمان، گردشگری، مد و پوشاک، بیمه، فروشگاه‌های مواد غذایی زنجیره‌ای، لوازم خانگی و مبلمان و آموزشی به متقاضیان ارائه می‌شود.',
    },
    {
      question: 'هزینه‌ی ثبت‌نام پرسنل سازمانی برای شرکت چقدر است؟',
      answer: 'ثبت‌نام پرسنل، هزینه‌ای برای سازمان ندارد.',
    },
  ];
  const [socket, setSocket] = useState(null);

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
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws/stores/signup/');
    newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Message from server:', data);
        alert(data.message);
    };
    setSocket(newSocket);

    return () => newSocket.close();
}, []);
const storeSubmit = (e) => {
  e.preventDefault();
  const storeData = {
      title: selectedOption,
      name: inputValue,
      phone_number: inputValue2,
      owner: inputValue3,
      type: selectedOption2,
      province: selectedOption3,
  };
  socket.send(JSON.stringify(storeData));
};

  return (
    <div className="p-4 max-w-screen-2xl mx-auto">
      {/* First Row: Image and Text */}
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-4 py-8">
        <div className="flex justify-center items-center">
          <img src="/sample1.png" alt="Organization" className="max-w-full h-auto" />
        </div>
        <div className="flex flex-col justify-center lg:items-end items-center text-right space-y-2">
          <h2 className="text-gray-700 dark:text-gray-300 text-4xl">
          تماشاگرِ افزایش سرعت فروش
          </h2>
          <h2 className="text-gray-700 dark:text-gray-300 text-4xl">
          !کسب و کار خود باشید
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-md lg:pl-16 lg:text-start text-center" dir='rtl'>
          با پیوستن به شبکه فروشگاهی کیپا، کسب و کارتان را در معرض کاربران کیپا قرار می‌دهیم تا افزایش فروش را برای کسب و کارتان رقم بزنیم.          </p>
          <div className='flex flex-row space-x-4'>
            <NavLink
              to="/"
              exact
              className="bg-sky-400 hover:bg-sky-500 text-gray-100 py-2 px-8 rounded inline-flex items-center transition-all duration-300 space-x-1"
            >
              <span className="text-md">ثبت فروشگاه</span>
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
      <br /><br />
      <div className="flex flex-col justify-center items-center mb-8">
        <h2 className='text-gray-800 dark:text-gray-200 font-bold text-2xl mb-2'>انواع فروشگاه&zwnj;های موجود</h2>
      </div>
      {/* Fourth Row: Slider for cards */}
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
      <br /><br />
      {/* Fourth Row: Slider for cards */}
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        
        {/* Right part: Slider */}
        <div className="flex-col justify-center items-center hidden lg:flex">
        <img src="/final-sazman-image.1d60aad7.webp" alt="قرارداد سازمانی" className="w-full h-96 object-scale-down mb-2 rounded" />
        </div>
        {/* Left part: Card */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded flex flex-col items-center text-center lg:text-start lg:items-start h-full" dir='rtl'>
          <h3 className="text-gray-700 dark:text-gray-300 text-2xl mb-2">عضویت سازمان</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">برای عضویت سازمان خود، کافیست فرم زیر را تکمیل و ارسال کنید. کارشناسان کیپا با شما تماس می‌گیرند.</p>
          <form onSubmit={storeSubmit} className='mt-auto'>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 w-full">
          <div class="relative w-full h-12">
            <input
              className={`peer w-full h-full bg-transparent text-blue-gray-700 dark:text-blue-gray-200 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 dark:disabled:bg-gray-800 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 ${inputValue ? 'border-t-transparent' : ''} dark:placeholder-shown:border-blue-gray-600 placeholder-shown:border-t-blue-gray-200 dark:placeholder-shown:border-t-blue-gray-600 border focus:border-1 focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 dark:border-blue-gray-600 focus:border-gray-900 dark:focus:border-gray-300`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder=" " />
            <label
              className="flex dark:text-gray-100 w-full h-full select-none pointer-events-none absolute right-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 dark:peer-placeholder-shown:text-blue-gray-300 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 dark:peer-disabled:peer-placeholder-shown:text-blue-gray-300 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:ml-1 peer-placeholder-shown:before:border-transparent before:rounded-tr-md before:border-t peer-focus:before:border-t-1 before:border-r peer-focus:before:border-r-1 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:mr-1 peer-placeholder-shown:after:border-transparent after:rounded-tl-md after:border-t peer-focus:after:border-t-1 after:border-l peer-focus:after:border-l-1 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.25] text-gray-500 dark:text-gray-300 peer-focus:text-gray-900 dark:peer-focus:text-gray-100 before:border-blue-gray-200 dark:before:border-blue-gray-600 peer-focus:before:!border-gray-900 dark:peer-focus:before:!border-gray-300 after:border-blue-gray-200 dark:after:border-blue-gray-600 peer-focus:after:!border-gray-900 dark:peer-focus:after:!border-gray-300">
              نام سازمان
            </label>
          </div>
          <div class="relative w-full h-12">
            <input
              className={`peer w-full h-full bg-transparent text-blue-gray-700 dark:text-blue-gray-200 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 dark:disabled:bg-gray-800 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 ${inputValue2 ? 'border-t-transparent' : ''} dark:placeholder-shown:border-blue-gray-600 placeholder-shown:border-t-blue-gray-200 dark:placeholder-shown:border-t-blue-gray-600 border focus:border-1 focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 dark:border-blue-gray-600 focus:border-gray-900 dark:focus:border-gray-300`}
              value={inputValue2}
              onChange={(e) => setInputValue2(e.target.value)}
              placeholder=" " />
            <label
              className="flex dark:text-gray-100 w-full h-full select-none pointer-events-none absolute right-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 dark:peer-placeholder-shown:text-blue-gray-300 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 dark:peer-disabled:peer-placeholder-shown:text-blue-gray-300 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:ml-1 peer-placeholder-shown:before:border-transparent before:rounded-tr-md before:border-t peer-focus:before:border-t-1 before:border-r peer-focus:before:border-r-1 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:mr-1 peer-placeholder-shown:after:border-transparent after:rounded-tl-md after:border-t peer-focus:after:border-t-1 after:border-l peer-focus:after:border-l-1 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.25] text-gray-500 dark:text-gray-300 peer-focus:text-gray-900 dark:peer-focus:text-gray-100 before:border-blue-gray-200 dark:before:border-blue-gray-600 peer-focus:before:!border-gray-900 dark:peer-focus:before:!border-gray-300 after:border-blue-gray-200 dark:after:border-blue-gray-600 peer-focus:after:!border-gray-900 dark:peer-focus:after:!border-gray-300">
              نام سازمان
            </label>
          </div>
          <div class="relative w-full h-12">
            <input
              className={`peer w-full h-full bg-transparent text-blue-gray-700 dark:text-blue-gray-200 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 dark:disabled:bg-gray-800 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 ${inputValue3 ? 'border-t-transparent' : ''} dark:placeholder-shown:border-blue-gray-600 placeholder-shown:border-t-blue-gray-200 dark:placeholder-shown:border-t-blue-gray-600 border focus:border-1 focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 dark:border-blue-gray-600 focus:border-gray-900 dark:focus:border-gray-300`}
              value={inputValue3}
              onChange={(e) => setInputValue3(e.target.value)}
              placeholder=" " />
            <label
              className="flex dark:text-gray-100 w-full h-full select-none pointer-events-none absolute right-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 dark:peer-placeholder-shown:text-blue-gray-300 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 dark:peer-disabled:peer-placeholder-shown:text-blue-gray-300 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:ml-1 peer-placeholder-shown:before:border-transparent before:rounded-tr-md before:border-t peer-focus:before:border-t-1 before:border-r peer-focus:before:border-r-1 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:mr-1 peer-placeholder-shown:after:border-transparent after:rounded-tl-md after:border-t peer-focus:after:border-t-1 after:border-l peer-focus:after:border-l-1 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.25] text-gray-500 dark:text-gray-300 peer-focus:text-gray-900 dark:peer-focus:text-gray-100 before:border-blue-gray-200 dark:before:border-blue-gray-600 peer-focus:before:!border-gray-900 dark:peer-focus:before:!border-gray-300 after:border-blue-gray-200 dark:after:border-blue-gray-600 peer-focus:after:!border-gray-900 dark:peer-focus:after:!border-gray-300">
              نام سازمان
            </label>
          </div>
          <div className="relative">
            <select
              className="appearance-none peer w-full h-12 bg-transparent text-blue-gray-700 dark:text-gray-100 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:focus:border-gray-100"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-blue-gray-700 dark:text-gray-100">
              {/* SVG or icon for dropdown indicator */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <div className="relative">
            <select
              className="appearance-none peer w-full h-12 bg-transparent text-blue-gray-700 dark:text-gray-100 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:focus:border-gray-100"
              value={selectedOption2}
              onChange={(e) => setSelectedOption2(e.target.value)}
            >
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-blue-gray-700 dark:text-gray-100">
              {/* SVG or icon for dropdown indicator */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <div className="relative">
            <select
              className="appearance-none peer w-full h-12 bg-transparent text-blue-gray-700 dark:text-gray-100 outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:focus:border-gray-100"
              value={selectedOption3}
              onChange={(e) => setSelectedOption3(e.target.value)}
            >
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-blue-gray-700 dark:text-gray-100">
              {/* SVG or icon for dropdown indicator */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          </div>
          <div class="flex justify-end w-full h-11 px-4">
            <button 
            type="submit"
            className="flex flex-row items-center bg-transparent transition-all duration-300 hover:bg-sky-400 text-sky-400 hover:text-white px-9 border border-sky-400 hover:border-transparent rounded">
              <CiEdit className="text-2xl ml-2" />
              ارسال درخواست
            </button>
          </div>
          </form>
        </div>
      </div>
      </div>
      <br /><br />
      <div className="flex flex-col justify-center items-center mb-2">
        <h2 className='text-gray-800 dark:text-gray-200 font-bold text-2xl mb-0'>سوالات متداول</h2>
      </div>
      <div className="mx-auto" dir='rtl'>
      {faqData.map((item, index) => (
        <QuestionAnswerRow
          key={index}
          question={item.question}
          answer={item.answer}
          isLast={index === faqData.length - 1}
        />
      ))}
    </div>
    <br />
    </div>
  );
};

export default Store;