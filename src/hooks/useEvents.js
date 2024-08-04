import { useState, useEffect } from "react";
import shortid from "shortid";

/**
 * Custom hook to manage events with localStorage persistence
 * @returns {Object} - Functions and state related to event management
 */
const useEvents = () => {
  // State to keep track of events, initialized from localStorage
  const [state, setState] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  // Effect to update localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(state));
  }, [state]);

  /**
   * Get events by clock ID
   * @param {string} clockId - The clock ID to filter events
   * @returns {Array} - Array of events for the specified clock ID
   */
  const getEventsByClockId = (clockId) => {
    return Object.values(state).filter((item) => item.clockId === clockId);
  };

  /**
   * Get all events
   * @param {boolean} [isArray=false] - Whether to return events as an array
   * @returns {Object|Array} - All events as an object or array
   */
  const getEvents = (isArray = false) => {
    if (!isArray) return state;
    return Object.values(state);
  };

  /**
   * Add a new event
   * @param {Object} event - The event to add
   */
  const addEvent = (event) => {
    event.id = shortid.generate(); // First generate a Id into the event
    const { id, clockId } = event; // Destruction Id and clockId from the event
    setState((prev) => ({
      ...prev,
      [`${clockId}|${id}`]: event,
    }));
  };

  /**
   * Update an existing event
   * @param {Object} updatedEvent - The event with updated data
   */
  const updateEvent = (updatedEvent) => {
    const { id, clockId } = updatedEvent;
    const events = { ...state };

    events[`${clockId}|${id}`] = {
      ...events[`${clockId}|${id}`],
      ...updatedEvent,
    };
    setState(events);
  };

  /**
   * Delete an event by ID
   * @param {string} id - The ID of the event to delete
   */
  const deleteEvent = (id) => {
    const events = { ...state };
    delete events[id];
    setState(events);
  };

  /**
   * Delete all events associated with a specific clock ID
   * @param {string} clockId - The clock ID to filter and delete events
   */
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

  /**
   * Clear all events
   */
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
