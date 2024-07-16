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

  // Update clock function
  const updateLocalClock = (data) => {
    setLocalClock({
      ...localClock,
      ...data,
    });
  };

  // Create clock function
  const createClock = (clock) => {};

  return (
    <div>
      <LocalClock clock={localClock} updateClock={updateLocalClock} />
      <ClockList />
    </div>
  );
};

export default App;
