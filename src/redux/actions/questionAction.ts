import { Question } from '../../models/index';
import { ActionType } from '../actionTypes';
// ajax and APIs will be calling in here

interface Add {
  type: ActionType.ADD;
  payload: Pick<Question, 'id' | 'question' | 'answer'>;
}

interface Remove {
  type: ActionType.REMOVE;
  payload: { id: number };
}

interface Edit {
  type: ActionType.EDIT;
  // partial but with id & todo required
  payload: Pick<Question, 'id' | 'question' | 'answer'>;
}

export type Action = Add | Remove | Edit;
