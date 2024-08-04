import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * InputField component renders a styled input field.
 *
 * @param {string} type - Type of the input (e.g., text, password, email).
 * @param {string} name - Name attribute of the input.
 * @param {string} value - Current value of the input.
 * @param {function} onChange - Function to handle change events.
 * @param {string} placeholder - Placeholder text for the input.
 * @param {boolean} disabled - Indicates if the input is disabled.
 * @param {boolean} required - Indicates if the input is required.
 */
const InputField = ({
  type,
  name = "",
  value,
  onChange,
  placeholder,
  disabled,
  required,
}) => {
  return (
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
    />
  );
};

// Define prop types for the InputField component
InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

// Styled component for the input
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 4px 9px;
  font-size: 14px;
  font-family: monospace;
  border: 1px solid #ccc;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 8px 13px;
    font-size: 16px;
  }
`;

export default InputField;
