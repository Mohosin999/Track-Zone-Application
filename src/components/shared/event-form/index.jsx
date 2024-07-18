import React, { useState } from "react";

const EventForm = ({ clockId, addEvent }) => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    clockId: clockId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(event);
    setEvent({ title: "", description: "", clockId: clockId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={event.title}
        onChange={handleChange}
        placeholder="Event Title"
        required
      />
      <input
        type="text"
        name="description"
        value={event.description}
        onChange={handleChange}
        placeholder="Event Description"
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;

// import React, { useState } from "react";
// import { useEvents } from "../../event-context";

// const EventForm = ({ clockId }) => {
//   const { addEvent } = useEvents();
//   const [event, setEvent] = useState({
//     title: "",
//     description: "",
//     clockId: clockId,
//   });

//   console.log("event form --> ", event);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEvent((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addEvent(event);
//     setEvent({ title: "", description: "", clockId: clockId });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="title"
//         value={event.title}
//         onChange={handleChange}
//         placeholder="Event Title"
//         required
//       />
//       <input
//         type="text"
//         name="description"
//         value={event.description}
//         onChange={handleChange}
//         placeholder="Event Description"
//         required
//       />
//       <button type="submit">Add Event</button>
//     </form>
//   );
// };

// export default EventForm;

// import { useState } from "react";
// import useEvents from "../../../hooks/useEvents";

// const EventForm = ({ clockId }) => {
//   const { addEvent } = useEvents();
//   const [event, setEvent] = useState({
//     title: "",
//     description: "",
//     clockId: clockId,
//   });

//   console.log("event form --> ", event);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEvent((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addEvent(event);
//     setEvent({ title: "", description: "", clockId: "" });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="title"
//         value={event.title}
//         onChange={handleChange}
//         placeholder="Event Title"
//         required
//       />
//       <input
//         type="text"
//         name="description"
//         value={event.description}
//         onChange={handleChange}
//         placeholder="Event Description"
//         required
//       />

//       <button type="submit">Add Event</button>
//     </form>
//   );
// };

// export default EventForm;
