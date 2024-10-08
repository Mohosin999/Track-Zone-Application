import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { TIMEZONE_OFFSET } from "../../../constants/timezone";
import { getOffset } from "../../../utils/timezone";
import InputField from "../../ui/input";
import ActionButton from "../../ui/action-button";

/**
 * ClockForm component allows users to create or update a clock.
 *
 * @param {Object} values - values will be an object containing initial form values.
 * @param {Function} handleClock - handleClock will be a function.
 * @param {boolean} title - title will be a boolean indicating if the title field is enabled.
 * @param {boolean} edit - edit will be a boolean indicating if the form is in edit mode.
 * @param {boolean} isEdit - isEdit will be a boolean indicating if the form is in edit mode.
 * @param {Function} setIsEdit - setIsEdit will be a function.
 * @param {boolean} isCreateClock - isCreateClock will be a boolean indicating if a new clock is being created.
 * @param {Function} setIsCreateClock - setIsCreateClock will be a function.
 * @returns {JSX.Element}
 */
const ClockForm = ({
  values = { title: "", timezone: "UTC", offset: 0 },
  handleClock,
  title = true,
  edit = false,
  isEdit,
  setIsEdit,
  isCreateClock,
  setIsCreateClock,
}) => {
  const [formValues, setFormValues] = useState({ ...values });

  // Effect to set offset while timezone will be changed
  useEffect(() => {
    if (TIMEZONE_OFFSET[formValues.timezone]) {
      setFormValues((prev) => ({
        ...prev,
        offset: TIMEZONE_OFFSET[formValues.timezone],
      }));
    }
  }, [formValues.timezone]);

  // Function to handle all change
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "offset") {
      value = Number(value) * 60;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClock(formValues); // State lifting function

    // Logic to close or open form by clicking
    if (isEdit) {
      setIsEdit(!isEdit);
    }
    if (isCreateClock) {
      setIsCreateClock(!isCreateClock);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="title">Enter Title</Label>
        <InputField
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          disabled={!title}
        />
      </FormField>

      <FormField>
        <Label htmlFor="timezone">Enter Timezone</Label>
        <Select
          id="timezone"
          name="timezone"
          value={formValues.timezone}
          onChange={handleChange}
        >
          <option value="GMT">GMT</option>
          <option value="UTC">UTC</option>
          <option value="PST">PST</option>
          <option value="EST">EST</option>
          <option value="EDT">EDT</option>
          <option value="BST">BST</option>
          <option value="MST">MST</option>
        </Select>
      </FormField>

      {/* Offset will show only for GMT and UTC timezone */}
      {(formValues.timezone === "GMT" || formValues.timezone === "UTC") && (
        <FormField>
          <Label htmlFor="offset">Enter Offset</Label>
          <Select
            id="offset"
            name="offset"
            value={formValues.offset / 60}
            onChange={handleChange}
          >
            {getOffset().map((offset) => (
              <option key={offset} value={offset}>
                {offset}
              </option>
            ))}
          </Select>
        </FormField>
      )}

      {edit ? <ActionButton label="Update" /> : <ActionButton label="Create" />}
    </Form>
  );
};

ClockForm.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    timezone: PropTypes.string,
    offset: PropTypes.number,
  }),
  handleClock: PropTypes.func.isRequired,
  title: PropTypes.bool,
  edit: PropTypes.bool,
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
  isCreateClock: PropTypes.bool,
  setIsCreateClock: PropTypes.func,
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #333;
  color: #f2f2f2;
  max-width: 70%;
  margin: 10px auto;
  padding: 20px;
  border-radius: 10px;
  animation: ${rotateAnimation} 2s linear infinite;

  @media (min-width: 768px) {
    max-width: 62.3%;
    padding: 30px;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Select = styled.select`
  padding: 4px;
  font-size: 14px;
  font-family: monospace;

  @media (min-width: 768px) {
    padding: 8px;
    font-size: 16px;
  }
`;

export default ClockForm;
