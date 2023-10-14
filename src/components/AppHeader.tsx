import React from 'react';

export default function AppHeader() {
  return (
    <div className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
      <div className="container flex flex-col items-start justify-between p-6 mx-auto md:flex-row">
        <a
          className="flex items-center uppercase mb-4 font-medium text-gray-900 title-font md:mb-0"
          href="/"
        >
          Sahayata
        </a>
        <nav className="flex flex-wrap items-center justify-center pl-6 ml-6 text-base border-l border-gray-200 md:mr-auto">
          <a href="#_" className="mr-5 font-medium hover:text-gray-900">
            Home
          </a>
          <a href="#_" className="mr-5 font-medium hover:text-gray-900">
            About
          </a>
          <a href="#_" className="font-medium hover:text-gray-900">
            Contact
          </a>
        </nav>
        <div className="items-center h-full">
          <a href="/login" className="mr-5 font-medium hover:text-gray-900">
            Login
          </a>
          <a
            href="#_"
            className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
