import { useState } from "react";

const useEvents = () => {
  const [state, setState] = useState({});

  return {
    events: state,
  };
};

export default useEvents;
