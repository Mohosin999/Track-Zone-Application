import { useState } from "react";
import styled, { keyframes } from "styled-components";
import useEvents from "../../hooks/useEvents";
import EventListItem from "./event-list-item";
import EventActions from "../shared/event-actions";
import EmptyEvent from "../empty-component/EmptyEvent";

const EventList = ({ clockId }) => {
  const [toggleEvent, setToggleEvent] = useState(true);
  const [popupMessage, setPopupMessage] = useState("");

  const { addEvent, deleteEvent, getEventsByClockId, updateEvent } =
    useEvents();
  const events = getEventsByClockId(clockId);

  // Function to showing popup message after any action
  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  const handleCreateEvent = (event) => {
    addEvent(event);
    showPopup("New Event Created!");
  };

  const handleUpdateEvent = (event) => {
    updateEvent(event);
    showPopup("Event Updated!");
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    showPopup("Event Deleted!");
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
          <Popup>
            <PopupContent>
              <p>{popupMessage}</p>
              <CloseButton onClick={() => setPopupMessage("")}>
                Close
              </CloseButton>
            </PopupContent>
          </Popup>
        )}
      </ul>
    </div>
  );
};

const ButtonsPosition = styled.div`
  margin: 0 14px;

  @media (min-width: 768px) {
    margin: 0 20px;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
  100% {
    transform: scale(1);
  }
`;

const EmptyEventTitle = styled.h3`
  color: red;
  margin: 0 10px;
  text-align: center;
  animation: ${pulse} 2s infinite;

  @media (min-width: 768px) {
    margin: 0 20px;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
`;

const PopupContent = styled.div`
  color: white;
  text-align: center;
`;

const CloseButton = styled.button`
  background: rgba(255, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background: rgba(255, 0, 0, 0.7);
  }
`;

export default EventList;
