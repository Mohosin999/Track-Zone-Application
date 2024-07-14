import { useState, useEffect } from "react";
import { addMinutes } from "date-fns";

const TIMEZONE_OFFSET = {
  PST: -7 * 60,
  EST: -4 * 60,
  EDT: -4 * 60,
  BST: 1 * 60,
  MST: -6 * 60,
};

/**
 * A custom React hook that provides a real-time clock with timezone support.
 *
 * @param {string} timezone - The timezone to display the clock in. If not provided, the local timezone will be used.
 * @param {number} offset - The offset in minutes from UTC for the provided timezone. If not provided, it will be calculated based on the timezone.
 * @returns {Object} An object containing the current date, UTC date, offset, and timezone.
 */
const useClock = (timezone, offset) => {
  const [localDate, setLocalDate] = useState(null);
  const [localTimezone, setLocalTimezone] = useState(null);
  const [localOffset, setLocalOffset] = useState(0);
  const [utc, setUtc] = useState(null);

  // Effect to initialize the UTC date and local timezone offset
  useEffect(() => {
    let d = new Date();
    const lo = d.getTimezoneOffset();
    d = addMinutes(d, lo);
    setUtc(d);
    setLocalOffset(lo);
  }, []);

  // Effect to update the local date based on the provided timezone or local timezone
  useEffect(() => {
    if (utc !== null) {
      if (timezone) {
        offset = TIMEZONE_OFFSET[timezone] ?? offset;
        const newUtc = addMinutes(utc, offset);
        setLocalDate(newUtc);
      } else {
        const newUtc = addMinutes(utc, -localOffset);
        const dateStrArr = newUtc.toUTCString().split(" ");
        setLocalDate(newUtc);
        setLocalTimezone(dateStrArr.pop());
      }
    }
  }, [utc, timezone, offset]);

  // Return the current date, UTC date, offset, and timezone
  return {
    date: localDate,
    date_utc: utc,
    offset: offset || -localOffset,
    timezone: timezone || localTimezone,
  };
};

export default useClock;
