import { useState } from "react";
import styled from "styled-components";
import useEvents from "../../../hooks/useEvents";
import ClockForm from "../clock-form";
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
      <ButtonGroup>
        <ActionButton label="Edit" onClick={() => setIsEdit(!isEdit)} />
        {local ? (
          <ActionButton label="Create" onClick={() => setIsCreate(!isCreate)} />
        ) : (
          <ActionButton
            label="Delete"
            onClick={() => handleDeleteClock(clock.id)}
          />
        )}
      </ButtonGroup>

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
  // padding-left: 10px;
  // padding-right: 10px;
  // padding-bottom: 7px;

  @media (min-width: 768px) {
    gap: 10px;
  }
`;

export default ClockActions;
