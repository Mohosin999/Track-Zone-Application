import EventActions from "../shared/event-actions";
import EventItem from "../shared/event-item";

const EventListItem = ({
  clockId,
  event,
  // addEvent,
  updateEvent,
  deleteEvent,
  // isCreateEvent,
  // setIsCreateEvent,
}) => {
  return (
    // <li key={event.id}>
    //   <h3>{event.title}</h3>
    //   <p>{event.description}</p>

    //   {/* Buttons */}
    //   <EventActions
    //     clockId={clockId}
    //     event={event}
    //     // addEvent={addEvent}
    //     updateEvent={updateEvent}
    //     deleteEvent={deleteEvent}
    //     // isCreateEvent={isCreateEvent}
    //     // setIsCreateEvent={setIsCreateEvent}
    //   />
    // </li>
    <EventItem
      key={event.id}
      event={event}
      onUpdate={updateEvent}
      onDelete={deleteEvent}
    />
  );
};

export default EventListItem;
