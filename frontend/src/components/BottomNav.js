import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiUser, HiBriefcase, HiAcademicCap, HiLightBulb, HiOutlineMail } from 'react-icons/hi';

const BottomNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-200 dark:bg-gray-800 border-t dark:border-gray-700 flex justify-around p-2">
      <NavLink
        to="/"
        exact
        className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300"
      >
        <HiUser className="text-xl" />
        <span className="text-xs">About</span>
      </NavLink>
      <NavLink
        to="/experience"
        className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300"
      >
        <HiBriefcase className="text-xl" />
        <span className="text-xs">Experience</span>
      </NavLink>
      <NavLink
        to="/education"
        className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300"
      >
        <HiAcademicCap className="text-xl" />
        <span className="text-xs">Education</span>
      </NavLink>
      <NavLink
        to="/skills"
        className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300"
      >
        <HiLightBulb className="text-xl" />
        <span className="text-xs">Skills</span>
      </NavLink>
      <NavLink
        to="/contact"
        className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-all duration-300"
      >
        <HiOutlineMail className="text-xl" />
        <span className="text-xs">Contact</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
