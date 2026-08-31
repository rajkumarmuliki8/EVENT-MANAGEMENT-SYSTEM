import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import MyPayments from './pages/MyPayments';
import AdminParticipants from './pages/AdminParticipants';
import AdminPayments from './pages/AdminPayments';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/events" element={
          <ProtectedRoute><Events /></ProtectedRoute>
        } />
        <Route path="/events/:id" element={
          <ProtectedRoute><EventDetail /></ProtectedRoute>
        } />
        <Route path="/events/create" element={
          <ProtectedRoute role={['admin', 'participant']}><CreateEvent /></ProtectedRoute>
        } />
        <Route path="/my-payments" element={
          <ProtectedRoute role="participant"><MyPayments /></ProtectedRoute>
        } />

        <Route path="/admin/participants" element={
          <ProtectedRoute role="admin"><AdminParticipants /></ProtectedRoute>
        } />
        <Route path="/admin/payments" element={
          <ProtectedRoute role="admin"><AdminPayments /></ProtectedRoute>
        } />
      </Routes>
    </>
  );
}
