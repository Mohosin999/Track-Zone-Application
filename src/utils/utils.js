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
export const mapValuesToState = (values) => {
  return Object.keys(values).reduce((acc, key) => {
    acc[key] = {
      value: values[key],
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
