import { useState } from "react";
import { generate } from "shortid";
import ClockList from "./components/clock-list";
import LocalClock from "./components/local-clock";

const LOCAL_CLOCK_INIT = {
  title: "My Clock",
  timezone: "",
  offset: 0,
  date: null,
};

const App = () => {
  const [localClock, setLocalClock] = useState({ ...LOCAL_CLOCK_INIT });
  const [clocks, setClocks] = useState([]);

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
    const updatedClock = clocks.filter((clock) => clock.id !== id);
    setClocks(updatedClock);
  };

  return (
    <div>
      <LocalClock
        clock={localClock}
        updateClock={updateLocalClock}
        createClock={createClock}
      />
      <ClockList />
    </div>
  );
};

export default App;
