import { AppState, StateAction, SET_ALL, SET_FILTERED} from "./types";

const initialState: AppState = {
  allData: [],
  filteredData: [],
};

export function appReducer(state = initialState, action: StateAction): AppState {
  switch (action.type) {
    case SET_ALL:
      return { allData: action.payload, filteredData: [] };

    case SET_FILTERED: 
      return {...state, filteredData: action.payload}

    default:
      return state;
  }
}
