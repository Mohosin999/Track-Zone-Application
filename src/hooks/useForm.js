import { useState } from "react";
import {
  mapValuesToState,
  mapStateToKeys,
  deepClone,
  isObjEmpty,
} from "../utils/utils";

/**
 * Custom reusable form hook.
 *
 * @param {Object} init
 * @param {Object|boolean} validate
 * @returns
 */
const useForm = ({ init, validate }) => {
  const [state, setState] = useState(mapValuesToState(init));

  const handleChange = (e) => {
    const { name: key, value } = e.target;

    const oldState = deepClone(state);
    if (type === "checkbox") {
      oldState[key].value = "checked";
    } else {
      oldState[key].value = value;
    }

    const { errors } = getErrors();

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }
    setState(oldState);
  };

  // Function to get errors
  const getErrors = () => {
    let hasError = null,
      errors = null;

    const values = mapStateToKeys(state, "value");

    if (typeof validate === "boolean") {
      hasError = validate;
      errors = mapStateToKeys(state, "error");
    } else if (typeof validate === "function") {
      const errorsFromCb = validate(values);
      hasError = !isObjEmpty(errorsFromCb);
      errors = errorsFromCb;
    } else {
      throw new Error("validate property must be boolean or function");
    }

    return {
      hasError,
      errors,
      values,
    };
  };

  return {
    formState: state,
    handleChange,
  };
};

export default useForm;
