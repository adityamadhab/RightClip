import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <img className="h-8 w-auto" src="/IndexPage-assests/logo.png" alt="Logo" />
          </div>
          <div className="hidden gap-12 sm:flex sm:space-x-8 ">
            <a href="#" className="text-zinc-900 inline-flex items-center px-1 pt-1 text-md font-medium hover:text-blue-500">Home</a>
            <a href="#" className="text-zinc-900 inline-flex items-center px-1 pt-1 text-md font-medium hover:text-blue-500">Categories</a>
            <a href="#" className="text-zinc-900 inline-flex items-center px-1 pt-1 text-md font-medium hover:text-blue-500">Resources</a>
            <a href="#" className="text-zinc-900 inline-flex items-center px-1 pt-1 text-md font-medium hover:text-blue-500">About us</a>
          </div>
          <div className="relative hidden sm:flex sm:items-center" ref={dropdownRef}>
            <button
              className="flex items-center bg-[#090167] text-white text-md px-4 py-2 rounded-full hover:bg-blue-600"
              onClick={handleButtonClick}
            >
              GET STARTED <MdOutlineKeyboardArrowDown className="ml-2" />
            </button>
            {dropdownVisible && (
              <div className="absolute right-0 mt-64 w-72 bg-[#A3D5F2] border rounded-md shadow-lg z-10 p-4 mt w" style={{ backgroundImage: 'url(/path/to/your/background/image.png)', backgroundSize: 'cover' }}>
                <Link to={'/business/signup'} className="flex items-center px-4 py-2 hover:bg-white text-md text-blackrounded-md mb-2">
                  <div className='bg-[#FFFFFF] h-14 w-14 rounded-xl flex items-center justify-center mr-4'>
                  <img src="/IndexPage-assests/business.png" alt="Business Icon" className="h-8 w-8" />
                  </div>
                  AS A BUSINESS
                </Link>
                <Link to={'/creator/signup'} className="flex items-center px-4 py-2 hover:bg-white text-md text-black rounded-md">
                <div className='bg-[#FFFFFF] h-14 w-14 rounded-xl flex items-center justify-center mr-4'>
                  <img src="/IndexPage-assests/creator.png" alt="Business Icon" className="h-8 w-8" />
                  </div>
                  AS A CREATOR
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
