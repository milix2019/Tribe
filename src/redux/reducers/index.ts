import { combineReducers } from 'redux';
import questionReducer from './questionReducer';

// Combine all reducers.
const rootReducer = combineReducers({
  question: questionReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
