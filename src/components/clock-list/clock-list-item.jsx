import { formatDistance } from "date-fns";
import useClock from "../../hooks/useClock";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
  const { date } = useClock(clock.timezone, clock.offset);

  if (!date) return null;

  return (
    <div>
      <ClockDisplay
        date={date}
        offset={clock.offset}
        timezone={clock.timezone}
        title={clock.title}
      />
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        deleteClock={deleteClock}
      />
    </div>
  );
};

export default ClockListItem;
