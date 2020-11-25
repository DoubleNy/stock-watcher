import { Item } from "components/Chart";

export type AppState = {
  data: Item[];
};

export const UPDATE = "UPDATE";

type Update = {
  type: typeof UPDATE;
  payload: Item[];
};

export type StateAction = Update;
