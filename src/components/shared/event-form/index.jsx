import { useEffect, useState } from "react";
import InputField from "../../ui/input";
import TextAreaField from "../../ui/textarea";
import ActionButton from "../../ui/action-button";

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
      <InputField
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
        required={true}
      />

      <TextAreaField
        name="description"
        value={formData.description}
        onChange={handleChange}
        required={true}
      />

      <ActionButton
        type="submit"
        label={event ? "Update Event" : "Add Event"}
      />
    </form>
  );
};

export default EventForm;
