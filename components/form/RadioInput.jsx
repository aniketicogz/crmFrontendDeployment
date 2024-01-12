// RadioInput.js
import React from "react";
import "./RadioInput.scss";

const RadioInput = ({ name, options, selectedValue, onChange, label }) => {
  return (
    <div className="radio-input">
      {label && <div className="input-label">{label}</div>}
      {options.map((option) => (
        <label key={option.value}>
          <input type="radio" name={name} value={option.value} checked={selectedValue === option.value} onChange={onChange} />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioInput;
