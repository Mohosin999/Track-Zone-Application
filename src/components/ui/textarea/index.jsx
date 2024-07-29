import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextAreaField = ({ value, onChange, placeholder, required }) => {
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
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

TextAreaField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  height: auto;
  padding: 10px;
  margin: 10px 0;
  font-size: 20px;
  font-family: Oswald;
  line-height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

export default TextAreaField;
