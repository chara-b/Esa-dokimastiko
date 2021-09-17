import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import actionsReducer from './actions';

export default history => // we can get this by this way -> store.getState and then console.log it
  combineReducers({
    router: connectRouter(history),
    state: actionsReducer
  });
