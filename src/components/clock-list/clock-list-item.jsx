import { useState } from "react";
import styled from "styled-components";
import { formatDistance } from "date-fns";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";
import EventList from "../event-list";
import ClockForm from "../shared/clock-form";

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
