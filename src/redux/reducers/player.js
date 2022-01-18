import { PLAYER_LOGIN, PLAYER_RESET, UPDATE_SCORE } from '../actions';

const INITITAL_STATE = {
  name: 'Leonardo',
  assertions: 0,
  score: 0,
  gravatarEmail: 'leonardomachado@hotmail.co.uk',
};

const playerReducer = (state = INITITAL_STATE, { type, payload }) => {
  switch (type) {
  case PLAYER_LOGIN:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case PLAYER_RESET:
    return INITITAL_STATE;
  case UPDATE_SCORE:
    return {
      ...state,
      score: payload.score,
      assertions: state.assertions + payload.assertion,
    };
  default:
    return state;
  }
};

export default playerReducer;
