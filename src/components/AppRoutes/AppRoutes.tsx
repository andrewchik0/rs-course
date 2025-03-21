import React from 'react';
import Header from '../Header/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import AboutPage from '../../pages/AboutPage/AboutPage';
import CreateCardPage from '../../pages/CreateCardPage/CreateCardPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

export default function AppRoutes() {
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
