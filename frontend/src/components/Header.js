import React, { useState } from 'react';
import { CiImport, CiDark, CiLight } from 'react-icons/ci';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  const location = useLocation();

  const getLinkClass = (path) => {
    if (location.pathname === '/stores' || location.pathname === '/organizations') {
      return `flex flex-row pt-1 items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300 ${
        location.pathname === path ? 'border-b border-sky-400 text-sky-400 dark:text-sky-400' : ''
      }`;
    } else {
      return `flex flex-row pt-1 items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300 ${
        path === '/clients' ? 'border-b border-sky-400 text-sky-400 dark:text-sky-400' : ''
      }`;
    }
  };

  return (
    <header className="p-6 dark:bg-gray-800 shadow-md lg:shadow-none">
      <div className='flex justify-between items-center max-w-screen-2xl mx-auto'>
        <div className="flex">
        <NavLink
            to="/"
            exact
            className="bg-sky-400 hover:bg-sky-500 text-gray-100 py-2 px-4 rounded lg:inline-flex hidden items-center transition-all duration-300 space-x-1"
          >
            <span className="text-sm">اپلیکیشن</span>
            <CiImport className="text-xl" />
        </NavLink>
        <button
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 lg:ml-8 transition-all duration-300"
        >
          {isDarkMode ? <CiLight className="text-2xl" /> : <CiDark className="text-2xl" />}
        </button>
        <nav className="flex flex-row lg:space-x-8 space-x-4 justify-between items-center lg:ml-8 ml-4">
        <NavLink to="/stores" exact className={getLinkClass('/stores')}>
          <span className="lg:text-sm text-xs">فروشگاه&zwnj;ها</span>
        </NavLink>
        <NavLink to="/organizations" exact className={getLinkClass('/organizations')}>
          <span className="lg:text-sm text-xs">سازمان&zwnj;ها</span>
        </NavLink>
        <NavLink to="/clients" exact className={getLinkClass('/clients')}>
          <span className="lg:text-sm text-xs">مشتریان</span>
        </NavLink>
        </nav>
      </div>
      <img src="/last-removebg.png" alt="Brand Logo" className="h-10" />
      </div>
    </header>
  );
};

export default Header;
