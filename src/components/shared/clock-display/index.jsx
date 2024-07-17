import { format } from "date-fns";
import classes from "./index.module.css";

/**
 * ClockDisplay component displays a formatted date, title, timezone, and offset.
 *
 * @param {Date} date - The date to be displayed
 * @param {string} title - The title of the clock
 * @param {string} timezone - The timezone of the date
 * @param {number} offset - The offset from UTC in minutes
 *
 * @returns {JSX.Element} - The ClockDisplay component
 */
const ClockDisplay = ({ date, title, timezone, offset }) => {
  let offsetHr = offset / 60;

  return (
    <div className={classes.card}>
      <h1>Title: {title}</h1>
      <h3>{format(date, "yyyy-MM-dd hh:mm:ss aaa")}</h3>
      <p>
        {timezone}
        {offsetHr > 0 ? `+${Math.abs(offsetHr)}` : `-${Math.abs(offsetHr)}`}
      </p>
    </div>
  );
};

export default ClockDisplay;
