import { StateAction, UPDATE } from "./types";
import { Item } from "components/Chart";

export function update(data: Item[]): StateAction {
  return {
    type: UPDATE,
    payload: data,
  };
}
