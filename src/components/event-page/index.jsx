import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useEvents from "../../hooks/useEvents";
import EventItem from "../shared/event-item";
import EventUpdateForm from "../shared/event-update-form";

const EventPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  const { getEvents, deleteEvent, updateEvent, deleteEventByClock } =
    useEvents();
  const allEvents = getEvents(true);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    deleteEvent(id);
    showPopup("Event deleted successfully.");
  };

  const handleUpdate = (event) => {
    if (editingEvent && editingEvent.id === event.id) {
      setEditingEvent(null);
    } else {
      setEditingEvent(event);
    }
  };

  const handleUpdateSubmit = (updatedEvent) => {
    updateEvent(updatedEvent);
    setEditingEvent(null);
    showPopup("Event updated successfully.");
  };

  const handleClearAll = () => {
    deleteEventByClock("");
    showPopup("All events cleared.");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateSubmit(editingEvent);
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 3000);
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
          <ClearAllButton onClick={handleClearAll}>Clear All</ClearAllButton>
          <BackButton onClick={handleBack}>Go Back</BackButton>
        </ButtonGroup>
      </Header>

      {filteredEvents.length === 0 ? (
        <NoEventsMessage>No events available.</NoEventsMessage>
      ) : (
        <EventList>
          {filteredEvents.map((event) => (
            <div key={event.id}>
              <EventItem
                event={event}
                onUpdate={handleUpdate}
                onDelete={() => handleDelete(`${event.clockId}|${event.id}`)}
              />
              {editingEvent && editingEvent.id === event.id && (
                <EventUpdateForm
                  event={editingEvent}
                  onSubmit={handleSubmit}
                  onCancel={() => setEditingEvent(null)}
                  onTitleChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  onDescriptionChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                />
              )}
            </div>
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
  padding: 20px;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
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
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: #f4a460;
  border: none;
  font-size: 20px;
  cursor: pointer;
  border-radius: 100%;

  &:hover {
    background: #ff4500;
    transition: 0.3s;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ClearAllButton = styled.button`
  background: #ff6347;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #ff4500;
  }
`;

const BackButton = styled.button`
  background: #20b2aa;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #008b8b;
  }
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
