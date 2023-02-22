import OrgSignupPage from "../orgSignUp/OrgSignUpForm";
import OrgLoginPage from "../orgLogin/OrgLoginForm";
import NewRequest from "../newRequest/NewRequest";
import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<OrgSignupPage navigate={useNavigate()} />} />
        <Route path="/login" element={<OrgLoginPage navigate={useNavigate()} />} />
        <Route path="/new-request" element={<NewRequest navigate={useNavigate()} />} />
      </Routes>
    </>
  );
};

export default App;
