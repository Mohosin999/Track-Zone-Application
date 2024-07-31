import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import InputField from "../../ui/input";
import TextAreaField from "../../ui/textarea";
import ActionButton from "../../ui/action-button";
import Title from "../../ui/title";

const EventForm = ({
  clockId,
  event,
  handleCreateEvent,
  handleUpdateEvent,
  isEdit,
  setIsEdit,
  isCreateEvent,
  setIsCreateEvent,
}) => {
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
      handleUpdateEvent(formData);
    } else {
      handleCreateEvent(formData);
    }

    // Close the form after clicking on create or edit button
    if (isEdit) {
      setIsEdit(!isEdit);
    }
    if (isCreateEvent) {
      setIsCreateEvent(!isCreateEvent);
    }

    setFormData({ title: "", description: "", clockId: clockId });
  };

  // Handle cancel
  const handleCancel = () => {
    if (isEdit) {
      setIsEdit(null);
    }
    if (isCreateEvent) {
      setIsCreateEvent(null);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>{event ? "Update Event" : "Create Event"}</Title>
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

      <FormActions>
        <ActionButton
          type="submit"
          label={event ? "Update Event" : "Add Event"}
        />
        <ActionButton label="Cancel" onClick={handleCancel} />
      </FormActions>
    </FormContainer>
  );
};

EventForm.propTypes = {
  event: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  textareaRef: PropTypes.object.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
};

const FormContainer = styled.form`
  background: #ffe4c4;
  padding: 20px;
  border-radius: 5px;
  margin-top: 6px;
  margin-bottom: 20px;
  animation: fadeIn 0.5s ease-in-out;
`;

const FormActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export default EventForm;
