// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import questions from './questions';

const rootReducer = combineReducers({
  questions,
  counter,
  router,
});

export default rootReducer;
