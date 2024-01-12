import React from "react";
import "./InputField.scss"; // Import the corresponding SCSS file
import Button from "@components/button/button";

const InputField = ({ type, placeholder, label, value, onChange, onBlur, error, btnLabel, btnVariant, btnSize, onClick, disabled, ...restProps }) => {
  if (disabled === undefined) {
    disabled = false;
  }

  if (onBlur === undefined) {
    onBlur = null;
  }

  if (type === undefined) {
    type = "text";
  }

  return (
    <div className={`input-field ${error ? "error" : ""}`}>
      {label && <label htmlFor={restProps.id || restProps.name}>{label}</label>}
      <div className="input-group">
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled} {...restProps} />
        {btnLabel && (
          <Button variant={btnVariant} size={btnSize} onClick={onClick}>
            {btnLabel}
          </Button>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputField;
