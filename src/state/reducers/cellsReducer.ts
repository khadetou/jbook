import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import produce from "immer";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.MOVE_SELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return;
    case ActionTypes.DELETE_SELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return;
    case ActionTypes.INSERT_SELL_BEFORE:
      return state;
    case ActionTypes.UPDATE_SELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return;
    default:
      return state;
  }
});

export default reducer;
