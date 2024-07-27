import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useEvents from "../../hooks/useEvents";

const EventPage = () => {
  const { getEvents, deleteEvent, updateEvent, deleteEventByClock } =
    useEvents();
  const allEvents = getEvents(true);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDelete = (id) => {
    deleteEvent(id);
  };

  const handleUpdate = (event) => {
    setEditingEvent(event);
  };

  const handleUpdateSubmit = (updatedEvent) => {
    updateEvent(updatedEvent);
    setEditingEvent(null);
  };

  const handleClearAll = () => {
    deleteEventByClock("");
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
        <h3>All Events</h3>
        <ButtonGroup>
          <ClearAllButton onClick={handleClearAll}>Clear All</ClearAllButton>
          <BackButton onClick={handleBack}>Back to Clocks</BackButton>
        </ButtonGroup>
      </Header>
      <SearchInput
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredEvents.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul>
          {filteredEvents.map((event) => (
            <EventItem key={event.id}>
              <div>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </div>
              <div>
                <ActionButton onClick={() => handleUpdate(event)}>
                  Update
                </ActionButton>
                <ActionButton
                  onClick={() => handleDelete(`${event.clockId}|${event.id}`)}
                >
                  Delete
                </ActionButton>
              </div>
            </EventItem>
          ))}
        </ul>
      )}
      {editingEvent && (
        <UpdateForm
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateSubmit(editingEvent);
          }}
        >
          <h3>Update Event</h3>
          <input
            type="text"
            value={editingEvent.title}
            onChange={(e) =>
              setEditingEvent({ ...editingEvent, title: e.target.value })
            }
            placeholder="Event Title"
            required
          />
          <input
            type="text"
            value={editingEvent.description}
            onChange={(e) =>
              setEditingEvent({ ...editingEvent, description: e.target.value })
            }
            placeholder="Event Description"
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingEvent(null)}>
            Cancel
          </button>
        </UpdateForm>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  overflow-y: auto;
  max-height: 80vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ClearAllButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: darkred;
  }
`;

const BackButton = styled.button`
  background: blue;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: darkblue;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const EventItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ActionButton = styled.button`
  background: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 5px;

  &:hover {
    background: darkgreen;
  }
`;

const UpdateForm = styled.form`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;

  h3 {
    margin-top: 0;
  }

  input {
    display: block;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button[type="submit"] {
    background: green;
    color: white;

    &:hover {
      background: darkgreen;
    }
  }

  button[type="button"] {
    background: grey;
    color: white;

    &:hover {
      background: darkgrey;
    }
  }
`;

export default EventPage;
