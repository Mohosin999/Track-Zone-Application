// import { formatDistance } from "date-fns";
// import useClock from "../../hooks/useClock";
// import useTimer from "../../hooks/useTimer";
// import ClockDisplay from "../shared/clock-display";
// import ClockActions from "../shared/clock-actions";
// import EventList from "../event-list";

// const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
//   const { date } = useClock(clock.timezone, clock.offset);
//   const timer = useTimer(date);

//   if (!date || !timer) return null;

//   return (
//     <div>
//       <ClockDisplay
//         date={timer}
//         offset={clock.offset}
//         timezone={clock.timezone}
//         title={clock.title}
//       />
//       <ClockActions
//         clock={clock}
//         updateClock={updateClock}
//         deleteClock={deleteClock}
//       />

//       {/* Time distance */}
//       <h3>Time difference: {formatDistance(localClock, date)}</h3>

//       <EventList clockId={clock.id} />
//     </div>
//   );
// };

// export default ClockListItem;

import { formatDistance } from "date-fns";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";
import EventList from "../event-list";

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
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
      />

      {/* Time distance */}
      <h3>Time difference: {formatDistance(localClock, date)}</h3>

      <EventList clockId={clock.id} />
    </div>
  );
};

export default ClockListItem;
