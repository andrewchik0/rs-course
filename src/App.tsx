import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CreateCardPage from './pages/CreateCardPage/CreateCardPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create-card" element={<CreateCardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
