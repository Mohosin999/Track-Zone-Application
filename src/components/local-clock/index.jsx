import { useEffect } from "react";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";

/**
 * LocalClock component for displaying and managing a local clock.
 *
 * @param {Object} clock - Clock object with properties like title, timezone, offset
 * @param {function} updateClock - Function to update the clock object
 *
 * @returns {JSX.Element} - LocalClock component
 */
const LocalClock = ({ clock, updateClock, createClock }) => {
  // Custom hook to get the current date, timezone, and offset based on the provided timezone and offset
  const { date, timezone, offset } = useClock(clock.timezone, clock.offset);

  const timer = useTimer(date);

  /**
   * Effect hook to update the clock object with the current date whenever the date changes.
   */
  useEffect(() => {
    updateClock({
      date,
      timezone,
      offset,
    });
  }, [date]);

  return (
    <div>
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
    </div>
  );
};

export default LocalClock;
