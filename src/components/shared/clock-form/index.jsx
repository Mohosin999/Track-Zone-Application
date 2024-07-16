import { useEffect } from "react";
import { TIMEZONE_OFFSET } from "../../../constants/timezone";
import { getOffset } from "../../../utils/timezone";
import useForm from "../../../hooks/useForm";

const validate = (values) => {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.timezone) {
    errors.timezone = "Timezone is required";
  }
  return errors;
};

/**
 * ClockForm component for creating and editing clocks.
 *
 * @param {Object} values - Initial form values
 * @param {function} handleClock - Callback function to handle form submission
 * @param {boolean} title - Flag to enable/disable title input
 * @param {boolean} edit - Flag to indicate edit mode
 *
 * @returns {JSX.Element} - ClockForm component
 */
const ClockForm = ({
  values = { title: "", timezone: "UTC", offset: 0 },
  handleClock,
  title = true,
  edit = false,
}) => {
  // Initialize useForm hook
  const {
    formState,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    clear,
  } = useForm({
    init: values,
    validate,
  });

  // Update offset when timezone changes
  useEffect(() => {
    if (TIMEZONE_OFFSET[formState.timezone.value]) {
      handleChange({
        target: {
          name: "offset",
          value: TIMEZONE_OFFSET[formState.timezone.value] / 60, // Set value in minutes
        },
      });
    }
  }, [formState.timezone.value]);

  // Custom handle submit to use form hook's handleSubmit
  const customHandleSubmit = (e) => {
    handleSubmit(e, ({ hasError, values }) => {
      if (!hasError) {
        handleClock(values); // State lifting
      }
    });
  };

  // Render ClockForm component
  return (
    <form onSubmit={customHandleSubmit}>
      <div>
        <label htmlFor="title">Enter Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formState.title.value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={!title}
        />
        {formState.title.touched && formState.title.error && (
          <div className="error">{formState.title.error}</div>
        )}
      </div>

      <div>
        <label htmlFor="timezone">Enter Timezone</label>
        <select
          id="timezone"
          name="timezone"
          value={formState.timezone.value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <option value="GMT">GMT</option>
          <option value="UTC">UTC</option>
          <option value="PST">PST</option>
          <option value="EST">EST</option>
          <option value="EDT">EDT</option>
          <option value="BST">BST</option>
          <option value="MST">MST</option>
        </select>
        {formState.timezone.touched && formState.timezone.error && (
          <div className="error">{formState.timezone.error}</div>
        )}
      </div>

      {(formState.timezone.value === "GMT" ||
        formState.timezone.value === "UTC") && (
        <div>
          <label htmlFor="offset">Enter Offset</label>
          <select
            id="offset"
            name="offset"
            value={formState.offset.value / 60} // Convert to minutes for display
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {getOffset().map((offset) => (
              <option key={offset} value={offset}>
                {offset}
              </option>
            ))}
          </select>
          {formState.offset.touched && formState.offset.error && (
            <div className="error">{formState.offset.error}</div>
          )}
        </div>
      )}

      <button type="submit">{edit ? "Update" : "Create"}</button>
    </form>
  );
};

export default ClockForm;

// import { useState, useEffect } from "react";
// import { TIMEZONE_OFFSET } from "../../../constants/timezone";
// import { getOffset } from "../../../utils/timezone";

// /**
//  * ClockForm component for creating and editing clocks.
//  *
//  * @param {Object} values - Initial form values
//  * @param {function} handleClock - Callback function to handle form submission
//  * @param {boolean} title - Flag to enable/disable title input
//  * @param {boolean} edit - Flag to indicate edit mode
//  *
//  * @returns {JSX.Element} - ClockForm component
//  */
// const ClockForm = ({
//   values = { title: "", timezone: "UTC", offset: 0 },
//   handleClock,
//   title = true,
//   edit = false,
// }) => {
//   // State for form values
//   const [formValues, setFormValues] = useState({ ...values });

//   console.log("clock form local --> ", title);

//   // Update offset when timezone changes
//   useEffect(() => {
//     if (TIMEZONE_OFFSET[formValues.timezone]) {
//       setFormValues((prev) => ({
//         ...prev,
//         offset: TIMEZONE_OFFSET[formValues.timezone],
//       }));
//     }
//   }, [formValues.timezone]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     let { name, value } = e.target;

//     if (name === "offset") {
//       value = Number(value) * 60; // Convert offset from minutes to seconds
//     }

//     setFormValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleClock(formValues); // State lifting
//   };

//   // Render ClockForm component
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="title">Enter Title</label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={formValues.title}
//           onChange={handleChange}
//           disabled={!title}
//         />
//       </div>

//       <div>
//         <label htmlFor="timezone">Enter Timezone</label>
//         <select
//           id="timezone"
//           name="timezone"
//           value={formValues.timezone}
//           onChange={handleChange}
//         >
//           <option value="GMT">GMT</option>
//           <option value="UTC">UTC</option>
//           <option value="PST">PST</option>
//           <option value="EST">EST</option>
//           <option value="EDT">EDT</option>
//           <option value="BST">BST</option>
//           <option value="MST">MST</option>
//         </select>
//       </div>

//       {(formValues.timezone === "GMT" || formValues.timezone === "UTC") && (
//         <div>
//           <label htmlFor="offset">Enter Offset</label>
//           <select
//             id="offset"
//             name="offset"
//             value={formValues.offset / 60}
//             onChange={handleChange}
//           >
//             {getOffset().map((offset) => (
//               <option key={offset} value={offset}>
//                 {offset}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       <button>{edit ? "Update" : "Create"}</button>
//     </form>
//   );
// };

// export default ClockForm;
