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
            base: 'rgb(250,250,250)',
          },
          inactiveThumb: {
            base: 'rgb(62,130,247)',
          },
          active: {
            base: 'rgb(207,221,245)',
            hover: 'rgb(177, 191, 215)',
          },
          inactive: {
            base: 'rgb(65,66,68)',
            hover: 'rgb(95,96,98)',
          },
        }}
      />
    </div>
  );
};

export default ToggleButtonIcon;
