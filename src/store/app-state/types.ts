import { Item } from "commonlib/types";

export type AppState = {
  allData: Item[];
  filteredData: Item[]
};

export const SET_ALL = "SET_ALL";
export const SET_FILTERED = "SET_FILTERED";

type SetAll = {
  type: typeof SET_ALL;
  payload: Item[];
};

type SetFiltered = {
  type: typeof SET_FILTERED;
  payload: Item[];
};

export type StateAction = SetAll | SetFiltered;
