import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DayForecast from '../components/DayForecast';
import TemperatureDetails from '../components/TemperatureDetails';
import CurrentDateInsight from '../components/CurrentDateInsight';
import FiveDayForecast from '../components/FiveDayForecast';

const CityPage = () => {
  const [cityName, setCityName] = useState(''); // State to store the city name from the search bar

  // Function to handle city name update from Navbar
  const handleCitySearch = (city) => {
    setCityName(city);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 min-h-screen">
      {/* Main Content Section */}
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <header className="mb-4">
          {/* Pass the handleCitySearch function to Navbar */}
          <Navbar onCitySearch={handleCitySearch} />
        </header>

        {cityName ? (
          <section className="space-y-4">
            {/* Pass the cityName to DayForecast */}
            <DayForecast searchCity={cityName} />
            <TemperatureDetails searchCity={cityName} />
            <CurrentDateInsight searchCity={cityName} />
          </section>
        ) : (
          <div className="flex justify-center items-center h-full text-white">
            <p className="text-lg">Search for a city to get its weather details.</p>
          </div>
        )}
      </main>

      {/* Sidebar or additional section */}
      <aside className="md:w-1/4 lg:w-1/4 bg-gray-800 p-4 border-r border-gray-700 flex justify-center items-center">
        {cityName ? <FiveDayForecast searchCity={cityName} /> : null}
      </aside>
    </div>
  );
};

export default CityPage;
