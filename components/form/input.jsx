import Wrapper from "@components/helpers/wrapper";
import React from "react";

const InputComponent = ({ inputid, type, label, isInputValid, value, onChange, onBlur, placeholder, error, isDisabled, button }) => {
  if (isInputValid === undefined) {
    isInputValid = true;
  }

  if (type === undefined) {
    type = "text";
  }

  if (isDisabled === undefined) {
    isDisabled = false;
  }

  let onBlurEnabled = false;

  if (onBlur !== undefined) {
    onBlurEnabled = true;
  }

  if (placeholder === undefined) {
    placeholder = "Please enter here";
  }

  return (
    <Wrapper>
      <div className="form-group">
        <label className="form-label" htmlFor={inputid}>
          {label}
        </label>
        <div className="form-control-wrapper">
          <div className="">
            <input disabled={isDisabled} type={type} id={inputid} className={`form-control ${!isInputValid && "invalid"}`} value={value} onChange={(e) => onChange(e)} onBlur={(e) => (onBlurEnabled ? onBlur(e) : undefined)} placeholder={placeholder} autocomplete="new-password" />
            {button && <div className="">{button}</div>}
          </div>
          {error && <span className="invalid-feedback">{error}</span>}
        </div>
      </div>
    </Wrapper>
  );
};

export default InputComponent;
