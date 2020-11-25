import { act } from "react-dom/test-utils";
import { AppState, StateAction, UPDATE } from "./types";

const initialState: AppState = {
  data: [],
};

export function appReducer(state = initialState, action: StateAction): AppState {
  switch (action.type) {
    case UPDATE:
      return { data: action.payload };

    default:
      return state;
  }
}
