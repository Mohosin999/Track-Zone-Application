import { useEffect } from "react";
import styled from "styled-components";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";

const LocalClock = ({ clock, updateClock, createClock }) => {
  const { date, timezone, offset } = useClock(clock.timezone, clock.offset);

  const timer = useTimer(date);

  useEffect(() => {
    updateClock({
      date,
      timezone,
      offset,
    });
  }, [date]);

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
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        createClock={createClock}
        local={true}
      />
    </LocalClockContainer>
  );
};

const LocalClockContainer = styled.div`
  background: rgba(100, 150, 200);
`;

export default LocalClock;
