import { Question } from '../../models/index';
import { Action } from '../actions';
import { ActionType } from '../actionTypes';

const initialState: Question[] = [];

const reducer = (
  state: Question[] = initialState,
  action: Action
): Question[] => {
  const { type } = action;
  switch (type) {
    case ActionType.ADD: {
      const { payload } = action;
      return [
        ...state,
        {
          id: Date.now(),
          question: payload.question,
          answer: payload.answer,
        },
      ];
    }
    case ActionType.REMOVE: {
      const { payload } = action;
      return state.filter((d) => d.id !== payload.id);
    }
    case ActionType.EDIT: {
      const { payload } = action;
      return state.map((d) =>
        d.id === payload.id
          ? { ...d, answer: payload.answer, question: payload.question }
          : d
      );
    }

    default:
      return state;
  }
};

export default reducer;
