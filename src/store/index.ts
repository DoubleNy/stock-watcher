import { createStore } from "redux";
import { appReducer } from "./app-state/reducers";

const store = createStore(appReducer);

export type StoreState = ReturnType<typeof appReducer>;
export default store;
