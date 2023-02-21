import OrgsSignUpForm from "../components/orgsSignUp/OrgsSignUpForm";
import React, { useState } from 'react';
import {useNavigate, Routes, Route,} from "react-router-dom";



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<OrgsSignUpForm navigate={useNavigate()} />} />
      </Routes>
    </>
  )
};

export default App;





