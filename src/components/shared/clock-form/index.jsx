import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TIMEZONE_OFFSET } from "../../../constants/timezone";
import { getOffset } from "../../../utils/timezone";
import InputField from "../../ui/input";

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

  useEffect(() => {
    if (TIMEZONE_OFFSET[formValues.timezone]) {
      setFormValues((prev) => ({
        ...prev,
        offset: TIMEZONE_OFFSET[formValues.timezone],
      }));
    }
  }, [formValues.timezone]);

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
    handleClock(formValues);
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

      <Button>{edit ? "Update" : "Create"}</Button>
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
  isCreate: PropTypes.bool,
  setIsCreate: PropTypes.func,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 90%;
  margin: 10px auto;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    max-width: 600px;
    padding: 20px;
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

const Button = styled.button`
  padding: 8px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export default ClockForm;
