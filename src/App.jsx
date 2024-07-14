// import React from "react";

import ClockList from "./components/clock-list";
import LocalClock from "./components/local-clock";

const App = () => {
  return (
    <div>
      <LocalClock />
      <ClockList />
    </div>
  );
};

export default App;
