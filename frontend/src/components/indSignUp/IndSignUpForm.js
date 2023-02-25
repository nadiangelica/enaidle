import React, { useState } from "react";

const IndSignUpForm = ({ navigate }) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PATCH, OPTIONS",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/indUsers", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: headers,
      body: JSON.stringify({
        firstName: firstName,
        surname: surname,
        email: email,
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

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

    return (
      <main>
        <h2 id='sign-up-title'>Sign up now!</h2>
        <div className="container">
          <form className='SignUpLoginForm' onSubmit={handleSubmit}>
            <div className="input-box">
              <label id='form_label' htmlFor='email'>First Name</label >
              <input className='form_field' id="first-name" type='text' value={ firstName } onChange={handleFirstNameChange} />
              <i></i>
            </div>

            <div className="input-box">
              <label id='form_label' htmlFor='email'>Last Name</label >
              <input className='form_field' id="surname" type='text' value={ surname } onChange={handleSurnameChange} />
              <i></i>
            </div>

            <div className="input-box">
              <label id='form_label' htmlFor='email'>Email Address</label >
              <input className='form_field' id="email" type='text' value={ email } onChange={handleEmailChange} />
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

export default IndSignUpForm;