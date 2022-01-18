import { SAVE_OPTIONS } from '../actions';

const INITIAL_STATE = {
  category: '',
  type: '',
  difficulty: '',
};

const configurationReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_OPTIONS:
    return payload;
  default:
    return state;
  }
};

export default configurationReducer;
