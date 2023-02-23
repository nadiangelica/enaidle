import React, { useState } from "react";
// import './OrgSignUpForm.css';

const OrgSignUpForm = ({ navigate }) => {
  const [organisationName, setOrganisationName] = useState("");
  const [email, setEmail] = useState("");
  const [charityNumber, setCharityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PATCH, OPTIONS",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/orgUsers", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: headers,
      body: JSON.stringify({
        organisationName: organisationName,
        email: email,
        charityNumber: charityNumber,
        password: password,
      })
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
    }

    if (response.ok) {
      navigate("/login");
      setError(null);
      console.log("Request Submitted");
    }
  };

  const handleOrganisationNameChange = (event) => {
    setOrganisationName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCharityNumberChange = (event) => {
    setCharityNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <main>
        <h2 id='sign-up-title'>Sign up now!</h2>
        <div className="container">
          <form className='signUpLoginForm' onSubmit={handleSubmit}>
            <div className="input-box">
              <label id='form_label' htmlFor='email'>Organisation Name</label >
              <input className='form_field' id="organisation-name" type='text' value={ organisationName } onChange={handleOrganisationNameChange} />
              <i></i>
            </div>

            <div className="input-box">
              <label id='form_label' htmlFor='email'>Email Address</label >
              <input className='form_field' id="email" type='text' value={ email } onChange={handleEmailChange} />
              <i></i>
            </div>

            <div className="input-box">
              <label id='form_label' htmlFor='email'>Charity Number (if applicable)</label >
              <input className='form_field' id="charity-number" type='text' value={ charityNumber } onChange={handleCharityNumberChange} />
              <i></i>

            </div>
            <div className="input-box">
              <label id='form_label' htmlFor='password'>Password</label>
              <input className='form_field' id="password" type='password' value={ password } onChange={handlePasswordChange} />
              <i></i>
            </div> 
            <input id='submit' type="submit" value="Sign Up" />
          </form>
          {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
};

export default OrgSignUpForm;
