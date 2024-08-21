import React, { useState } from 'react';
import ToggleButton from 'react-toggle-button';

const ToggleButtonIcon = () => {
  // State to track the temperature unit
  const [isCelsius, setIsCelsius] = useState(true);

  // Function to toggle the temperature unit
  const toggleUnit = (value) => {
    setIsCelsius(!value);
  };

  return (
    <div className="flex items-center">
      {/* Toggle Button */}
      <ToggleButton
        value={isCelsius}
        onToggle={toggleUnit}
        inactiveLabel={'°F'}
        activeLabel={'°C'}
        colors={{
          activeThumb: {
            base: 'rgb(255, 255, 255)', 
          },
          inactiveThumb: {
            base: 'rgb(255, 215, 0)', 
          },
          active: {
            base: 'rgb(0, 123, 255)', 
            hover: 'rgb(0, 105, 217)', 
          },
          inactive: {
            base: 'rgb(128, 128, 128)', 
            hover: 'rgb(105, 105, 105)', 
          },
        }}
      />
    </div>
  );
};

export default ToggleButtonIcon;
