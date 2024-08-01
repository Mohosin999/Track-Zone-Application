import { useState } from "react";
import styled from "styled-components";
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
        <ButtonGroup>
          <ActionButton
            label="Create New Event"
            onClick={() => setIsCreateEvent(!isCreateEvent)}
          />
          <ActionButton
            label="Toggle Events"
            onClick={() => setToggleEvent(!toggleEvent)}
            disabled={disabled}
          />
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <ActionButton label="Edit" onClick={() => setIsEdit(!isEdit)} />
          <ActionButton
            label="Delete"
            onClick={() => handleDeleteEvent(`${clockId}|${event.id}`)}
            backgroundColor={"#ff0000"}
          />
        </ButtonGroup>
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;

  @media (min-width: 768px) {
    gap: 10px;
  }
`;

export default EventActions;
