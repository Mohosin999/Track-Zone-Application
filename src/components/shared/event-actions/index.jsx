import { useState } from "react";
import EventForm from "../event-form";
import ActionButton from "../../ui/action-button";

const EventActions = ({
  clockId,
  event,
  addEvent,
  updateEvent,
  deleteEvent,
  toggleEvent,
  setToggleEvent,
  aboveEvent = false,
}) => {
  const [isCreateEvent, setIsCreateEvent] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      {aboveEvent ? (
        <>
          <ActionButton
            label="Create New Event"
            onClick={() => setIsCreateEvent(!isCreateEvent)}
          />
          <ActionButton
            label="Toggle Events"
            onClick={() => setToggleEvent(!toggleEvent)}
          />
        </>
      ) : (
        <>
          <ActionButton label="Edit" onClick={() => setIsEdit(!isEdit)} />
          <ActionButton
            label="Delete"
            onClick={() => deleteEvent(`${clockId}|${event.id}`)}
            backgroundColor={"#ff0000"}
          />
        </>
      )}

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
