import React, { useState, useRef, useEffect } from 'react';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Question } from '../../models';
import { Action } from '../../redux/actions';
import EmptyPlaceHolder from '../../assets/emptyPlaceholder.svg';
import Tooltip from '../Tooltip/Tooltip';

interface Props {
  questions: Array<Question>;
  editQuestion: (question: Question) => (dispatch: Dispatch<Action>) => void;
  removeQuestion: (id: number) => (dispatch: Dispatch<Action>) => void;
}

const Middle = ({
  editQuestion,
  removeQuestion,
  questions,
}: Props): JSX.Element => {
  const [questionData, setQuestionData] = useState<Array<Question>>(questions);
  // the search result's data
  const [search, setSearch] = useState<Question[]>([]);
  // the actual search params
  const [searchVal, setSearchVal] = useState<string>('');
  const [sort, setSort] = useState<string>('oldest');
  const [selectedID, setSelectedID] = useState<number>();
  const [edit, setEdit] = useState<boolean>(false);
  const [editStateQuestion, setEditStateQuestion] = useState<Question>({
    id: Date.now(),
    answer: '',
    question: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setQuestionData(questions);
  }, [edit, questions]);

  // user click on edit
  const handleEdit = (id: number) => {
    // edit section preparation
    if (!edit) {
      const singleItem = questionData.find((d) => d.id === id);
      setEditStateQuestion(singleItem as Question);
      setEdit(true);
      setSelectedID(id);
    } else {
      // save section preparation
      editQuestion({
        id: id,
        answer: editStateQuestion.answer,
        question: editStateQuestion.question,
      });
      setEdit(false);
    }
  };

  // user remove the question
  const handleRemove = (id: number) => {
    if (edit) {
      setEdit(false);
    } else {
      removeQuestion(id);
    }
  };

  // sorting section
  const handleSort = (e: React.FormEvent) => {
    const { id } = e.target as HTMLInputElement;
    setSort(id);

    switch (id) {
      case 'newest':
        setQuestionData(
          questionData.sort((a, b) => {
            if (a.id > b.id) {
              return -1;
            }
            if (a.id < b.id) {
              return 1;
            }
            // a must be equal to b
            return 0;
          })
        );
        break;
      case 'oldest':
        setQuestionData(
          questionData.sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            // a must be equal to b
            return 0;
          })
        );
        break;
      case 'alphabet':
        setQuestionData(
          questionData.sort((a, b) => a.question.localeCompare(b.question))
        );
        break;

      default:
        break;
    }
  };

  // when user search for question
  const handleSearch = (e: React.FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    // to find those questions which user search
    const filterResult = questionData.filter((d) => d.question.includes(value));
    setSearch(filterResult);
    setSearchVal(value);
  };

  // when user click on question
  const toggleAnswer = (d: number) => {
    const currentStyle = document.getElementById(`body-${d}`);
    // return if its null
    if (!currentStyle) return;
    // toggle the visibility
    if (
      currentStyle?.style.display === 'none' ||
      currentStyle?.style.display === ''
    ) {
      currentStyle.style.display = 'block';
    } else {
      currentStyle.style.display = 'none';
    }
  };

  return (
    <div className="middleContainer">
      <div className="section-header">
        <input
          type="text"
          className="search-question"
          placeholder="Search by question title"
          onChange={handleSearch}
        />
        <Link className="primary-button add-button" to="/add">
          Add
        </Link>
        <div className="text-header">
          Questions
          <Tooltip text=" Here you can find the created questions and their answers" />
        </div>
        <div className="text-body">
          Be specific and imagine you’re asking a question to another person!
        </div>
        <div className="sort-container">
          <div className={`oldest ${sort === 'oldest' ? 'active' : ''}`}>
            <button id="oldest" className="old-title" onClick={handleSort}>
              Oldest
            </button>
          </div>
          <div className={`newest ${sort === 'newest' ? 'active' : ''}`}>
            <button id="newest" className="new-title" onClick={handleSort}>
              Newest
            </button>
          </div>
          <div className={`alphabet ${sort === 'alphabet' ? 'active' : ''}`}>
            <button
              id="alphabet"
              className="alphabet-title"
              onClick={handleSort}
            >
              Alpha
            </button>
          </div>
        </div>
      </div>
      {questionData.length === 0 ||
      (searchVal.length > 0 && search.length === 0) ? (
        <div className="noData">
          <img src={EmptyPlaceHolder} alt="img" />
          <span>There is no data at the moment.</span>
        </div>
      ) : (
        (search.length > 0 ? search : questionData)?.map((d) => (
          <div key={d.id} className="section-body">
            <div className="item-body">
              {edit && selectedID === d.id ? (
                <div className="editable-container">
                  <input
                    value={editStateQuestion.question}
                    onChange={(e) =>
                      setEditStateQuestion({
                        id: Date.now(),
                        answer: editStateQuestion.answer,
                        question: e.target.value,
                      })
                    }
                    className="question-edit"
                    ref={inputRef}
                  />
                  <textarea
                    defaultValue={editStateQuestion.answer}
                    onChange={(e) =>
                      setEditStateQuestion({
                        id: Date.now(),
                        answer: e.target.value,
                        question: editStateQuestion.question,
                      })
                    }
                    className="answer-edit"
                  ></textarea>
                </div>
              ) : (
                <>
                  <div
                    className="text-header"
                    onClick={() => toggleAnswer(d.id)}
                    onKeyPress={() => toggleAnswer}
                    role="button"
                    tabIndex={0}
                  >
                    {d.question}
                  </div>
                  <div id={`body-${d.id}`} className="text-body">
                    {d.answer}
                  </div>
                </>
              )}
              <div className="feature-body">
                <button className="edit" onClick={() => handleEdit(d.id)}>
                  {edit && selectedID === d.id ? 'save' : 'edit'}
                </button>
                <button className="remove" onClick={() => handleRemove(d.id)}>
                  {edit && selectedID === d.id ? 'cancel' : 'remove'}
                </button>
              </div>
              <div className="fromnow">
                Posted about {moment(d.id).fromNow()}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Middle;
