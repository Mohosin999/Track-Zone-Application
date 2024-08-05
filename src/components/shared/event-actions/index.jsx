import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import EventForm from "../event-form";
import ActionButton from "../../ui/action-button";

/**
 * EventActions component provides action buttons for creating, editing, and deleting events.
 *
 * @param {string} clockId - clockId will be a string.
 * @param {Object} event - event will be an object.
 * @param {Function} handleCreateEvent - handleCreateEvent will be a function.
 * @param {Function} handleDeleteEvent - handleDeleteEvent will be a function.
 * @param {boolean} isEdit - isEdit will be a boolean.
 * @param {Function} setIsEdit - setIsEdit will be a function.
 * @param {boolean} toggleEvent - toggleEvent will be a boolean.
 * @param {Function} setToggleEvent - setToggleEvent will be a function.
 * @param {boolean} aboveEvent - aboveEvent will be a boolean.
 * @param {boolean} disabled - disabled will be a boolean.
 * @returns {JSX.Element}
 */
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

// Prop-types
EventActions.propTypes = {
  clockId: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  handleCreateEvent: PropTypes.func.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  toggleEvent: PropTypes.bool.isRequired,
  setToggleEvent: PropTypes.func.isRequired,
  aboveEvent: PropTypes.bool,
  disabled: PropTypes.bool,
};

// Styled components
const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;

  @media (min-width: 768px) {
    gap: 10px;
  }
`;

export default EventActions;
