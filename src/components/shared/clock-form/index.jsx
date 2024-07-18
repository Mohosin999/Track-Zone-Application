import { useState, useEffect } from "react";
import { TIMEZONE_OFFSET } from "../../../constants/timezone";
import { getOffset } from "../../../utils/timezone";

/**
 * ClockForm component for creating and editing clocks.
 *
 * @param {Object} values - Initial form values
 * @param {function} handleClock - Callback function to handle form submission
 * @param {Boolean} title - Flag to enable/disable title input
 * @param {Boolean} edit - Flag to indicate edit mode
 *
 * @returns {JSX.Element} - ClockForm component
 */
const ClockForm = ({
  values = { title: "", timezone: "UTC", offset: 0 },
  handleClock,
  title = true,
  edit = false,
}) => {
  // State for form values
  const [formValues, setFormValues] = useState({ ...values });

  // Update offset when timezone changes
  useEffect(() => {
    if (TIMEZONE_OFFSET[formValues.timezone]) {
      setFormValues((prev) => ({
        ...prev,
        offset: TIMEZONE_OFFSET[formValues.timezone],
      }));
    }
  }, [formValues.timezone]);

  // Handle form input changes
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "offset") {
      value = Number(value) * 60; // Convert offset from minutes to seconds
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClock(formValues); // State lifting
  };

  // Render ClockForm component
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Enter Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          disabled={!title}
        />
      </div>

      <div>
        <label htmlFor="timezone">Enter Timezone</label>
        <select
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
        </select>
      </div>

      {(formValues.timezone === "GMT" || formValues.timezone === "UTC") && (
        <div>
          <label htmlFor="offset">Enter Offset</label>
          <select
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
          </select>
        </div>
      )}

      <button>{edit ? "Update" : "Create"}</button>
    </form>
  );
};

export default ClockForm;
