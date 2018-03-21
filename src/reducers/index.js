import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

//authReducer produce auth piece of state

// the "form" property of state is going to be produced by redux-form reducer
const rootReducer = combineReducers({
  form,
  auth: authReducer

});

export default rootReducer;
