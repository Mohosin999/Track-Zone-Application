import PropTypes from "prop-types";
import styled from "styled-components";

const ActionButton = ({
  type,
  label,
  onClick,
  disabled,
  backgroundColor,
  hoverColor,
  disabledColor,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      disabledColor={disabledColor}
    >
      {label}
    </Button>
  );
};

ActionButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
  disabledColor: PropTypes.string,
};

ActionButton.defaultProps = {
  disabled: false,
  backgroundColor: "#daa520",
  hoverColor: "#b8860b",
  disabledColor: "#ccc",
};

const Button = styled.button`
  background: ${({ backgroundColor }) => backgroundColor || "#daa520"};
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: ${({ hoverColor }) => hoverColor || "#b8860b"};
  }

  &:disabled {
    background: ${({ disabledColor }) => disabledColor || "#ccc"};
    cursor: not-allowed;
  }
`;

export default ActionButton;
