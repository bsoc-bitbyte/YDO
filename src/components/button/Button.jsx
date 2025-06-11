import "./Button.css";

const Button = ({
  children,
  onClick,
  variant = "primary", // 'primary' | 'secondary' | 'danger'
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      className={`btn btn-${variant} ${disabled ? "btn-disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
