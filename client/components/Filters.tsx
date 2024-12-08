"use client";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React, { useState } from 'react';

const Filters = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);



  const handleSliderChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="mb-4">
        <p>Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
        <Slider 
          range 
          min={0} 
          max={1000} 
          defaultValue={priceRange} 
          onChange={handleSliderChange} 
        />
      </div>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            id="menu-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            onClick={handleDropdownToggle}
          >
            Options
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isDropdownOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
            <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                  role="menuitem"
                  id="menu-item-3"
                >
                  online
                </button>

                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                  role="menuitem"
                  id="menu-item-3"
                >
                  off line
                </button>

                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                  role="menuitem"
                  id="menu-item-3"
                >
                  all
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;

