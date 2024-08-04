import PropTypes from "prop-types";
import styled from "styled-components";

const ActionButton = ({ type, label, onClick, disabled }) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled}>
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

const Button = styled.button`
  background: #f8db35;
  color: #222;
  border: none;
  font-size: 12px;
  font-weight: bold;
  padding: 6px 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    // box-shadow: 0 4px 8px rgba(248, 219, 53, 0.5);
    box-shadow: 0 0 10px 4px rgba(248, 219, 53, 0.5);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    font-size: 14px;
    padding: 8px 22px;
  }
`;

export default ActionButton;
