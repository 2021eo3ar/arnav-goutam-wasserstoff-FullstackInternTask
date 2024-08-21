import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiveDayForecast } from '../redux/weatherSlice';
import { WiCloudy, WiRain, WiDaySunny } from 'react-icons/wi';

const weatherIcons = {
  Clear: <WiDaySunny size={30} />,
  Clouds: <WiCloudy size={30} />,
  Rain: <WiRain size={30} />,
  // Add more conditions as needed
};

const TempratureDetails = () => {
  const dispatch = useDispatch();
  const { fiveDayForecast, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchFiveDayForecast({ lat: latitude, lon: longitude }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const todayDate = new Date().toISOString().split('T')[0];
  const todayForecast = fiveDayForecast?.list.filter((forecast) =>
    forecast.dt_txt.startsWith(todayDate)
  );

  return (
    <div className="text-white p-4">
      {todayForecast && todayForecast.length > 0 ? (
        <>
          <h1 className="text-lg font-semibold mb-4 text-center md:text-left">Today's Forecast</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {todayForecast.map((forecast) => (
              <div key={forecast.dt_txt} className="flex flex-col items-center border-blue-500 border-2  p-4 bg-gray-800 rounded-lg">
                <p className="font-semibold text-sm md:text-base mb-2">
                  {new Date(forecast.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div className="mb-2">
                  {weatherIcons[forecast.weather[0].main] || <WiDaySunny size={40} />}
                </div>
                <p className="text-sm md:text-sm capitalize mb-2 text-center">{forecast.weather[0].description}</p>
                <p className="text-lg md:text-xl">{Math.round(forecast.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">No forecast data available for today</p>
      )}
    </div>
  );
};

export default TempratureDetails;
