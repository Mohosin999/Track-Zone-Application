// Importing required constants from the constants folder
import { TIMEZONE_OFFSET } from "../constants/timezone";

// Function to generate an array of offsets from a given start to an end value
// The function defaults to generating offsets from 11.5 to 12 with a step of 0.5
export const getOffset = (start = -11.5, ending = 12) => {
  const offsets = [];
  for (let i = start; i <= ending; i += 0.5) {
    offsets.push(i);
  }
  return offsets;
};

// Function to generate an array of timezones
// The function includes 'UTC' and 'GMT' as well as all timezones from the imported TIMEZONE_OFFSET constant
export const getTimezone = () => {
  return ["UTC", "GMT", ...Object.keys(TIMEZONE_OFFSET)];
};
