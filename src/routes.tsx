import React from 'react';

import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import CreateCardPage from './pages/CreateCardPage/CreateCardPage';
import AboutPage from './pages/AboutPage/AboutPage';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/create-card',
    element: <CreateCardPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
