import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * TextAreaField component renders a resizable textarea input.
 *
 * @param {string} name - Name attribute of the textarea.
 * @param {string} value - Current value of the textarea.
 * @param {function} onChange - Function to handle change events.
 * @param {string} placeholder - Placeholder text for the textarea.
 * @param {boolean} required - Indicates if the textarea is required.
 *
 * This component automatically resizes its height based on the content.
 */
const TextAreaField = ({
  name = "",
  value,
  onChange,
  placeholder,
  required,
}) => {
  const textareaRef = useRef(null);

  // Adjust the height of the textarea based on its content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <StyledTextarea
      ref={textareaRef}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

// Define prop types for the TextAreaField component
TextAreaField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

// Styled component for the textarea
const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 4px 9px;
  font-size: 14px;
  line-height: 25px;
  font-family: monospace;
  border: 1px solid #ccc;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 8px 13px;
    font-size: 16px;
  }
`;

export default TextAreaField;
