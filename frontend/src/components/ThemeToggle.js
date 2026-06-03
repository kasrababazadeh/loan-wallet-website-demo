import React, { useState, useEffect } from 'react';
import { CiDark, CiLight } from 'react-icons/ci';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="ml-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full focus:outline-none transition-all duration-300"
    >
      {theme === 'light' ? <CiDark /> : <CiLight />}
    </button>
  );
};

export default ThemeToggle;
