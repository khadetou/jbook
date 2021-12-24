import { CellTypes } from "./../cell";
import { ActionTypes } from "../action-types";
import {
  UpdateSellAction,
  MoveSellAction,
  DeleteSellAction,
  InsertSellBeforeAction,
} from "./../actions/index";
export const updateCell = (id: string, content: string): UpdateSellAction => {
  return {
    type: ActionTypes.UPDATE_SELL,
    payload: {
      id,
      content,
    },
  };
};
export const moveCell = (
  id: string,
  direction: "up" | "down"
): MoveSellAction => {
  return {
    type: ActionTypes.MOVE_SELL,
    payload: {
      id,
      direction,
    },
  };
};
export const deleteCell = (id: string): DeleteSellAction => {
  return {
    type: ActionTypes.DELETE_SELL,
    payload: id,
  };
};
export const insertCellBefore = (
  id: string,
  cellType: CellTypes
): InsertSellBeforeAction => {
  return {
    type: ActionTypes.INSERT_SELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
