import { State } from "./initialState";
function reducer(state = State, action) {
  switch (action.type) {
    case "PAPPER-SETTING":
      return { ...state };
      break;
    default:
      break;
  }
}

export default reducer;
