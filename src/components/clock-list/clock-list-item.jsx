// import { useState } from "react";
// import { formatDistance } from "date-fns";
// import useClock from "../../hooks/useClock";
// import useTimer from "../../hooks/useTimer";
// import ClockDisplay from "../shared/clock-display";
// import ClockActions from "../shared/clock-actions";
// import EventForm from "../shared/event-form";
// import EventList from "../event-list";
// import useEvents from "../../hooks/useEvents";

// const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
//   /** =====================================
//    *        Event Related Start
//    ====================================== */
//   const [isCreateEvent, setIsCreateEvent] = useState(false);
//   const [toggleEvent, setToggleEvent] = useState(true);

//   const { addEvent, deleteEvent, getEventsByClockId, updateEvent } =
//     useEvents();
//   const events = getEventsByClockId(clock.id);

//   /** =====================================
//    *        Event Related End
//    ====================================== */

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

//       {/* ==========================================================================
//                               Event Management
//       ====================================================================== */}
//       <div>
//         <div style={{ marginLeft: "50%" }}>
//           <button
//             style={{ marginRight: "8px" }}
//             onClick={() => setIsCreateEvent(!isCreateEvent)}
//           >
//             Create Event
//           </button>
//           <button
//             onClick={() => setToggleEvent(!toggleEvent)}
//             disabled={events.length === 0}
//           >
//             Toggle Event
//           </button>
//         </div>

//         {isCreateEvent && (
//           // <h1>Event Management</h1>
//           <EventForm
//             clockId={clock.id}
//             addEvent={addEvent}
//             isCreateEvent={isCreateEvent}
//             setIsCreateEvent={setIsCreateEvent}
//           />
//         )}

//         {toggleEvent && (
//           <EventList
//             clockId={clock.id}
//             events={events}
//             deleteEvent={deleteEvent}
//             updateEvent={updateEvent}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClockListItem;

import { useState } from "react";
import { formatDistance } from "date-fns";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";
import EventForm from "../shared/event-form";
import EventList from "../event-list";
import useEvents from "../../hooks/useEvents";

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
  /** =====================================
   *        Event Related Start
   ====================================== */
  // const [isCreateEvent, setIsCreateEvent] = useState(false);
  // const [toggleEvent, setToggleEvent] = useState(true);

  // const { addEvent, deleteEvent, getEventsByClockId, updateEvent } =
  //   useEvents();
  // const events = getEventsByClockId(clock.id);

  /** =====================================
   *        Event Related End
   ====================================== */

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

      {/* ==========================================================================
                              Event Management
      ====================================================================== */}
      <div>
        {/* <div style={{ marginLeft: "50%" }}>
          <button
            style={{ marginRight: "8px" }}
            onClick={() => setIsCreateEvent(!isCreateEvent)}
          >
            Create Event
          </button>
          <button
            onClick={() => setToggleEvent(!toggleEvent)}
            disabled={events.length === 0}
          >
            Toggle Event
          </button>
        </div> */}

        {/* {isCreateEvent && (
          // <h1>Event Management</h1>
          <EventForm
            clockId={clock.id}
            addEvent={addEvent}
            isCreateEvent={isCreateEvent}
            setIsCreateEvent={setIsCreateEvent}
          />
        )}

        {toggleEvent && (
          <EventList
            clockId={clock.id}
            events={events}
            deleteEvent={deleteEvent}
            updateEvent={updateEvent}
          />
        )} */}
        <EventList clockId={clock.id} />
      </div>
    </div>
  );
};

export default ClockListItem;
