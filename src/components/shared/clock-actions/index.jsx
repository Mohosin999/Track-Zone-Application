import { useState } from "react";

const defaultOffsets = [
  -11.5, -11, -10.5, -10, -9.5, -9, -8.5, -8, 0, 1, 2, 3, 4, 5, 5.5, 6, 6.5,
];

/**
 * ClockActions component for managing clock settings.
 *
 * @param {boolean} local - Flag indicating if the clock is local
 * @param {Object} clock - Clock object with properties like title, timezone, offset
 * @param {function} updateClock - Function to update the clock object
 *
 * @returns {JSX.Element} - ClockActions component
 */
const ClockActions = ({ local = false, clock, updateClock }) => {
  // State to track if the edit mode is active
  const [isEdit, setIsEdit] = useState(false);

  /**
   * Handles input change events.
   *
   * @param {SyntheticEvent} e - Event object
   */
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "offset") {
      value = Number(value) * 60; // Convert offset from minutes to seconds
    }
    updateClock({
      [name]: value, // Update the clock object with the new value
    });
  };

  return (
    <div>
      <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
      {local ? <button>Create</button> : <button>Delete</button>}
      {isEdit && (
        <div>
          <input
            type="text"
            name="title"
            value={clock.title}
            onChange={handleChange}
          />
          <select
            name="timezone"
            value={clock.timezone}
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

          {(clock.timezone === "GMT" || clock.timezone === "UTC") && (
            <select
              name="offset"
              value={clock.offset / 60}
              onChange={handleChange}
            >
              {defaultOffsets.map((offset) => (
                <option key={offset} value={offset}>
                  {offset}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
};
export default ClockActions;
