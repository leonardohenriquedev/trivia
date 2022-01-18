const { SAVE_TOKEN } = require('../actions/token');

const INITITAL_STATE = '';

const tokenReducer = (state = INITITAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_TOKEN:
    return payload;
  default:
    return state;
  }
};

export default tokenReducer;
