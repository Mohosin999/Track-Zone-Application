import styled from "styled-components";

const EmptyEvent = () => {
  return (
    <EmptyEventContainer>
      <EmptyEventEmoji>📋</EmptyEventEmoji>
      <Title>
        <p style={{ margin: 0 }}>No Events found!</p>
        <p style={{ margin: 0 }}>Please create one</p>
      </Title>
    </EmptyEventContainer>
  );
};

const EmptyEventContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 14px 20px;

  @media (min-width: 768px) {
    padding: 20px 0 40px;
  }
`;

const EmptyEventEmoji = styled.div`
  font-size: 86px;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    font-size: 96px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  color: #f2f2f2;
  text-transform: capitalize;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 10px;
    font-size: 26px;
  }
`;

export default EmptyEvent;
