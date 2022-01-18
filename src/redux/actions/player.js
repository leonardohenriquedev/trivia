export const PLAYER_LOGIN = 'PLAYER_LOGIN';
export const PLAYER_RESET = 'PLAYER_RESET';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const playerLogin = (payload) => ({
  type: PLAYER_LOGIN,
  payload,
});

export const playerReset = () => ({ type: PLAYER_RESET });

export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});
