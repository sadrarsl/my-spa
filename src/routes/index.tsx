import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Login from '../pages/Login/Login';
import PrivatePage from '../pages/PrivatePage/PrivatePage';
import AuthGuard from './AuthGuard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/private"
        element={
          <AuthGuard>
            <PrivatePage />
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
