import Wrapper from "@components/helpers/wrapper";
import React from "react";

function RadioButtonComponent({ label, options, selectedOption, onOptionChange }) {
  const onChangeHandler = (e) => {
    onOptionChange(e);
  };

  let id = `${Math.random()}`;

  return (
    <div className="form-group">
      <div className="form-label">{label}</div>
      <div className="form-control-wrapper">
        {options.map((option, optionIndex) => (
          <Wrapper key={id + optionIndex + option.label}>
            <div className={`custom-radio ${selectedOption === option.value && "active"}`} key={option.value}>
              <input type="radio" id={id + optionIndex + option.label} name={id + optionIndex + option.label} value={option.value} checked={selectedOption === option.value} onChange={(e) => onChangeHandler(e)} />
              <label htmlFor={id + optionIndex + option.label}>{option.label}</label>
            </div>
          </Wrapper>
        ))}
      </div>
    </div>
  );
}

export default RadioButtonComponent;
