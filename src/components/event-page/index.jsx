import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useEvents from "../../hooks/useEvents";
import EventListItem from "../event-list/event-list-item";
import ActionButton from "../ui/action-button";
import EmptyEvent from "../empty-component/EmptyEvent";
import PopupMessage from "../popup-message";
import GoToTopButton from "../ui/go-to-top-button";

const EventPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const { getEvents, deleteEvent, updateEvent, clearAllEvents } = useEvents();
  const allEvents = getEvents(true); // get all events as an array
  const navigate = useNavigate();

  // Function to show popup message after desire actions
  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  const handleUpdateEvent = (event) => {
    updateEvent(event);
    showPopup("Event Updated Successfully!");
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id);
    showPopup("Event deleted Successfully!");
  };

  const handleClearAll = () => {
    clearAllEvents();
    showPopup("All events cleared Successfully!");
  };

  // Function to go back in main page
  const handleBack = () => {
    navigate("/");
  };

  // Search events using title or description
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
          <ActionButton
            label="Clear All"
            onClick={handleClearAll}
            disabled={allEvents.length === 0}
          />
          <ActionButton label="Go Back" onClick={handleBack} />
        </ButtonGroup>
      </Header>

      {filteredEvents.length === 0 ? (
        <div>
          <EmptyEvent />
        </div>
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
        <PopupMessage
          popupMessage={popupMessage}
          setPopupMessage={setPopupMessage}
        />
      )}

      {/* Component for go to top from below */}
      <GoToTopButton />
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
  gap: 10px;
  margin: 14px 20px;
  padding-bottom: 10px;

  @media (min-width: 820px) {
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 40px;
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 20px;
  color: #f2f2f2;

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
  background: #008080;
  color: #f2f2f2;
  border: none;
  font-size: 14px;
  cursor: pointer;
  border-radius: 100%;

  &:hover {
    background: #20b2aa;
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

const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;

export default EventPage;
