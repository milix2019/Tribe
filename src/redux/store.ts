import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import { Action } from './actions/index';
import rootReducer, { State } from './reducers';

type dispatchType = ThunkDispatch<State, any, Action>;

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware<dispatchType, any>(
      thunk as ThunkMiddleware<State, Action, any>
    )
    // other store enhancers if any
  )
);

export { store };
