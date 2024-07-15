import { useState } from "react";
import ClockForm from "../clock-form";

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
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  console.log("clock action local --> ", local);

  const handleClock = (values) => {
    console.log(values);
  };

  return (
    <div>
      <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
      {local ? (
        <button onClick={() => setIsCreate(!isCreate)}>Create</button>
      ) : (
        <button>Delete</button>
      )}

      {isEdit && (
        <>
          <h3>Edit Clock</h3>
          <ClockForm
            handleClock={updateClock}
            edit={true}
            title={!local}
            values={clock}
          />
        </>
      )}

      {isCreate && (
        <>
          <h3>Create New Clock</h3>
          <ClockForm handleClock={handleClock} />
        </>
      )}
    </div>
  );
};

export default ClockActions;
