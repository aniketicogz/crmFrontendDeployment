import React, { useState } from "react";
import "./CheckboxGroupInput.scss"; // Import the corresponding SCSS file
import CheckboxInput from "./CheckboxInput"; // Import the Checkbox component

const CheckboxGroupInput = ({ title, options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    const updatedOptions = [...selectedOptions];
    const index = updatedOptions.indexOf(option);

    if (index !== -1) {
      // Option is already selected, remove it
      updatedOptions.splice(index, 1);
    } else {
      // Option is not selected, add it
      updatedOptions.push(option);
    }

    setSelectedOptions(updatedOptions);

    // Notify parent component of the change
    if (onChange) {
      onChange(updatedOptions);
    }
  };

  return (
    <div className="checkbox-group">
      {title && <div className="group-title">{title}</div>}

      {options.map((option) => (
        <CheckboxInput key={option.value} label={option.label} value={option.value} checked={selectedOptions.includes(option.value)} onChange={() => handleCheckboxChange(option.value)} />
      ))}
    </div>
  );
};

export default CheckboxGroupInput;
