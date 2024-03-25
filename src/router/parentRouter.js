import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRouter from '../components/admin/AdminRouter';
import AuthRouter from '../components/auth/AuthRouter';
// import NotFound from './NotFound'; // Assuming NotFound component exists

const ParentRouter = () =>{
  return (
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/auth/*" element={<AuthRouter />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
  );
}
export default ParentRouter;
