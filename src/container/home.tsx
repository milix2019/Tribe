import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TribeClient } from '@tribeplatform/gql-client';
import * as actionCreators from '../redux/actionCreators/questionActionCreator';
import { State } from '../redux/reducers/index';
import Left from '../component/Left/Left';
import Middle from '../component/Middle/Middle';
import Right from '../component/Right/Right';
import { Question } from '../models/index';

interface TribeProp {
  id: string;
  name: string;
}

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im43U3V3RVlJOTUiLCJuZXR3b3JrSWQiOiJUb2VoaTQ1RkluIiwibmV0d29ya0RvbWFpbiI6Im1pbGl4LnRyaWJlcGxhdGZvcm0uY29tIiwidG9rZW5UeXBlIjoiVVNFUiIsImVudGl0eUlkIjpudWxsLCJwZXJtaXNzaW9uQ29udGV4dCI6bnVsbCwicGVybWlzc2lvbnMiOm51bGwsInNlc3Npb25JZCI6Ill3VUtoS29oS055S2NCTmFmb1JvY3RzTklXdlhzc01vcUJJSlJUREk1eHo4WjYxa1lwIiwiaWF0IjoxNjQ4NjM3NzQ4LCJleHAiOjE2NTEyMjk3NDh9.5xoFRH_bkcIunIloD3Jbg60Bv4OKLAS4nL7mydbunwQ';

const client = new TribeClient({
  graphqlUrl: 'https://app.tribe.so/graphql',
  accessToken: accessToken,
});
// client.setToken(accessToken);

const Home = (): JSX.Element => {
  // Redux setting hooks
  const dispatch = useDispatch();
  const { editQuestion, removeQuestion } = bindActionCreators(
    actionCreators,
    dispatch
  );
  // get the state
  const questionState = useSelector((state: State) => state.question);
  // define states
  const [questions, setQuestions] = useState<Question[]>(questionState);
  const [spaces, setSpaces] = useState<TribeProp[]>([]);
  const [posts, setPosts] = useState<TribeProp[]>([]);

  // get spaces and posts from tribe
  const getAllPost = () => {
    client.spaces.list({ limit: 5 }, 'basic').then((spaces) => {
      const { nodes } = spaces;
      // return if its null
      if (!nodes) return;
      setSpaces(nodes);
      console.log('List of 5 spaces:', nodes);
    });
    client.posts.listPostTypes({ limit: 5 }, 'basic').then((posts) => {
      const { nodes } = posts;
      // return if its null
      if (!nodes) return;
      setPosts(nodes);
      console.log('List of 5 spaces:', nodes);
    });
  };

  useEffect(() => {
    getAllPost();
    setQuestions(questionState);
  }, [questions, questionState]);

  // console.log(questions);
  return (
    <div className="mainContainer">
      <div className="bodyContainer">
        <Left />
        <div className="content">
          <Middle
            questions={questions}
            editQuestion={editQuestion}
            removeQuestion={removeQuestion}
          />
          <Right spaces={spaces} posts={posts} />
        </div>
      </div>
    </div>
  );
};
export default Home;
