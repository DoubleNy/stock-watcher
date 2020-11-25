import { AppState, StateAction, UPDATE } from "./types";

const initialState: AppState = {
  data: [],
};

export function appReducer(state = initialState, action: StateAction): AppState {
  console.log("appReducer");

  switch (action.type) {
    case UPDATE:
      return { data: action.payload };

    default:
      return {
        data: [],
        // data: [
        //   {
        //     "adjusted close": 38.62,
        //     close: 38.62,
        //     date: "2019-06-20",
        //     "dividend amount": 0,
        //     high: 42,
        //     low: 38.25,
        //     open: 38.5,
        //     "split coefficient": 1,
        //     volume: 137364203,
        //   },
        // ],
      };
  }
}
