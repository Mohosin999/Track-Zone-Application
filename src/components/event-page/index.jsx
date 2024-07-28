import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import useEvents from "../../hooks/useEvents";

const EventPage = () => {
  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  const { getEvents, deleteEvent, updateEvent, deleteEventByClock } =
    useEvents();
  const allEvents = getEvents(true);
  const navigate = useNavigate();

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editingEvent]);

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
              <EventItem>
                <EventContent>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDescription>{event.description}</EventDescription>
                </EventContent>
                <EventActions>
                  <ActionButton onClick={() => handleUpdate(event)}>
                    Update
                  </ActionButton>
                  <ActionButton
                    onClick={() => handleDelete(`${event.clockId}|${event.id}`)}
                  >
                    Delete
                  </ActionButton>
                </EventActions>
              </EventItem>

              {editingEvent && editingEvent.id === event.id && (
                <UpdateForm onSubmit={handleSubmit}>
                  <FormTitle>Update Event</FormTitle>
                  <FormInput
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        title: e.target.value,
                      })
                    }
                    placeholder="Event Title"
                    required
                  />
                  <FormTextarea
                    ref={textareaRef}
                    value={editingEvent.description}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        description: e.target.value,
                      })
                    }
                    placeholder="Event Description"
                    required
                  />
                  <FormButton type="submit">Save</FormButton>
                  <FormButton
                    type="button"
                    onClick={() => setEditingEvent(null)}
                  >
                    Cancel
                  </FormButton>
                </UpdateForm>
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

const EventItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #afeeee;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 5px;
  animation: ${fadeIn} 0.5s ease-in-out;
  flex-direction: column;

  // @media (min-width: 768px) {
  //   flex-direction: row;
  // }
`;

const EventContent = styled.div`
  text-align: left;
  flex-grow: 1;
`;

const EventTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  margin-bottom: 16px;
`;

const EventDescription = styled.p`
  margin: 5px 0 0;
  font-size: 17px;
  line-height: 25px;
  white-space: pre-wrap;
`;

const EventActions = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
  margin-top: 10px;

  // @media (min-width: 768px) {
  //   margin-top: 0;
  // }
`;

const ActionButton = styled.button`
  background: #daa520;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #b8860b;
  }
`;

const UpdateForm = styled.form`
  background: #ffe4c4;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const FormTitle = styled.h3`
  margin-top: 0;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 20px;
  font-family: Oswald;
  line-height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const FormTextarea = styled.textarea`
  display: block;
  width: 100%;
  height: auto;
  padding: 10px;
  margin: 10px 0;
  font-size: 20px;
  font-family: Oswald;
  line-height: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const FormButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(0, 128, 0, 0.5);
  color: white;

  &:hover {
    background: rgba(0, 128, 0, 0.7);
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

export default EventPage;
