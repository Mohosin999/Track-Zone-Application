import styled from "styled-components";
import useEvents from "../../../hooks/useEvents";
import ActionButton from "../../ui/action-button";

const ClockActions = ({
  local = false,
  clock,
  deleteClock,
  isEdit,
  setIsEdit,
  isCreateClock,
  setIsCreateClock,
}) => {
  const { deleteEventsByClockId } = useEvents();


  const handleDeleteClock = (id) => {
    deleteClock(id);
    deleteEventsByClockId(id); // Delete all events associated with the clock
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
    if (isCreateClock) setIsCreateClock(false);
  };

  const toggleCreate = () => {
    setIsCreateClock(!isCreateClock);
    if (isEdit) setIsEdit(false);
  };

  return (
    <div>
      <ButtonGroup>
        <ActionButton label="Edit" onClick={toggleEdit} />
        {local ? (
          <ActionButton label="Create" onClick={toggleCreate} />
        ) : (
          <ActionButton
            label="Delete"
            onClick={() => handleDeleteClock(clock.id)}
          />
        )}
      </ButtonGroup>
    </div>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;

  @media (min-width: 768px) {
    gap: 10px;
  }
`;

export default ClockActions;
