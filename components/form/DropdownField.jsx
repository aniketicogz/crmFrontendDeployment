// InputField.js
import React from "react";
import "./DropdownField.scss"; // Import the corresponding SCSS file
import Wrapper from "@components/helpers/wrapper";
import Dropdown from "@components/dropdown/dropdown";
import Button from "@components/button/button";

const DropdownInputField = ({ label, options, selectedValue, placeholder, onChangeHandler, loading, isClearable, error, ismulti, btnLabel, btnVariant, btnSize, onClick, ...restProps }) => {
  return (
    <Wrapper>
      <div className={`input-field ${error ? "error" : ""}`}>
        <label className="form-label">{label}</label>
        <div className="input-group">
          <Dropdown dropdownOptions={options} selectedOptions={selectedValue} placeholder={placeholder} onChange={onChangeHandler} ismulti={ismulti} dropdownLoading={loading} isClearable={isClearable} />
          {btnLabel && (
            <Button variant={btnVariant} size={btnSize} onClick={onClick}>
              {btnLabel}
            </Button>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </Wrapper>
  );
};

export default DropdownInputField;
