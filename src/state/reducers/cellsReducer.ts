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
      return {
        ...state,
      };
    case ActionTypes.DELETE_SELL:
      return state;
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
