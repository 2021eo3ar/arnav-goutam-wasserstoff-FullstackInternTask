import React from "react";
import Navbar from "../components/Navbar";
import DayForecast from "../components/DayForecast";
import TemperatureDetails from "../components/TemperatureDetails";
import CurrentDateInsight from "../components/CurrentDateInsight";
import FiveDayForecast from "../components/FiveDayForecast";

const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-900 min-h-screen relative">
      {/* Main Content Section */}
      <div className="flex-grow">
        <header className="shadow-md">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="flex flex-col  items-center md:items-start justify-start md:ml-40 ">
          <section className="w-full max-w-7xl pb-0 px-4  md:w-3/4 lg:w-2/3 xl:w-1/2">
            <DayForecast />
          </section>

          <section className="w-full max-w-7xl px-4 pb-0  md:w-3/4 lg:w-2/3 xl:w-1/2">
            <TemperatureDetails />
          </section>

          <section className="w-full max-w-7xl px-4 md:w-3/4 lg:w-2/3 xl:w-1/2">
            <CurrentDateInsight />
          </section>
        </main>
      </div>

      {/* Right Sidebar */}
      <section className="w-full md:w-1/4 lg:w-1/3 xl:w-1/4 mt-6 md:mt-0 md:absolute md:right-44 md:top-28">
        <div className="bg-gray-800 rounded-lg p-1 md:p-6 h-full md:h-full w-11/12 md:w-full mx-auto">
          <FiveDayForecast />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
