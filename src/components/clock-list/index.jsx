import styled, { keyframes } from "styled-components";
import ClockListItem from "./clock-list-item";
import EmptyClock from "../empty-component/EmptyClock";

const ClockList = ({ clocks, updateClock, deleteClock, localClock }) => {
  return (
    <div>
      {clocks.length === 0 ? (
        <div>
          <EmptyClock />
        </div>
      ) : (
        <div>
          <HeadingContainer>
            <Heading>Your Others Clocks</Heading>
          </HeadingContainer>

          {clocks.map((clock) => (
            <ClockListItem
              key={clock.id}
              clock={clock}
              updateClock={updateClock}
              deleteClock={deleteClock}
              localClock={localClock}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const slide = keyframes`
  0% {
    transform: translateX(-50%);
  }
  50% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const HeadingContainer = styled.div`
  overflow: hidden; /* Ensure the text stays within the container */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h3`
  font-size: 18px;
  margin: 10px 14px 0;
  display: inline-block;
  color: #f2f2f2;
  white-space: nowrap;
  animation: ${slide} 10s infinite;

  @media (min-width: 768px) {
    font-size: 22px;
    margin: 20px 20px 0;
  }
`;

export default ClockList;
