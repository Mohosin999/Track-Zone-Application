import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * PopupMessage component displays a popup with a message and a close button.
 *
 * @param {string} popupMessage - popupMessage will be a string.
 * @param {Function} setPopupMessage - setPopupMessage will be a function.
 * @returns {JSX.Element}
 */
const PopupMessage = ({ popupMessage, setPopupMessage }) => {
  return (
    <Popup>
      <PopupContent>
        <p>{popupMessage}</p>
        <CloseButton onClick={() => setPopupMessage("")}>Close</CloseButton>
      </PopupContent>
    </Popup>
  );
};

// Prop-types
PopupMessage.propTypes = {
  popupMessage: PropTypes.string.isRequired,
  setPopupMessage: PropTypes.func.isRequired,
};

// Styled components
const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #0000cd;
  padding: 15px;
  border-radius: 10px;
  z-index: 1000;

  @media (min-width: 768px) {
    padding: 30px;
  }
`;

const PopupContent = styled.div`
  color: #f2f2f2;
  text-align: center;
  font-size: 13px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  background: #ffa500;
  color: #222;
  font-size: 13px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 5px;

  &:hover {
    background: #ff8c00;
  }

  @media (min-width: 768px) {
    font-size: 15px;
    padding: 10px 20px;
    margin-top: 10px;
  }
`;

export default PopupMessage;
