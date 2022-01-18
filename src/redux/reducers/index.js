import { combineReducers } from 'redux';
import configurationReducer from './configuration';
import playerReducer from './player';
import tokenReducer from './token';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  configuration: configurationReducer,
});

export default rootReducer;
