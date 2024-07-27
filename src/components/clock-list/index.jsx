// import ClockListItem from "./clock-list-item";

// const ClockList = ({ clocks, updateClock, deleteClock, localClock }) => {
//   return (
//     <div>
//       <h3>Other Clocks</h3>
//       <hr />

//       {clocks.length === 0 ? (
//         <p>There is no clock, please create one</p>
//       ) : (
//         <div>
//           {clocks.map((clock) => (
//             <ClockListItem
//               key={clock.id}
//               clock={clock}
//               updateClock={updateClock}
//               deleteClock={deleteClock}
//               localClock={localClock}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClockList;

import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ClockListItem from "./clock-list-item";
import useEvents from "../../hooks/useEvents";
import Modal from "./modal";

const ClockList = ({ clocks, updateClock, deleteClock, localClock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getEvents } = useEvents();

  const allEvents = getEvents(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={isModalOpen ? "blur" : ""}>
      <GlobalStyle isModalOpen={isModalOpen} />
      <Header>
        <h3>Other Clocks</h3>
        <EventsButton onClick={handleOpenModal}>Your Events</EventsButton>
      </Header>
      <hr />

      {clocks.length === 0 ? (
        <p>There is no clock, please create one</p>
      ) : (
        <div>
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3>All Events</h3>
        {allEvents.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <ul>
            {allEvents.map((event) => (
              <li key={event.id}>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  body.blur {
    filter: blur(5px);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const EventsButton = styled.h4`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

export default ClockList;
