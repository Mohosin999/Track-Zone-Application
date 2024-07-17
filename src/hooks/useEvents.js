import { useState } from "react";
import shortid from "shortid";

const useEvents = () => {
  const [state, setState] = useState({});

  // Function for get events by clock ID
  const getEventsByClockId = (clockId) => {
    return Object.keys(state).filter((item) => item.startsWith(clockId));
  };

  // Function for get events as an array or object
  const getEvents = (isArray = false) => {
    if (!isArray) return state;
    return Object.values(state);
  };

  // Functin for add event
  const addEvent = (event) => {
    event.id = shortid.generate(); // Set an id inside event
    const { id, clockId } = event;
    setState((prev) => ({
      ...prev,
      [`${clockId}|${id}`]: event,
    }));
  };

  // Functions for delete event
  // Type: delete event by id
  const deleteEvent = (id) => {
    const events = { ...state };
    delete events[id];
    setState(events);
  };

  // Type: delete event by clockId
  const deleteEventByClock = (clockId) => {
    const events = Object.keys(state).filter(
      (item) => !item.startsWith(clockId)
    );
    setState(events);
  };

  // Function for update event
  const updateEvent = (updatedEvent, id) => {
    const events = { ...state };
    events[id] = {
      ...events[id],
      ...updatedEvent,
    };
    setState(events);
  };

  return {
    events: state,
    getEventsByClockId,
    getEvents,
    addEvent,
    deleteEvent,
    deleteEventByClock,
    updateEvent,
  };
};

export default useEvents;
