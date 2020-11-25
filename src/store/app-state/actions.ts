import { StateAction,  SET_ALL, SET_FILTERED } from "./types";
import { Item } from "components/Chart";

export function setAllData(data: Item[]): StateAction {
  return {
    type: SET_ALL,
    payload: data,
  };
}

export function setFilteredData(data: Item[]): StateAction {
  return {
    type: SET_FILTERED,
    payload: data,
  };
}
