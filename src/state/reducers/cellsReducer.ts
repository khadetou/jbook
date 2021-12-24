import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

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

const reducer = (
  state: CellState = initialState,
  action: Action
): CellState => {
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
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: {
            ...state.data[action.payload.id],
            content: action.payload.content,
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
