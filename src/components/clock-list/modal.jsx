import React from "react";
import styled from "styled-components";

const Modal = ({ children, isOpen, onClose, onClearAll }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <ClearAllButton onClick={onClearAll}>Clear All Events</ClearAllButton>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </Header>
        <Content>{children}</Content>
      </ModalContent>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
`;

const ClearAllButton = styled.button`
  background: blue;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const Content = styled.div`
  margin-top: 20px;
`;

export default Modal;
