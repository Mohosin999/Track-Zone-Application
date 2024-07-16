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
    let { name, value } = e.target;

    if (name === "offset") {
      value = Number(value) * 60; // Convert offset from minutes to seconds
    }

    const oldState = deepClone(state);
    if (type === "checkbox") {
      oldState[name].value = "checked";
    } else {
      oldState[name].value = value;
    }

    const { errors } = getErrors();

    if (oldState[name].touched && errors[name]) {
      oldState[name].error = errors[name];
    } else {
      oldState[name].error = "";
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

  const handleFocus = (e) => {
    const { name } = e.target;

    const oldState = deepClone(state);
    oldState[name].focused = true;

    if (!oldState[name].touched) {
      oldState[name].touched = true;
    }

    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;

    const { errors } = getErrors();
    const oldState = deepClone(state);

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }

    oldState[key].focused = false;
    setState(oldState);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const { errors, hasError, values } = getErrors();

    cb({
      hasError,
      errors,
      values,
      touched: mapStateToKeys(state, "touched"),
      focused: mapStateToKeys(state, "focused"),
    });
  };

  const clear = () => {
    const newState = mapValuesToState(init, true);
    setState(newState);
  };

  return {
    formState: state,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    clear,
  };
};

export default useForm;
