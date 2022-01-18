import { getUserToken, saveToLocalStorage } from '../../services';

const FETCH_TOKEN = 'FETCH_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';

const saveToken = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  dispatch({ type: FETCH_TOKEN });
  const token = await getUserToken();
  saveToLocalStorage('token', token);
  return dispatch(saveToken(token));
};
