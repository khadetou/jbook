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
      return state;
    case ActionTypes.DELETE_SELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    case ActionTypes.INSERT_SELL_BEFORE:
      const cell: Cell = {
        content: "",
        code: action.payload.type,
        id: randomId(),
      };
      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );
      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id);
      }
      return state;
    case ActionTypes.UPDATE_SELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    default:
      return state;
  }
});

const randomId = (): string => {
  return Math.random().toString(36).substring(2, 7);
};

export default reducer;
