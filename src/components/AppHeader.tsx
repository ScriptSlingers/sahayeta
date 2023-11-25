import React from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { FaRegQuestionCircle } from 'react-icons/fa';
function AppHeader() {
  return (
    <div className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
      <div className="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
        <a className="flex items-center uppercase mb-4 font-medium text-gray-900 title-font md:mb-0">
          <img className="h-9 px-8" src="/assets/img/sahayata.png" alt="" />
        </a>
        <nav className="flex flex-wrap items-center justify-center pl-6 ml-6 text-base border-l border-gray-200 md:mr-auto">
          <a
            href="#_"
            className="flex items-center mr-8 font-semibold hover:text-gray-900"
          >
            Home
          </a>
          <a href="#_" className="mr-8 font-semibold hover:text-gray-900">
            Dashboard
          </a>
          <a href="#_" className="font-semibold hover:text-gray-900">
            Donate
          </a>
        </nav>
        <div className="flex items-center">
          <div className="px-2">
            <a href="#_" className="">
              <IoSearch size={22} />
            </a>
          </div>
          <div className="px-2">
            <a href="#_" className="">
              <IoMdNotificationsOutline size={26} />
            </a>
          </div>
          <div className="px-2">
            <a href="#_" className="">
              <FaRegQuestionCircle size={22} />
            </a>
          </div>

          <div className="items-center h-full px-10">
            <a href="#_" className="mr-5 font-semibold hover:text-gray-900">
              Login
            </a>
            <a
              href="#_"
              className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-blue-500 rounded-lg shadow outline-none active:bg-blue-700 hover:shadow-md focus:outline-none ease"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
