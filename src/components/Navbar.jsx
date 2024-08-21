import React from 'react';
import { FaLocationArrow } from 'react-icons/fa'; 
import { BiSearch } from 'react-icons/bi'; 
import ToggleButtonIcon from './ToggleButtonIcon'; 

// Access the environment variable
const API_URL = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY; 
console.log("the api key are", API_KEY, API_URL)

const Navbar = () => {
  return (
    <div className="flex justify-evenly items-center p-4 ">
      {/* Location Icon */}
      <div className="flex items-center text-white">
        <FaLocationArrow size={20} className="ml-1" />
        {/* <span className="font-semibold text-md">Current Location</span> */}
      </div>

      {/* Search Bar */}
      <div className="flex items-center mr-2 w-1/2 md:w-3/4">
        <BiSearch size={15} className="text-gray-400 absolute ml-3" />
        <input
          type="text"
          placeholder="Find for cities"
          className="w-full pl-10 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Toggle Button */}
      <div className="flex items-center">
        <ToggleButtonIcon />
      </div>
    </div>
  );
}

export default Navbar;
