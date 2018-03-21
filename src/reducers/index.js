import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

// the "form" property of state is going to be produced by redux-form reducer
const rootReducer = combineReducers({
  form
});

export default rootReducer;
