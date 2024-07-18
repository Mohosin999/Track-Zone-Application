// import React from "react";

// const EventList = ({ getEvents, deleteEvent }) => {
//   const events = getEvents(true);

//   return (
//     <div>
//       <h2>Event List</h2>
//       <ul>
//         {events.length === 0 ? (
//           <h3>There is no event yet</h3>
//         ) : (
//           events.map((event) => (
//             <li key={event.id}>
//               <h3>{event.title}</h3>
//               <p>{event.description}</p>
//               <p>Clock ID: {event.clockId}</p>
//               <button
//                 onClick={() => deleteEvent(`${event.clockId}|${event.id}`)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default EventList;

import React from "react";

const EventList = ({ clockId, getEventsByClockId, deleteEvent }) => {
  const events = getEventsByClockId(clockId);

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.length === 0 ? (
          <h3>There is no event yet</h3>
        ) : (
          events.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Clock ID: {event.clockId}</p>
              <button
                onClick={() => deleteEvent(`${event.clockId}|${event.id}`)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EventList;
