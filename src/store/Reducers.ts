import { ACTIONS } from "./Actions";

const reducers = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.USER:
      return {
        ...state,
        user: payload,
      };
    case ACTIONS.TOKEN:
      return {
        ...state,
        token: payload,
      };
    case ACTIONS.PAGELOADING:
      return {
        ...state,
        pageloading: payload,
      };

    default:
      return state;
  }
};

export default reducers;
