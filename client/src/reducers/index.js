import { combineReducers } from 'redux';
import books from './books_reducer';
import user from './user_reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  books,
  user,
  form : formReducer
});

export default rootReducer;