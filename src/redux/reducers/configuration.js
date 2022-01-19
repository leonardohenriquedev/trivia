import { SAVE_OPTIONS, SAVE_ROUTE } from '../actions';

const INITIAL_STATE = {
  category: '',
  type: '',
  difficulty: '',
  fromLogin: false,
};

const configurationReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SAVE_OPTIONS:
      return payload;
    case SAVE_ROUTE:
      return {
        ...state,
        fromLogin: payload,
      };
    default:
      return state;
  }
};

export default configurationReducer;
