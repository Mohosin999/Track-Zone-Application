import { useState } from "react";
import styled from "styled-components";
import { formatDistance } from "date-fns";
import useClock from "../../hooks/useClock";
import useTimer from "../../hooks/useTimer";
import ClockDisplay from "../shared/clock-display";
import ClockActions from "../shared/clock-actions";
import EventList from "../event-list";
import ClockForm from "../shared/clock-form";

const ClockListItem = ({ clock, updateClock, deleteClock, localClock }) => {
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
        <TimeDifference>
          Time difference:{" "}
          <TimeSpan>{formatDistance(localClock, date)}</TimeSpan>
        </TimeDifference>

        <ButtonContainer>
          <ClockActions
            clock={clock}
            updateClock={updateClock}
            deleteClock={deleteClock}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </ButtonContainer>
      </ClockItemCard>

      {isEdit && (
        <ClockForm
          values={clock}
          handleClock={updateClock}
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
  background: pink;
  margin: 10px;
  padding: 0 10px 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    margin: 20px;
    padding: 0 20px 20px;
  }
`;

const TimeDifference = styled.p`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin: 5px 0 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const TimeSpan = styled.span`
  background: green;
  color: #f2f2f2;
  font-weight: normal;
  margin-left: 5px;
  padding: 6px 14px;
  border-radius: 20px;

  @media (min-width: 768px) {
    padding: 8px 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

export default ClockListItem;
