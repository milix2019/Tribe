import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Provider as TribeProvider } from '@tribeplatform/react-sdk';
import MainRoutes from './mainRoute';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im43U3V3RVlJOTUiLCJuZXR3b3JrSWQiOiJUb2VoaTQ1RkluIiwibmV0d29ya0RvbWFpbiI6Im1pbGl4LnRyaWJlcGxhdGZvcm0uY29tIiwidG9rZW5UeXBlIjoiVVNFUiIsImVudGl0eUlkIjpudWxsLCJwZXJtaXNzaW9uQ29udGV4dCI6bnVsbCwicGVybWlzc2lvbnMiOm51bGwsInNlc3Npb25JZCI6Ill3VUtoS29oS055S2NCTmFmb1JvY3RzTklXdlhzc01vcUJJSlJUREk1eHo4WjYxa1lwIiwiaWF0IjoxNjQ4NjM3NzQ4LCJleHAiOjE2NTEyMjk3NDh9.5xoFRH_bkcIunIloD3Jbg60Bv4OKLAS4nL7mydbunwQ';

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <MainRoutes />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TribeProvider
        config={{
          accessToken: accessToken,
          baseUrl: 'https://app.tribe.so/graphql',
        }}
      >
        <MainRoutes />
      </TribeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
