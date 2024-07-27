// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import ClockListItem from "./clock-list-item";

// const ClockList = ({ clocks, updateClock, deleteClock, localClock }) => {
//   const navigate = useNavigate();

//   const handleViewEvents = () => {
//     navigate("/events");
//   };

//   return (
//     <div>
//       <Header>
//         <h3>Other Clocks</h3>
//         <EventsButton onClick={handleViewEvents}>Your Events</EventsButton>
//       </Header>
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

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   cursor: pointer;
// `;

// const EventsButton = styled.h4`
//   color: blue;
//   text-decoration: underline;
//   cursor: pointer;
// `;

// export default ClockList;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ClockListItem from "./clock-list-item";

const ClockList = ({ clocks, updateClock, deleteClock, localClock }) => {
  const navigate = useNavigate();

  const handleViewEvents = () => {
    navigate("/events");
  };

  return (
    <div>
      <Header>
        <h3>Other Clocks</h3>
        <EventsButton onClick={handleViewEvents}>Your Events</EventsButton>
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
    </div>
  );
};

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
