// import { useState } from "react";
// import { generate } from "shortid";
// import ClockList from "./components/clock-list";
// import LocalClock from "./components/local-clock";
// import EventList from "./components/event-list";
// // import EventForm from "./components/shared/event-form";

// const LOCAL_CLOCK_INIT = {
//   title: "My Clock",
//   timezone: "",
//   offset: 0,
//   date: null,
// };

// const App = () => {
//   const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });
//   const [clocks, setClocks] = useState([]);

//   // Function for update local clock
//   const updateLocalClock = (data) => {
//     setLocalClock({
//       ...localClock,
//       ...data,
//     });
//   };

//   // Function for create clock
//   const createClock = (clock) => {
//     clock.id = generate(); // Add an id with new created clock
//     setClocks([...clocks, clock]);
//   };

//   // Function for update clock
//   const updateClock = (updatedClock) => {
//     const updatedClocks = clocks.map((clock) => {
//       if (clock.id === updatedClock.id) {
//         return updatedClock;
//       }
//       return clock;
//     });

//     setClocks(updatedClocks);
//   };

//   // Function for delete clock
//   const deleteClock = (id) => {
//     const deletedClocks = clocks.filter((clock) => clock.id !== id);
//     setClocks(deletedClocks);
//   };

//   return (
//     <div>
//       <LocalClock
//         clock={localClock}
//         updateClock={updateLocalClock}
//         createClock={createClock}
//       />
//       <ClockList
//         clocks={clocks}
//         localClock={localClock.date}
//         updateClock={updateClock}
//         deleteClock={deleteClock}
//       />
//       {/* <EventForm /> */}
//       {/* <EventList /> */}
//     </div>
//   );
// };

// export default App;

import { useEffect, useState } from "react";
import { generate } from "shortid";
import ClockList from "./components/clock-list";
import LocalClock from "./components/local-clock";
// import EventList from "./components/event-list";
// // import EventForm from "./components/shared/event-form";

const LOCAL_CLOCK_INIT = {
  title: "My Clock",
  timezone: "",
  offset: 0,
  date: null,
};

const App = () => {
  const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });
  const [clocks, setClocks] = useState(() => {
    const savedClocks = localStorage.getItem("clocks");
    return savedClocks ? JSON.parse(savedClocks) : [];
  });

  useEffect(() => {
    localStorage.setItem("clocks", JSON.stringify(clocks));
  }, [clocks]);

  // Function for update local clock
  const updateLocalClock = (data) => {
    setLocalClock({
      ...localClock,
      ...data,
    });
  };

  // Function for create clock
  const createClock = (clock) => {
    clock.id = generate(); // Add an id with new created clock
    setClocks([...clocks, clock]);
  };

  // Function for update clock
  const updateClock = (updatedClock) => {
    const updatedClocks = clocks.map((clock) => {
      if (clock.id === updatedClock.id) {
        return updatedClock;
      }
      return clock;
    });

    setClocks(updatedClocks);
  };

  // Function for delete clock
  const deleteClock = (id) => {
    const deletedClocks = clocks.filter((clock) => clock.id !== id);
    setClocks(deletedClocks);
  };

  return (
    <div>
      <LocalClock
        clock={localClock}
        updateClock={updateLocalClock}
        createClock={createClock}
      />
      <ClockList
        clocks={clocks}
        localClock={localClock.date}
        updateClock={updateClock}
        deleteClock={deleteClock}
      />
      {/* <EventForm /> */}
      {/* <EventList /> */}
    </div>
  );
};

export default App;
