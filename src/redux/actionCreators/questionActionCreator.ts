import { ActionType } from '../actionTypes';
import { Dispatch } from 'redux';
import { Action } from '../actions';
import { Question } from '../../models';

export const addQuestion = (question: Question) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD,
      payload: question,
    });
  };
};

export const removeQuestion = (id: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVE,
      payload: { id: id },
    });
  };
};

export const editQuestion = (question: Question) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.EDIT,
      payload: question,
    });
  };
};
