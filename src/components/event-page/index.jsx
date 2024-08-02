import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useEvents from "../../hooks/useEvents";
// import EventItem from "../shared/event-item";
// import EventUpdateForm from "../shared/event-update-form";
// import EventForm from "../shared/event-form";
import EventListItem from "../event-list/event-list-item";
import ActionButton from "../ui/action-button";

const EventPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const { getEvents, deleteEvent, updateEvent, clearAllEvents } = useEvents();
  const allEvents = getEvents(true);
  const navigate = useNavigate();

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  const handleUpdateEvent = (event) => {
    updateEvent(event);
    showPopup("Event Updated!");
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    showPopup("Event deleted!");
  };

  const handleClearAll = () => {
    clearAllEvents();
    showPopup("All events cleared!");
  };

  const handleBack = () => {
    navigate("/");
  };

  const filteredEvents = allEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>All Events</Title>
        <SearchWrapper>
          <SearchInput
            type="text"
            placeholder="Search events by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ClearSearchButton onClick={() => setSearchTerm("")}>
              ×
            </ClearSearchButton>
          )}
        </SearchWrapper>

        <ButtonGroup>
          <ActionButton label="Clear All" onClick={handleClearAll} />
          <ActionButton label="Go Back" onClick={handleBack} />
        </ButtonGroup>
      </Header>

      {filteredEvents.length === 0 ? (
        <NoEventsMessage>No events available.</NoEventsMessage>
      ) : (
        <EventList>
          {filteredEvents.map((event) => (
            <EventListItem
              key={event.id}
              clockId={event.clockId}
              event={event}
              handleUpdateEvent={handleUpdateEvent}
              handleDeleteEvent={handleDeleteEvent}
            />
          ))}
        </EventList>
      )}

      {popupMessage && (
        <Popup>
          <PopupContent>
            <p>{popupMessage}</p>
            <CloseButton onClick={() => setPopupMessage("")}>Close</CloseButton>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
};

const Container = styled.div`
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px;
  gap: 10px;

  @media (min-width: 820px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 20px;

  @media (min-width: 768px) {
    font-size: 22px;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 4px 9px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 8px 13px;
    font-size: 16px;
  }
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: #f4a460;
  border: none;
  font-size: 14px;
  cursor: pointer;
  border-radius: 100%;

  &:hover {
    background: #ff4500;
    transition: 0.3s;
  }

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const NoEventsMessage = styled.p`
  text-align: center;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
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

export default EventPage;
