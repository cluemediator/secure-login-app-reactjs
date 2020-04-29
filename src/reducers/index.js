import { combineReducers } from 'redux';
import auth from './authReducer';

// to combine all reducers together
const appReducer = combineReducers({
  auth
});

export default appReducer;