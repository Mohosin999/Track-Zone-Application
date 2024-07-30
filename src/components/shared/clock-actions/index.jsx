// import { useState } from "react";
// import ClockForm from "../clock-form";
// import useEvents from "../../../hooks/useEvents";

// const ClockActions = ({
//   local = false,
//   clock,
//   updateClock,
//   createClock,
//   deleteClock,
// }) => {
//   const [isEdit, setIsEdit] = useState(false);
//   const [isCreate, setIsCreate] = useState(false);

//   const { deleteEventsByClockId } = useEvents();

//   const handleClock = (values) => {
//     createClock(values); // State lifting
//   };

//   const handleDeleteClock = (id) => {
//     deleteClock(id);
//     deleteEventsByClockId(id); // Delete all events associated with the clock
//   };

//   return (
//     <div>
//       <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
//       {local ? (
//         <button onClick={() => setIsCreate(!isCreate)}>Create</button>
//       ) : (
//         <button onClick={() => handleDeleteClock(clock.id)}>Delete</button>
//       )}

//       {isEdit && (
//         <>
//           <h3>Edit Clock</h3>
//           <ClockForm
//             handleClock={updateClock}
//             edit={true}
//             title={!local}
//             values={clock}
//           />
//         </>
//       )}

//       {isCreate && (
//         <>
//           <h3>Create New Clock</h3>
//           <ClockForm handleClock={handleClock} />
//         </>
//       )}
//     </div>
//   );
// };

// export default ClockActions;

import { useState } from "react";
import ClockForm from "../clock-form";
import useEvents from "../../../hooks/useEvents";
import ActionButton from "../../ui/action-button";

const ClockActions = ({
  local = false,
  clock,
  updateClock,
  createClock,
  deleteClock,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const { deleteEventsByClockId } = useEvents();

  const handleClock = (values) => {
    createClock(values); // State lifting
  };

  const handleDeleteClock = (id) => {
    deleteClock(id);
    deleteEventsByClockId(id); // Delete all events associated with the clock
  };

  return (
    <div>
      {/* <Action onClick={() => setIsEdit(!isEdit)}>Edit</Action> */}
      <ActionButton label="Edit" onClick={() => setIsEdit(!isEdit)} />
      {local ? (
        <ActionButton label="Create" onClick={() => setIsCreate(!isCreate)} />
      ) : (
        <ActionButton
          label="Delete"
          onClick={() => handleDeleteClock(clock.id)}
        />
      )}

      {isEdit && (
        <>
          <h3>Edit Clock</h3>
          <ClockForm
            handleClock={updateClock}
            edit={true}
            title={!local}
            values={clock}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </>
      )}

      {isCreate && (
        <>
          <h3>Create New Clock</h3>
          <ClockForm
            handleClock={handleClock}
            isCreate={isCreate}
            setIsCreate={setIsCreate}
          />
        </>
      )}
    </div>
  );
};

export default ClockActions;
