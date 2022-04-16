import React, { useState, useEffect } from 'react';

// const App = (): JSX.Element => <div>Milad</div>;
// export default App;
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TribeClient } from '@tribeplatform/gql-client';
import * as actionCreators from './redux/actionCreators/todoActionCreator';
import InputField from './container/InputField';
import TodoList from './container/TodoList';
import { Todo } from './models/index';
import { State } from './redux/reducers/index';

const App = (): JSX.Element => {
  // Redux setting hooks
  const dispatch = useDispatch();
  const { addTodo, doneTodo, removeTodo, editTodo } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const todoState = useSelector((state: State) => state.todo); // State

  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(todoState);

  useEffect(() => {
    setTodos(todoState);
  }, [todoState]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      addTodo(todo);
      setTodo('');
    }
  };

  const client = new TribeClient({
    graphqlUrl: 'https://app.tribe.so/graphql',
  });

  const getAccessToken = async (usernameOrEmail: string, password: string) => {
    // const guestTokens = await client.getTokens(
    //   { networkDomain: 'milix.tribeplatform.com' },
    //   'basic'
    // );
    // client.setToken(guestTokens.accessToken);

    // const { accessToken, refreshToken } = await client.auth.login(
    //   {
    //     input: { usernameOrEmail, password },
    //   },
    //   'basic'
    // );

    // console.log({ accessToken, refreshToken });
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im43U3V3RVlJOTUiLCJuZXR3b3JrSWQiOiJUb2VoaTQ1RkluIiwibmV0d29ya0RvbWFpbiI6Im1pbGl4LnRyaWJlcGxhdGZvcm0uY29tIiwidG9rZW5UeXBlIjoiVVNFUiIsImVudGl0eUlkIjpudWxsLCJwZXJtaXNzaW9uQ29udGV4dCI6bnVsbCwicGVybWlzc2lvbnMiOm51bGwsInNlc3Npb25JZCI6Ill3VUtoS29oS055S2NCTmFmb1JvY3RzTklXdlhzc01vcUJJSlJUREk1eHo4WjYxa1lwIiwiaWF0IjoxNjQ4NjM3NzQ4LCJleHAiOjE2NTEyMjk3NDh9.5xoFRH_bkcIunIloD3Jbg60Bv4OKLAS4nL7mydbunwQ';
    client.spaces.list({ limit: 5 }, 'basic', accessToken).then((spaces) => {
      console.log('List of 5 spaces:', spaces);
    });
  };
  getAccessToken('milad.maleki.m@gmail.com', '2398OgiOgi!@#');

  return (
    <div className="App">
      <span className="heading">Todo List</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        doneTodo={doneTodo}
        removeTodo={removeTodo}
        editTodo={editTodo}
      />
    </div>
  );
};

export default App;
