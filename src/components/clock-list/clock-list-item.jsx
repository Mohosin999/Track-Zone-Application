// import { useEffect, useState } from "react";
// import { formatDistance } from "date-fns";
// import useClock from "../../hooks/useClock";
// import useTimer from "../../hooks/useTimer";
// import ClockDisplay from "../shared/clock-display";
// import ClockActions from "../shared/clock-actions";
// import EventForm from "../shared/event-form";
// import EventList from "../event-list";
// import useEvents from "../../hooks/useEvents";
// // import { EventsProvider } from "../event-context";

// const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
//   const [eventsState, setEventsState] = useState(() => {
//     const savedEvents = localStorage.getItem("events");
//     return savedEvents ? JSON.parse(savedEvents) : {};
//   });

//   const eventsHook = useEvents(eventsState);

//   useEffect(() => {
//     localStorage.setItem("events", JSON.stringify(eventsHook.events));
//   }, [eventsHook.events]);

//   const { date } = useClock(clock.timezone, clock.offset);
//   const timer = useTimer(date);

//   if (!date || !timer) return null;

//   const addEvent = (event) => {
//     eventsHook.addEvent(event);
//     setEventsState(eventsHook.events);
//   };

//   const deleteEvent = (id) => {
//     eventsHook.deleteEvent(id);
//     setEventsState(eventsHook.events);
//   };

//   const getEvents = (isArray = false) => {
//     return eventsHook.getEvents(isArray);
//   };

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

//       <div>
//         <h1>Event Management</h1>
//         <EventForm clockId={clock.id} addEvent={addEvent} />
//         <EventList getEvents={getEvents} deleteEvent={deleteEvent} />
//       </div>
//     </div>
//   );
// };

// export default ClockListItem;

import { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";
import EventForm from "../shared/event-form";
import EventList from "../event-list";
import useEvents from "../../hooks/useEvents";

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
  const eventsHook = useEvents();

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(eventsHook.events));
  }, [eventsHook.events]);

  const { date } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  if (!date || !timer) return null;

  const addEvent = (event) => {
    eventsHook.addEvent(event);
  };

  const deleteEvent = (id) => {
    eventsHook.deleteEvent(id);
  };

  const getEventsByClockId = (clockId) => {
    return eventsHook.getEventsByClockId(clockId);
  };

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

      <div>
        <h1>Event Management</h1>
        <EventForm clockId={clock.id} addEvent={addEvent} />
        <EventList
          clockId={clock.id}
          getEventsByClockId={getEventsByClockId}
          deleteEvent={deleteEvent}
        />
      </div>
    </div>
  );
};

export default ClockListItem;
