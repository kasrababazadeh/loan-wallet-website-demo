import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CiHome, CiShoppingCart, CiShop, CiCreditCard1, CiLogin, CiEdit, CiLogout } from 'react-icons/ci';
import AuthModal from './AuthModal';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
  const { isAuthenticated, logout, socket } = useContext(AuthContext);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    // Send logout action to backend via WebSocket
    socket.send(JSON.stringify({
      action: 'logout'
    }));

    // Perform local logout (optional)
    logout();
  };

  return (
    <nav className='lg:block hidden dark:bg-gray-800 pb-4 px-6 shadow-md'>
      <div className='flex justify-between items-center max-w-screen-2xl mx-auto'>
      <div className="flex space-x-8 flex-row items-center">
        {!isAuthenticated ? (
          <>
            <NavLink
              to="#"
              onClick={() => setShowSignupModal(true)}
              className="flex flex-row items-center text-gray-600 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-all duration-300"
            >
              <span className="text-md mr-1">ثبت نام</span>
              <CiEdit className="text-2xl" />
            </NavLink>
            {showSignupModal && (
              <AuthModal type="signup" onClose={() => setShowSignupModal(false)} />
            )}
            <NavLink
              to="#"
              onClick={() => setShowLoginModal(true)}
              className="flex flex-row items-center text-gray-600 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-all duration-300"
            >
              <span className="text-md mr-1">ورود</span>
              <CiLogin className="text-2xl" />
            </NavLink>
            {showLoginModal && (
              <AuthModal type="login" onClose={() => setShowLoginModal(false)} />
            )}
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex flex-row items-center text-gray-600 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-all duration-300"
          >
            <span className="text-md mr-1">خروج</span>
            <CiLogout className="text-2xl" />
          </button>
        )}
      </div>
      <div className="flex space-x-8 flex-row items-center">
        <NavLink
          to="/BuyGuide"
          exact
          className="flex flex-row items-center text-gray-600 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-all duration-300"
        >
          <span className="text-md mr-1">راهنمای خرید</span>
          <CiShoppingCart className="text-2xl" />
        </NavLink>
        <NavLink
          to="/WalletGuide"
          exact
          className="flex flex-row items-center text-gray-600 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-all duration-300"
        >
          <span className="text-md mr-1">راهنمای دریافت اعتبار</span>
          <CiCreditCard1 className="text-2xl" />
        </NavLink>
        <NavLink
          to="/shops"
          exact
          className="flex flex-row items-center text-gray-600 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-all duration-300"
        >
          <span className="text-md mr-1">مراکز خرید</span>
          <CiShop className="text-2xl" />
        </NavLink>
        <NavLink
          to="/clients"
          exact
          className="flex flex-row items-center text-gray-600 dark:text-gray-400 hover:text-sky-400 dark:hover:text-sky-400 transition-all duration-300"
        >
          <span className="text-md mr-1">صفحه اصلی</span>
          <CiHome className="text-2xl" />
        </NavLink>
      </div>
      </div>
    </nav>
  );
};

export default Nav;
