import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useEvents from "../../hooks/useEvents";
import EventListItem from "./event-list-item";
import EventActions from "../shared/event-actions";
import EmptyEvent from "../empty-component/EmptyEvent";
import PopupMessage from "../popup-message";

/**
 * EventList component displays a list of events for a specific clock.
 *
 * @param {string} clockId - clockId will be a string.
 * @returns {JSX.Element}
 */
const EventList = ({ clockId }) => {
  const [toggleEvent, setToggleEvent] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");

  const { addEvent, deleteEvent, getEventsByClockId, updateEvent } =
    useEvents();
  // Get events by a specific clock Id
  const events = getEventsByClockId(clockId);

  // Function to showing popup message after any action
  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  const handleCreateEvent = (event) => {
    addEvent(event);
    showPopup("New Event Created Successfully!");
  };

  const handleUpdateEvent = (event) => {
    updateEvent(event);
    showPopup("Event Updated Successfully!");
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    showPopup("Event Deleted Successfully!");
  };

  return (
    <div>
      <ButtonsPosition>
        <EventActions
          aboveEvent={true}
          clockId={clockId}
          handleCreateEvent={handleCreateEvent}
          toggleEvent={toggleEvent}
          setToggleEvent={setToggleEvent}
          disabled={events.length === 0}
        />
      </ButtonsPosition>

      <ul style={{ paddingLeft: 0 }}>
        {events.length === 0 ? (
          <div>
            <EmptyEvent />
          </div>
        ) : (
          toggleEvent &&
          events.map((event) => (
            <EventListItem
              key={event.id}
              clockId={clockId}
              event={event}
              handleUpdateEvent={handleUpdateEvent}
              handleDeleteEvent={handleDeleteEvent}
            />
          ))
        )}

        {popupMessage && (
          <PopupMessage
            popupMessage={popupMessage}
            setPopupMessage={setPopupMessage}
          />
        )}
      </ul>
    </div>
  );
};

// Prop-types
EventList.propTypes = {
  clockId: PropTypes.string.isRequired,
};

// Styled components
const ButtonsPosition = styled.div`
  margin: 20px 26px;

  @media (min-width: 768px) {
    margin: 30px 80px;
  }
`;

export default EventList;
