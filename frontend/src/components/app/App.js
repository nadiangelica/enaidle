import OrgSignUpForm from "../orgSignUp/OrgSignUpForm";
import OrgsLoginForm from "../orgLogin/OrgLoginForm";
import NewRequest from "../newRequest/NewRequest";
// import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<OrgSignUpForm navigate={useNavigate()} />} />
        <Route path="/login" element={<OrgsLoginForm navigate={useNavigate()} />} />
        <Route path="/new-request" element={<NewRequest navigate={useNavigate()} />} />
      </Routes>
    </>
  );
};

export default App;
