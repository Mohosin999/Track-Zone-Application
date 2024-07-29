import PropTypes from "prop-types";
import styled from "styled-components";

const ActionButton = ({ label, onClick }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const Button = styled.button`
  background: #daa520;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #b8860b;
  }
`;

export default ActionButton;
