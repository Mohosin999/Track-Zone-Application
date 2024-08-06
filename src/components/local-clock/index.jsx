import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";
import ClockForm from "../shared/clock-form";
import PopupMessage from "../popup-message";

/**
 * LocalClock component displays the local clock with options to edit, create, and view events.
 *
 * @param {Object} clock - clock will be an object.
 * @param {Function} updateClock - updateClock will be a function.
 * @param {Function} createClock - createClock will be a function.
 * @returns {JSX.Element}
 */
const LocalClock = ({ clock, updateClock, createClock }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreateClock, setIsCreateClock] = useState(false);
  // Sate for showing popup message
  const [popupMessage, setPopupMessage] = useState("");

  const { date, timezone, offset } = useClock(clock.timezone, clock.offset);

  const timer = useTimer(date);
  const navigate = useNavigate();

  // Effect to update state lifting function when date will be changed
  useEffect(() => {
    updateClock({
      date,
      timezone,
      offset,
    });
  }, [date]);

  // Function to showing popup message after any action
  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  const handleCreateClock = (values) => {
    createClock(values);
    showPopup("New Clock Created Successfully!");
  };

  const handleUpdateClock = (values) => {
    updateClock(values);
    showPopup("Clock Updated Successfully!");
  };

  // Function to go to events page
  const handleViewEvents = () => {
    navigate("/events");
  };

  return (
    <>
      <LocalClockContainer>
        {timer && (
          <ClockDisplay
            date={timer}
            timezone={timezone}
            offset={offset}
            title={clock.title}
          />
        )}

        <ButtonsArea>
          <ClockActions
            clock={clock}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            isCreateClock={isCreateClock}
            setIsCreateClock={setIsCreateClock}
            local={true}
          />
          <EventsButton onClick={handleViewEvents}>Your Events</EventsButton>
        </ButtonsArea>
      </LocalClockContainer>

      {isEdit && (
        <ClockForm
          values={clock}
          handleClock={handleUpdateClock}
          edit={true}
          title={!true}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}

      {isCreateClock && (
        <ClockForm
          handleClock={handleCreateClock}
          isCreateClock={isCreateClock}
          setIsCreateClock={setIsCreateClock}
        />
      )}

      {popupMessage && (
        <PopupMessage
          popupMessage={popupMessage}
          setPopupMessage={setPopupMessage}
        />
      )}
    </>
  );
};

// Prop-types
LocalClock.propTypes = {
  clock: PropTypes.object.isRequired,
  updateClock: PropTypes.func.isRequired,
  createClock: PropTypes.func.isRequired,
};

// Styled components
const LocalClockContainer = styled.div`
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    45deg,
    #8b0000,
    #008080,
    #008080,
    #006400,
    #000080
  );
`;

const ButtonsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px 0 14px;

  @media (min-width: 768px) {
    padding: 0 40px 6px 40px;
  }
`;

const rotateAnimation = keyframes`
  0% {
    box-shadow: 0 0 10px 4px #FFD700;
    border-color: #FFD700;
  }
  25% {
    box-shadow: 0 0 10px 4px #2E8B57;
    border-color: #2E8B57;
  }
  50% {
    box-shadow: 0 0 10px 4px #20B2AA;
    border-color: #20B2AA;
  }
  75% {
    box-shadow: 0 0 10px 4px #FFDEAD;
    border-color: #FFDEAD;
  }
  100% {
    box-shadow: 0 0 10px 4px #00ff00;
    border-color: #00ff00;
  }
`;

const EventsButton = styled.p`
  color: #fff;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  animation: ${rotateAnimation} 2s linear infinite;

  @media (min-width: 768px) {
    font-size: 14px;
    padding: 8px 22px;
  }
`;

export default LocalClock;
