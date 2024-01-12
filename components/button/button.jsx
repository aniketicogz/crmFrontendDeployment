import "./button.scss";

const Button = ({ type, onClick, disabled, variant, size, children, classProps }) => {
  const buttonType = type || "button";

  if (variant === undefined) {
    variant = "primary";
  }

  if (size === undefined) {
    size = "medium";
  }

  const classNames = `btn ${variant ? `btn-${variant}` : ""} ${size ? `btn-${size}` : ""} ${disabled ? "btn-disabled" : ""} ${classProps}`;

  return (
    <button type={buttonType} onClick={onClick} disabled={disabled} className={classNames}>
      {children}
    </button>
  );
};

export default Button;
