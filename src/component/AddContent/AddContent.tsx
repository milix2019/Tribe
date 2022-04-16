import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Question } from '../../models';
import * as actionCreators from '../../redux/actionCreators/questionActionCreator';
import Collapse from '../Collapse/Collapse';
import Tooltip from '../Tooltip/Tooltip';

const AddContent = (): JSX.Element => {
  // Redux setting hooks
  const dispatch = useDispatch();
  const { addQuestion } = bindActionCreators(actionCreators, dispatch);
  const history = useNavigate();
  const [formData, setFormData] = useState<Question>({
    id: Date.now(),
    question: '',
    answer: '',
  });
  const [formValidation, setFormValidation] = useState<{
    [key: string]: boolean;
  }>({
    question: true,
    answer: true,
  });
  // for delay checkbox
  const [check, setCheck] = useState<boolean>(false);
  // flag to use for submit
  const [flag, setFlag] = useState(false);

  //validate all form values
  const validate = () => {
    let hasError = false;
    const validation: { [key: string]: string | boolean } = {
      ...formValidation,
    };
    if (
      !!formData.question === false ||
      (formData.question as string).trim().length === 0
    ) {
      validation.question = false;
      hasError = true;
    } else {
      validation.question = true;
    }

    if (
      !!formData.answer === false ||
      (formData.answer as string).trim().length === 0
    ) {
      validation.answer = false;
      hasError = true;
    } else {
      validation.answer = true;
    }

    setFormValidation(validation as { [key: string]: boolean });
    return !hasError;
  };

  //handle all inputs changes
  const handleOnChange = (event: React.FormEvent) => {
    const target = event.target as HTMLTextAreaElement;
    const { value } = target;
    const name = target.name;
    const req = target.required;
    const data: { [key: string]: string } = {};
    data[name as keyof Question] = value;

    if (req)
      if (value.trim().length === 0) {
        //if the user remove input value
        const validation = {} as { [key: string]: boolean };
        validation[name as keyof Question] = false;
        setFormValidation({ ...formValidation, ...validation });
      } else {
        const validation = {} as { [key: string]: boolean };
        validation[name as keyof Question] = true;
        setFormValidation({ ...formValidation, ...validation });
      }
    setFormData({ ...formData, ...data });
  };

  // when user submit
  const handleSaveQues = () => {
    if (validate()) {
      if (check) {
        setFlag(true);
        setTimeout(() => {
          setFlag(false);
          // pass to redux
          addQuestion(formData);
          // go back main page
          history(-1);
        }, 5000);
      } else {
        addQuestion(formData);
        history(-1);
      }
    }
  };

  return (
    <div className="addContentContainer">
      <div className="header">
        <div className="headline">
          Ask a public question
          <Tooltip text="Here you can create new questions and answers" />
        </div>
      </div>
      <div className="body-container">
        <div className="card-body">
          <div className="title-question-container">
            <div className="title-question-label">
              Title
              <Tooltip text="Here you can add your desire question" />
            </div>
            <div className="title-question-desc">
              Be specific and imagine you’re asking a question to another person
            </div>
            <div className="title-question-input">
              <input
                value={formData.question as string}
                required={true}
                type="text"
                name="question"
                className={`form-control ${
                  formValidation.question ? '' : 'inputNotValid'
                }`}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="body-question-container">
            <div className="body-question-label">
              Body
              <Tooltip text="Here you can add your desire answer" />
            </div>
            <div className="body-question-desc">
              Include all the information someone would need to answer your
              question
            </div>
            <div className="body-question-textarea">
              <textarea
                defaultValue={formData.answer as string}
                className={`form-control ${
                  formValidation.answer ? '' : 'inputNotValid'
                }`}
                required={true}
                name="answer"
                id="body-text"
                onChange={handleOnChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="card-side">
          <Collapse />
        </div>
      </div>
      <button
        className={`primary-button save-question ${flag ? 'loading' : ''}`}
        onClick={handleSaveQues}
        disabled={flag}
      >
        Save Question
      </button>
      <button
        className="inverse_button save-question"
        onClick={() => history(-1)}
        disabled={flag}
      >
        Cancel
      </button>
      <input
        className="checkboxInput"
        type="checkbox"
        onChange={() => setCheck(!check)}
        checked={check}
      />
      <label htmlFor="checkbox">Check for 5(s) delay</label>
    </div>
  );
};
export default AddContent;
