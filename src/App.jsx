import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { generate } from "shortid";
import ClockList from "./components/clock-list";
import LocalClock from "./components/local-clock";
import EventPage from "./components/event-page";
import GoToTopButton from "./components/ui/go-to-top-button";

const LOCAL_CLOCK_INIT = {
  title: "Home Page Clock",
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

  const updateLocalClock = (data) => {
    setLocalClock({
      ...localClock,
      ...data,
    });
  };

  const createClock = (clock) => {
    clock.id = generate();
    setClocks([...clocks, clock]);
  };

  const updateClock = (updatedClock) => {
    const updatedClocks = clocks.map((clock) => {
      if (clock.id === updatedClock.id) {
        return updatedClock;
      }
      return clock;
    });

    setClocks(updatedClocks);
  };

  const deleteClock = (id) => {
    const deletedClocks = clocks.filter((clock) => clock.id !== id);
    setClocks(deletedClocks);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
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

              <GoToTopButton />
            </div>
          }
        />
        <Route path="/events" element={<EventPage />} />
      </Routes>
    </Router>
  );
};

export default App;
