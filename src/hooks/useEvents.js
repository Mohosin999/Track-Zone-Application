import { useState, useEffect } from "react";
import shortid from "shortid";

const useEvents = () => {
  const [state, setState] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(state));
  }, [state]);

  const getEventsByClockId = (clockId) => {
    return Object.values(state).filter((item) => item.clockId === clockId);
  };

  const getEvents = (isArray = false) => {
    if (!isArray) return state;
    return Object.values(state);
  };

  const addEvent = (event) => {
    event.id = shortid.generate();
    const { id, clockId } = event;
    setState((prev) => ({
      ...prev,
      [`${clockId}|${id}`]: event,
    }));
  };

  const updateEvent = (updatedEvent) => {
    const { id, clockId } = updatedEvent;
    const events = { ...state };

    events[`${clockId}|${id}`] = {
      ...events[`${clockId}|${id}`],
      ...updatedEvent,
    };
    setState(events);
  };

  const deleteEvent = (id) => {
    const events = { ...state };
    delete events[id];
    setState(events);
  };

  const deleteEventsByClockId = (clockId) => {
    setState((prev) => {
      const newState = Object.keys(prev)
        .filter((key) => prev[key].clockId !== clockId)
        .reduce((acc, key) => {
          acc[key] = prev[key];
          return acc;
        }, {});

      // Update local storage with the new state
      localStorage.setItem("events", JSON.stringify(newState));

      return newState;
    });
  };

  const clearAllEvents = () => {
    setState({});
  };

  return {
    state,
    getEventsByClockId,
    getEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    deleteEventsByClockId,
    clearAllEvents,
  };
};

export default useEvents;
