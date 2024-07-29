import PropTypes from "prop-types";
import styled from "styled-components";
import ActionButton from "../../ui/action-button";
import InputField from "../../ui/input";
import TextAreaField from "../../ui/textarea";
import Title from "../../ui/title";

const EventUpdateForm = ({
  event,
  onSubmit,
  onCancel,
  onTitleChange,
  onDescriptionChange,
}) => {
  return (
    <FormContainer onSubmit={onSubmit}>
      <Title>Update Event</Title>
      <InputField
        type="text"
        value={event.title}
        onChange={onTitleChange}
        placeholder="Event Title"
        required
      />
      <TextAreaField
        value={event.description}
        onChange={onDescriptionChange}
        placeholder="Event Description"
        required
      />

      <FormActions>
        <ActionButton label="Save" />
        <ActionButton label="Cancel" onClick={onCancel} />
      </FormActions>
    </FormContainer>
  );
};

EventUpdateForm.propTypes = {
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
  margin-bottom: 20px;
  animation: fadeIn 0.5s ease-in-out;
`;

const FormActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export default EventUpdateForm;
