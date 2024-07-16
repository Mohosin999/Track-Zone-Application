// What is the purpose of mapValuesToState() function?

// Get an object and modify it look like below:
// Object -
// const obj = {
//     title: "",
//     bio:""
// }

// Modified object -
// const modifiedObj = {
//     title: {
//         value: "",
//         error: "",
//         focused: false,
//         touched: false,
//     },
//     bio: {
//         value: "",
//         error: "",
//         focused: false,
//         touched: false,
//     }
// }
export const mapValuesToState = (values, shouldClear = false) => {
  return Object.keys(values).reduce((acc, key) => {
    acc[key] = {
      value: shouldClear ? "" : values[key],
      error: "",
      focused: false,
      touched: false,
    };
    return acc;
  }, {});
};

// Function to get key from state
export const mapStateToKeys = (state, key) => {
  return Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur][key];
    return acc;
  }, {});
};

// Object deep clone function
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Function to check the object is empty or not
export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
