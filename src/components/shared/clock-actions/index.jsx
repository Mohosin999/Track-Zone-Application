import PropTypes from "prop-types";
import styled from "styled-components";
import useEvents from "../../../hooks/useEvents";
import ActionButton from "../../ui/action-button";

/**
 * ClockActions component provides action buttons for editing, creating, and deleting clocks.
 *
 * @param {boolean} local - local will be a boolean indicating if the clock is local.
 * @param {Object} clock - clock will be an object representing the clock data.
 * @param {Function} deleteClock - deleteClock will be a function to delete the clock.
 * @param {boolean} isEdit - isEdit will be a boolean indicating if edit mode is enabled.
 * @param {Function} setIsEdit - setIsEdit will be a function to toggle edit mode.
 * @param {boolean} isCreateClock - isCreateClock will be a boolean indicating if create mode is enabled.
 * @param {Function} setIsCreateClock - setIsCreateClock will be a function to toggle create mode.
 * @returns {JSX.Element}
 */
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

  /**
   * Function to handle delete
   * Delete single clock
   * Delete all events those are relation with specific clock
   * @param {Number} id - Id will be a number.
   */
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

// Prop-types
ClockActions.propTypes = {
  local: PropTypes.bool,
  clock: PropTypes.object.isRequired,
  deleteClock: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  setIsEdit: PropTypes.func.isRequired,
  isCreateClock: PropTypes.bool.isRequired,
  setIsCreateClock: PropTypes.func.isRequired,
};

// Styled components
const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;

  @media (min-width: 768px) {
    gap: 10px;
  }
`;

export default ClockActions;
