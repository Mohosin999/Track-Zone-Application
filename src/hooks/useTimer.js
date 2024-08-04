import { addSeconds } from "date-fns";
import { useEffect, useState } from "react";

/**
 * Custom hook to create a timer that updates every second
 * @param {Date} date - The initial date for the timer
 * @returns {Date} - The updated timer date
 */
const useTimer = (date) => {
  // State to keep track of the timer date
  const [timer, setTimer] = useState(date);

  // Effect to initialize the timer state when the date prop changes
  useEffect(() => {
    setTimer(date);
  }, [date]);

  let timerId = null; // Variable to store the interval ID

  // Effect to start the timer and update it every second
  useEffect(() => {
    if (!timer || timerId !== null) return;

    timerId = setInterval(() => {
      setTimer((prevTimer) => addSeconds(prevTimer, 1));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, [timer]);

  return timer;
};

export default useTimer;
