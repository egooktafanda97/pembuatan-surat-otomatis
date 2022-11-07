import { State } from "./initialState";
function reducer(state = State, action) {
  switch (action.type) {
    case "PAPPER-SETTING":
      localStorage.setItem(
        "config",
        JSON.stringify(
          JSON.parse(localStorage.getItem("config")) != undefined
            ? {
                ...JSON.parse(localStorage.getItem("config")),
                ...state,
                papperSetting: PapperSet(action),
              }
            : {
                ...state,
                papperSetting: PapperSet(action),
              }
        )
      );
      return { ...state, papperSetting: PapperSet(action) };
      break;
    default:
      break;
  }
}

export default reducer;
