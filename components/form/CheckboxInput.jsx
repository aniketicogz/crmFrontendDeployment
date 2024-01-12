// CheckboxInput.js
import React from "react";
import "./CheckboxInput.scss"; // Import the corresponding SCSS file

const CheckboxInput = ({ label, value, checked, onChange, disabled }) => {
  return (
    <div className={`checkbox ${disabled ? "disabled" : ""}`}>
      <label>
        <input type="checkbox" value={value} checked={checked} onChange={onChange} disabled={disabled} />
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
