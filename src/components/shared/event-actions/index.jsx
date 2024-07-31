import { useState } from "react";
import EventForm from "../event-form";
import ActionButton from "../../ui/action-button";

const EventActions = ({
  clockId,
  event,
  handleCreateEvent,
  handleDeleteEvent,
  isEdit,
  setIsEdit,
  toggleEvent,
  setToggleEvent,
  aboveEvent = false,
  disabled,
}) => {
  const [isCreateEvent, setIsCreateEvent] = useState(false);

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
            disabled={disabled}
          />
        </>
      ) : (
        <>
          <ActionButton label="Edit" onClick={() => setIsEdit(!isEdit)} />
          <ActionButton
            label="Delete"
            onClick={() => handleDeleteEvent(`${clockId}|${event.id}`)}
            backgroundColor={"#ff0000"}
          />
        </>
      )}

      {isCreateEvent && (
        <>
          <EventForm
            clockId={clockId}
            event={event}
            handleCreateEvent={handleCreateEvent}
            isCreateEvent={isCreateEvent}
            setIsCreateEvent={setIsCreateEvent}
          />
        </>
      )}
    </div>
  );
};

export default EventActions;
