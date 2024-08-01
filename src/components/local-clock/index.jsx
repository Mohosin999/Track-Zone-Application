import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";

const LocalClock = ({ clock, updateClock, createClock }) => {
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

  const handleViewEvents = () => {
    navigate("/events");
  };

  return (
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
          updateClock={updateClock}
          createClock={createClock}
          local={true}
        />
        <EventsButton onClick={handleViewEvents}>Your Events</EventsButton>
      </ButtonsArea>
    </LocalClockContainer>
  );
};

const LocalClockContainer = styled.div`
  background: rgba(100, 150, 200);
`;

const ButtonsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;

  @media (min-width: 768px) {
    padding: 0 20px 6px 20px;
  }
`;

const EventsButton = styled.p`
  color: #fff;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

export default LocalClock;
