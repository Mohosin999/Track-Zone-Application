import React, { useEffect, useState } from "react";

const EventForm = ({ clockId, event, addEvent, updateEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clockId: clockId,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        id: event.id,
        title: event.title,
        description: event.description,
        clockId: event.clockId,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event && event.id) {
      updateEvent(formData);
    } else {
      addEvent(formData);
    }
    setFormData({ title: "", description: "", clockId: clockId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
        // readOnly={!!event} // Make title read-only if editing
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Event Description"
        required
      />
      <button type="submit">{event ? "Update Event" : "Add Event"}</button>
    </form>
  );
};

export default EventForm;
