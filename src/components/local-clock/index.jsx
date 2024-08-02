import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";
import ClockForm from "../shared/clock-form";

const LocalClock = ({ clock, updateClock, createClock }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreateClock, setIsCreateClock] = useState(false);

  const { date, timezone, offset } = useClock(clock.timezone, clock.offset);

  const timer = useTimer(date);
  const navigate = useNavigate();

  useEffect(() => {
    updateClock({
      date,
      timezone,
      offset,
    });
  }, [date]);

  const handleClock = (values) => {
    createClock(values); // State lifting
  };

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
          handleClock={updateClock}
          edit={true}
          title={!true}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}

      {isCreateClock && (
        <ClockForm
          handleClock={handleClock}
          isCreateClock={isCreateClock}
          setIsCreateClock={setIsCreateClock}
        />
      )}
    </>
  );
};

const LocalClockContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-image: url("../../../public/clock.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  // backdrop-filter: blur(1000px);
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
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  animation: ${rotateAnimation} 2s linear infinite;

  @media (min-width: 768px) {
    font-size: 16px;
    padding: 10px 20px;
  }
`;

export default LocalClock;
