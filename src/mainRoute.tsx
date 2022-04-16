import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './container/home';
import Page404 from './component/Page404/Page404';
import Navbar from './component/Navbar/Navbar';
import AddContent from './component/AddContent/AddContent';

const mainRoute = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddContent />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default mainRoute;
