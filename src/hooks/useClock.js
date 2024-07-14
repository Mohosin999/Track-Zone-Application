import { useEffect, useState } from "react";
import { addMinutes } from "date-fns";

// Initial object
const init = {
  id: "",
  title: "",
  timezone: {
    type: "",
    offset: "",
  },
  date_utc: null,
  date: null,
};

// Timezone offset
const TIMEZONE_OFFSET = {
  PST: -7 * 60,
  EST: -4 * 60,
  EDT: -4 * 60,
  BST: 1 * 60,
  MST: -6 * 60,
};

const useClock = (timezone, offset) => {
  const [state, setState] = useState({ ...init });
  const [utc, setUtc] = useState(null);

  // Logic for get UTC time.
  useEffect(() => {
    let d = new Date();
    const localOffset = d.getTimezoneOffset();
    d = addMinutes(d, localOffset);
    setUtc(d);
  }, []);

  // Convert time based on difference timezone and offset.
  useEffect(() => {
    if (utc !== null && timezone) {
      offset = TIMEZONE_OFFSET[timezone] ?? offset;
      const newUtc = addMinutes(utc, offset);
      setState({ ...state, date_utc: utc, date: newUtc });
    } else {
      setState({ ...state, date_utc: utc, date: utc });
    }
  }, [utc]);

  return {
    clock: state,
  };
};

export default useClock;
