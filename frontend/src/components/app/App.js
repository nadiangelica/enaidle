// import OrgsSignUpForm from "../components/orgsSignUp/OrgsSignUpForm";
import OrgsLoginForm from "../components/OrgsLogin/OrgsLoginForm";
import React, { useState } from 'react';
import {useNavigate, Routes, Route,} from "react-router-dom";



 const App = () => {
   return (
     <>
       <Routes>
         <Route path="/signup" element={<OrgsSignUpPage navigate={useNavigate()} />} />
         <Route path="/login" element={<OrgsLoginForm navigate={useNavigate()} />} />
       </Routes>
     </>
   )
 };

 export default App;
