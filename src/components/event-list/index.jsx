import useEvents from "../../hooks/useEvents";
import EventListItem from "./event-list-item";
import EventActions from "../shared/event-actions";

const EventList = ({ clockId }) => {
  // const [isCreateEvent, setIsCreateEvent] = useState(false);
  // const [toggleEvent, setToggleEvent] = useState(true);

  const { addEvent, deleteEvent, getEventsByClockId, updateEvent } =
    useEvents();
  const events = getEventsByClockId(clockId);

  return (
    <div>
      <EventActions
        clockId={clockId}
        addEvent={addEvent}
        deleteEvent={deleteEvent}
      />
      <ul>
        {events.length === 0 ? (
          <h3>There is no event yet</h3>
        ) : (
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
