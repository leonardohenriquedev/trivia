export const SAVE_OPTIONS = 'SAVE_OPTIONS';
export const SAVE_ROUTE = 'SAVE_ROUTE';


export const saveOptions = (payload) => ({
  type: SAVE_OPTIONS,
  payload,
});

export const saveRoute = (payload) => ({
  type: SAVE_ROUTE,
  payload,
});

