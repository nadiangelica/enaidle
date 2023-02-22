import OrgsSignupPage from "../OrgsSignUp/OrgsSignUpForm";
import OrgsLoginPage from "../OrgsLogin/OrgsLoginForm";
import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<OrgsSignupPage navigate={useNavigate()} />} />
        <Route path="/login" element={<OrgsLoginPage navigate={useNavigate()} />} />
      </Routes>
    </>
  );
};

export default App;
