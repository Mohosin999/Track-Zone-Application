import PropTypes from "prop-types";
import styled from "styled-components";

const InputField = ({ type, value, onChange, placeholder, required }) => {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 20px;
  font-family: Oswald;
  line-height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

export default InputField;