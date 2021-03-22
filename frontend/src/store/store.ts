import { combineReducers, createStore, applyMiddleware } from 'redux';
import thingsReducer from './things/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  data: thingsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));
