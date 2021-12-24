import { ActionTypes } from "../action-types";
import { CellTypes } from "../cell";

interface MoveSellAction {
  type: ActionTypes.MOVE_SELL;
  payload: {
    id: string;
    direction: "up" | "down";
  };
}

interface DeleteSellAction {
  type: ActionTypes.DELETE_SELL;
  payload: string;
}

interface InsertSellBeforeAction {
  type: ActionTypes.INSERT_SELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  };
}

interface UpdateSellAction {
  type: ActionTypes.UPDATE_SELL;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | MoveSellAction
  | DeleteSellAction
  | InsertSellBeforeAction
  | UpdateSellAction;
