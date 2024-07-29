// import React from "react";
// import PropTypes from "prop-types";
// import styled, { keyframes } from "styled-components";

// const EventItem = ({ event, onUpdate, onDelete }) => {
//   return (
//     <EventItemContainer>
//       <EventContent>
//         <EventTitle>{event.title}</EventTitle>
//         <EventDescription>{event.description}</EventDescription>
//       </EventContent>
//       <EventActions>
//         <ActionButton onClick={() => onUpdate(event)}>Update</ActionButton>
//         <ActionButton onClick={() => onDelete(event)}>Delete</ActionButton>
//       </EventActions>
//     </EventItemContainer>
//   );
// };

// EventItem.propTypes = {
//   event: PropTypes.object.isRequired,
//   onUpdate: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const EventItemContainer = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: #afeeee;
//   padding: 20px;
//   border-radius: 5px;
//   margin-bottom: 5px;
//   animation: ${fadeIn} 0.5s ease-in-out;
//   flex-direction: column;

//   // @media (min-width: 768px) {
//   //   flex-direction: row;
//   // }
// `;

// const EventContent = styled.div`
//   text-align: left;
//   flex-grow: 1;
// `;

// const EventTitle = styled.h4`
//   margin: 0;
//   font-size: 20px;
//   margin-bottom: 16px;
// `;

// const EventDescription = styled.p`
//   margin: 5px 0 0;
//   font-size: 17px;
//   line-height: 25px;
//   white-space: pre-wrap;
// `;

// const EventActions = styled.div`
//   display: flex;
//   gap: 10px;
//   margin-left: auto;
//   margin-top: 10px;
// `;

// const ActionButton = styled.button`
//   background: #daa520;
//   color: white;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   border-radius: 5px;

//   &:hover {
//     background: #b8860b;
//   }
// `;

// export default EventItem;

import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import ActionButton from "../../ui/action-button";

const EventItem = ({ event, onUpdate, onDelete }) => {
  return (
    <EventItemContainer>
      <EventContent>
        <EventTitle>{event.title}</EventTitle>
        <EventDescription>{event.description}</EventDescription>
      </EventContent>

      <EventActions>
        <ActionButton label="Update" onClick={() => onUpdate(event)} />
        <ActionButton label="Delete" onClick={() => onDelete(event)} />
      </EventActions>
    </EventItemContainer>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const EventItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #afeeee;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 5px;
  animation: ${fadeIn} 0.5s ease-in-out;
  flex-direction: column;
`;

const EventContent = styled.div`
  text-align: left;
  flex-grow: 1;
`;

const EventTitle = styled.h4`
  margin: 0;
  font-size: 20px;
  margin-bottom: 16px;
`;

const EventDescription = styled.p`
  margin: 5px 0 0;
  font-size: 17px;
  line-height: 25px;
  white-space: pre-wrap;
`;

const EventActions = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
  margin-top: 10px;
`;

export default EventItem;
