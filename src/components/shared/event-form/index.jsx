import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import InputField from "../../ui/input";
import TextAreaField from "../../ui/textarea";
import ActionButton from "../../ui/action-button";
import Title from "../../ui/title";

/**
 * EventForm component allows users to create or update an event.
 *
 * @param {string} clockId - clockId will be a string.
 * @param {Object} event - event will be an object.
 * @param {Function} handleCreateEvent - handleCreateEvent will be a function.
 * @param {Function} handleUpdateEvent - handleUpdateEvent will be a function.
 * @param {boolean} isEdit - isEdit will be a boolean.
 * @param {Function} setIsEdit - setIsEdit will be a function.
 * @param {boolean} isCreateEvent - isCreateEvent will be a boolean.
 * @param {Function} setIsCreateEvent - setIsCreateEvent will be a function.
 * @returns
 */
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
      <FormInputSection>
        <InputField
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title..."
          required={true}
        />

        <TextAreaField
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description..."
          required={true}
        />
      </FormInputSection>

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

// This is for animation around the form.
const rotateAnimation = keyframes`
  0% {
    box-shadow: 0 0 10px 4px #FFD700;
    border-color: #FFD700;
  }
  25% {
    box-shadow: 0 0 10px 4px #2E8B57;
    border-color: #2E8B57;
  }
  50% {
    box-shadow: 0 0 10px 4px #20B2AA;
    border-color: #20B2AA;
  }
  75% {
    box-shadow: 0 0 10px 4px #FFDEAD;
    border-color: #FFDEAD;
  }
  100% {
    box-shadow: 0 0 10px 4px #00ff00;
    border-color: #00ff00;
  }
`;

const FormContainer = styled.form`
  background: #333;
  color: #f2f2f2;
  max-width: 80%;
  padding: 20px;
  margin: 10px auto;
  border-radius: 10px;
  animation: ${rotateAnimation} 2s linear infinite;

  @media (min-width: 768px) {
    max-width: 73%;
    padding: 30px;
  }
`;

const FormInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin-top: 10px;
`;

export default EventForm;
