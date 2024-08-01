import { formatDistance } from "date-fns";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";
import EventList from "../event-list";
import { useState } from "react";
import ClockForm from "../shared/clock-form";

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
  const [isEdit, setIsEdit] = useState(false);
  console.log("clock list item", isEdit);
  const { date } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  if (!date || !timer) return null;

  return (
    <div>
      <ClockDisplay
        date={timer}
        offset={clock.offset}
        timezone={clock.timezone}
        title={clock.title}
      />
      <ClockActions
        clock={clock}
        updateClock={updateClock}
        deleteClock={deleteClock}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />

      {/* Time distance */}
      <h3>Time difference: {formatDistance(localClock, date)}</h3>

      {/* Form for edit clock */}
      {isEdit && (
        <ClockForm
          values={clock}
          handleClock={updateClock}
          edit={true}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}

      <EventList clockId={clock.id} />
    </div>
  );
};

export default ClockListItem;
