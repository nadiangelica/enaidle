import OrgsSignupPage from "../orgsSignUp/OrgsSignUpForm";
import OrgsLoginPage from "../orgsLogin/OrgsLoginForm";
import NewRequest from "../newRequest/NewRequest";
import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={<OrgsSignupPage navigate={useNavigate()} />}
        />
        <Route
          path="/login"
          element={<OrgsLoginPage navigate={useNavigate()} />}
        />
        <Route
          path="/add-request"
          element={<NewRequest navigate={useNavigate()} />}
        />
      </Routes>
    </>
  );
};

export default App;
