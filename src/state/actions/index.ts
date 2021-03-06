import { ActionTypes } from "../action-types";
import { CellTypes } from "../cell";

export type Direction = "up" | "down";
export interface MoveSellAction {
  type: ActionTypes.MOVE_SELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteSellAction {
  type: ActionTypes.DELETE_SELL;
  payload: string;
}

export interface InsertSellBeforeAction {
  type: ActionTypes.INSERT_SELL_BEFORE;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateSellAction {
  type: ActionTypes.UPDATE_SELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleCreatedAction {
  type: ActionTypes.BUNDLE_CREATED;
  payload: {
    code: string;
    err: string;
  };
}

export type Action =
  | MoveSellAction
  | DeleteSellAction
  | InsertSellBeforeAction
  | UpdateSellAction
  | BundleCreatedAction;
