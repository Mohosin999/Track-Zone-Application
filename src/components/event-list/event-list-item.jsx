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

  const createdDate = new Date().toLocaleDateString();

  return (
    <Container>
      <EventItemContainer key={event.id}>
        <EventContent>
          <Title>{event.title}</Title>
          <div style={{ textAlign: "left" }}>
            <Paragraph>{event.description}</Paragraph>
          </div>
        </EventContent>

        {/* Buttons */}
        <ActionsDiv>
          <CreatedDate>{`Created: ${createdDate}`}</CreatedDate>
          <EventActionsWrapper>
            <EventActions
              clockId={clockId}
              event={event}
              handleDeleteEvent={handleDeleteEvent}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          </EventActionsWrapper>
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
    </Container>
  );
};

EventListItem.propTypes = {
  clockId: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  handleUpdateEvent: PropTypes.func.isRequired,
  handleDeleteEvent: PropTypes.func.isRequired,
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  margin: 0 26px;

  @media (min-width: 768px) {
    margin: 0 80px;
  }
`;

const EventItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #008080;
  color: #f2f2f2;
  padding: 12px 20px;
  border-radius: 5px;
  margin-bottom: 8px;
  animation: ${fadeIn} 0.5s ease-in-out;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 20px 30px;
    margin-bottom: 10px;
    flex-direction: column;
  }
`;

const EventContent = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const ActionsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  flex-direction: row;
`;

const CreatedDate = styled.div`
  color: #ffdead;
  text-align: left;
  font-size: 12px;
  flex-grow: 1;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const EventActionsWrapper = styled.div`
  text-align: right;
`;

export default EventListItem;
