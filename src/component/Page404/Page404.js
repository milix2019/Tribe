/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page404() {
  const history = useNavigate();
  return (
    <div className="Page404">
      <div className="page-content text-center">
        <img src={require('../../assets/image404.svg')} alt="" />
        <h4 className="mt-2">Oops, you've lost</h4>
        <p>We can't find the page that you're looking for...</p>
        <button className="primary-button goBack" onClick={() => history(-1)}>
          Go back
        </button>
      </div>
    </div>
  );
}
