import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import ActionButton from "../../ui/action-button";
import Title from "../../ui/title";
import Paragraph from "../../ui/paragraph";

const EventItem = ({ event, onUpdate, onDelete }) => {
  return (
    <EventItemContainer>
      <EventContent>
        <Title>{event.title}</Title>
        <Paragraph>{event.description}</Paragraph>
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

const EventActions = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
  margin-top: 10px;
`;

export default EventItem;
