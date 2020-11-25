import { Item } from "commonlib/types";
import { StateAction,  SET_ALL, SET_FILTERED } from "store/app-state/types";

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
