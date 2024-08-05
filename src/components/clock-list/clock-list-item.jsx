import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { formatDistance } from "date-fns";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";
import EventList from "../event-list";
import ClockForm from "../shared/clock-form";

/**
 * ClockListItem component displays a single clock with its details, actions, and associated events.
 *
 * @param {Object} clock - clock will be an object representing the clock details.
 * @param {Function} handleUpdateClock - handleUpdateClock will be a function to handle clock updates.
 * @param {Function} handleDeleteClock - handleDeleteClock will be a function to handle clock deletions.
 * @param {boolean} localClock - localClock will be a boolean representing the local time.
 * @returns {JSX.Element}
 */
const ClockListItem = ({
  clock,
  handleUpdateClock,
  handleDeleteClock,
  localClock,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const { date } = useClock(clock.timezone, clock.offset);
  const timer = useTimer(date);

  if (!date || !timer) return null;

  return (
    <div>
      <ClockItemCard>
        <ClockDisplay
          date={timer}
          offset={clock.offset}
          timezone={clock.timezone}
          title={clock.title}
        />
        <BottomAreaStyle>
          <TimeDifference>
            Time difference:{" "}
            <TimeSpan>{formatDistance(localClock, date)}</TimeSpan>
          </TimeDifference>

          <ButtonContainer>
            <ClockActions
              clock={clock}
              deleteClock={handleDeleteClock}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          </ButtonContainer>
        </BottomAreaStyle>
      </ClockItemCard>

      {isEdit && (
        <ClockForm
          values={clock}
          handleClock={handleUpdateClock}
          edit={true}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}

      <EventList clockId={clock.id} />
    </div>
  );
};

// Prop-types
ClockListItem.propTypes = {
  clock: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  handleUpdateClock: PropTypes.func.isRequired,
  handleDeleteClock: PropTypes.func.isRequired,
  localClock: PropTypes.instanceOf(Date).isRequired,
};

// Styled components
const ClockItemCard = styled.div`
  background: #333;
  margin: 14px 26px;
  padding: 0 12px 6px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    margin: 20px 80px;
    padding: 0 20px 20px;
  }
`;

const BottomAreaStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TimeDifference = styled.p`
  display: flex;
  flex-direction: column;
  color: #f2f2f2;
  font-size: 14px;
  font-weight: bold;

  @media (min-width: 768px) {
    flex-direction: row;
    font-size: 16px;
  }
`;

const TimeSpan = styled.span`
  font-weight: normal;
  text-align: center;

  @media (min-width: 768px) {
    margin-left: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

export default ClockListItem;
