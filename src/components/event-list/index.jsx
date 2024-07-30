import { useState } from "react";
import useEvents from "../../hooks/useEvents";
import EventListItem from "./event-list-item";
import EventActions from "../shared/event-actions";

const EventList = ({ clockId }) => {
  const [toggleEvent, setToggleEvent] = useState(true);

  const { addEvent, deleteEvent, getEventsByClockId, updateEvent } =
    useEvents();
  const events = getEventsByClockId(clockId);

  return (
    <div>
      <EventActions
        aboveEvent={true}
        clockId={clockId}
        addEvent={addEvent}
        toggleEvent={toggleEvent}
        setToggleEvent={setToggleEvent}
      />

      <ul>
        {events.length === 0 ? (
          <h3>There is no event yet</h3>
        ) : (
          toggleEvent &&
          events.map((event) => (
            <EventListItem
              key={event.id}
              clockId={clockId}
              event={event}
              addEvent={addEvent}
              updateEvent={updateEvent}
              deleteEvent={deleteEvent}
              // isCreateEvent={isCreateEvent}
              // setIsCreateEvent={setIsCreateEvent}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default EventList;
