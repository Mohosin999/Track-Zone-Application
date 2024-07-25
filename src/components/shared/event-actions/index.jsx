import { useState } from "react";
import EventForm from "../event-form";

const EventActions = ({
  clockId,
  event,
  addEvent,
  updateEvent,
  deleteEvent,
  // isCreateEvent,
  // setIsCreateEvent,
}) => {
  const [isCreateEvent, setIsCreateEvent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <button onClick={() => setIsCreateEvent(!isCreateEvent)}>Create</button>
      <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
      <button onClick={() => deleteEvent(`${clockId}|${event.id}`)}>
        Delete
      </button>

      {isEdit && (
        <>
          <h3>Edit Event</h3>
          <EventForm
            clockId={clockId}
            event={event}
            updateEvent={updateEvent}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </>
      )}

      {isCreateEvent && (
        <>
          <h3>Create Event</h3>
          <EventForm
            clockId={clockId}
            event={event}
            addEvent={addEvent}
            isCreateEvent={isCreateEvent}
            setIsCreateEvent={setIsCreateEvent}
          />
        </>
      )}
    </div>
  );
};

export default EventActions;
