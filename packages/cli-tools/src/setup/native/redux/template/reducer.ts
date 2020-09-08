export const generateReducer = () => `import { combineReducers } from "@reduxjs/toolkit";

import counter from "./features/counter";

const reducer = combineReducers({
  counter,
});

export default reducer;
`;

export default generateReducer;
