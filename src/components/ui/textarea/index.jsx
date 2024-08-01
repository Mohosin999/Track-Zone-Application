import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextAreaField = ({
  name = "",
  value,
  onChange,
  placeholder,
  required,
}) => {
  const textareaRef = useRef(null);

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

TextAreaField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 4px;
  font-size: 14px;
  line-height: 25px;
  font-family: monospace;
  border: 1px solid #ccc;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 8px;
    font-size: 16px;
  }
`;

export default TextAreaField;
