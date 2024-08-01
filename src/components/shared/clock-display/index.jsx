// import { format } from "date-fns";

// /**
//  * ClockDisplay component displays a formatted date, title, timezone, and offset.
//  *
//  * @param {Date} date - The date to be displayed
//  * @param {string} title - The title of the clock
//  * @param {string} timezone - The timezone of the date
//  * @param {number} offset - The offset from UTC in minutes
//  *
//  * @returns {JSX.Element} - The ClockDisplay component
//  */
// const ClockDisplay = ({ date, title, timezone, offset }) => {
//   let offsetHr = offset / 60;

//   return (
//     <div>
//       <h1>Title: {title}</h1>
//       <h3>{format(date, "yyyy-MM-dd hh:mm:ss aaa")}</h3>
//       <p>
//         {timezone}
//         {offsetHr > 0 ? `+${Math.abs(offsetHr)}` : `-${Math.abs(offsetHr)}`}
//       </p>
//     </div>
//   );
// };

// export default ClockDisplay;

import { format } from "date-fns";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * ClockDisplay component displays a formatted date, title, timezone, and offset.
 *
 * @param {Date} date - The date to be displayed
 * @param {string} title - The title of the clock
 * @param {string} timezone - The timezone of the date
 * @param {number} offset - The offset from UTC in minutes
 *
 * @returns {JSX.Element} - The ClockDisplay component
 */
const ClockDisplay = ({ date, title, timezone, offset }) => {
  let offsetHr = offset / 60;

  return (
    <ClockDisplayContainer>
      <Title>{title}</Title>
      <ClockCircle>
        <DateTimeContainer>
          <DateText>{format(date, "yyyy-MM-dd")}</DateText>
          <TimeText>{format(date, "hh:mm:ss aaa")}</TimeText>
          <TimezoneText>
            {timezone}
            {offsetHr > 0 ? `+${Math.abs(offsetHr)}` : `-${Math.abs(offsetHr)}`}
          </TimezoneText>
        </DateTimeContainer>
      </ClockCircle>
    </ClockDisplayContainer>
  );
};

ClockDisplay.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
};

const ClockDisplayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 10px 10px 10px;

  @media (min-width: 768px) {
    padding: 20px 20px 10px 20px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  text-align: center;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const ClockCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 10px;

  @media (min-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateText = styled.h3`
  margin: 5px;
  font-size: 16px;

  @media (min-width: 768px) {
    margin: 10px;
    font-size: 20px;
  }
`;

const TimeText = styled.h3`
  margin: 5px;
  font-size: 16px;

  @media (min-width: 768px) {
    margin: 10px;
    font-size: 20px;
  }
`;

const TimezoneText = styled.p`
  margin: 5px;
  font-size: 14px;

  @media (min-width: 768px) {
    margin: 10px;
    font-size: 18px;
  }
`;

export default ClockDisplay;
