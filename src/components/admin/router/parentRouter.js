import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminRouter from '../AdminRouter';
// import NotFound from './NotFound'; // Assuming NotFound component exists

const ParentRouter = () =>{
  return (
      <Routes>
        <Route path="/admin/*" element={<AdminRouter />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
  );
}
export default ParentRouter;
