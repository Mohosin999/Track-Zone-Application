import { useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import EventActions from "../shared/event-actions";
import EventForm from "../shared/event-form";
import Title from "../ui/title";
import Paragraph from "../ui/paragraph";

const EventListItem = ({
  clockId,
  event,
  handleUpdateEvent,
  handleDeleteEvent,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <EventItemContainer key={event.id}>
        <EventContent>
          <Title>{event.title}</Title>
          <Paragraph>{event.description}</Paragraph>
        </EventContent>

        {/* Buttons */}
        <ActionsDiv>
          <EventActions
            clockId={clockId}
            event={event}
            handleDeleteEvent={handleDeleteEvent}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </ActionsDiv>
      </EventItemContainer>

      {isEdit && (
        <>
          <EventForm
            clockId={clockId}
            event={event}
            handleUpdateEvent={handleUpdateEvent}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </>
      )}
    </>
  );
};

EventListItem.propTypes = {
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

const ActionsDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
  margin-top: 10px;
`;

export default EventListItem;
