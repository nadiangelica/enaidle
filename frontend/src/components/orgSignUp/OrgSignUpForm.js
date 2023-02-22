import React, { useState } from 'react';
// import './OrgsSignUpForm.css';

const OrgsSignUpForm = ({ navigate }) => {

  const [organisationName, setOrganisationName] = useState("");
  const [email, setEmail] = useState("");
  const [charityNumber, setCharityNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // '/users' to be amended when we have clarity of route path for backend
    const response = await fetch('/users', {
      method: 'POST',
      body: JSON.stringify({organisationName: organisationName, email: email, charityNumber: charityNumber, password: password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.message)
    }

    if (response.ok) {
      navigate('/login')
      setError(null)
      console.log('Request Submitted')
    }
  }

  const handleOrganisationNameChange = (event) => {
    setOrganisationName(event.target.value)
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleCharityNumberChange = (event) => {
    setCharityNumber(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


    return (
      <main>
        <h2 id='sign-up-title'>Sign up now!</h2>
        <div className="container">
          <form className='signUpLoginForm' onSubmit={handleSubmit}>
            <div className="input-box">
              <input className='form_field' id="organisation-name" type='text' value={ organisationName } onChange={handleOrganisationNameChange} />
              <label id='form_label' htmlFor='email'>Organisation Name</label >
              <i></i>
            </div>

            <div className="input-box">
              <input className='form_field' id="email" type='text' value={ email } onChange={handleEmailChange} />
              <label id='form_label' htmlFor='email'>Email</label >
              <i></i>
            </div>

            <div className="input-box">
              <input className='form_field' id="charity-number" type='text' value={ charityNumber } onChange={handleCharityNumberChange} />
              <label id='form_label' htmlFor='email'>Charity Number (if applicable)</label >
              <i></i>
            </div>

            <div className="input-box">
              <input className='form_field' id="password" type='password' value={ password } onChange={handlePasswordChange} />
              <label id='form_label' htmlFor='password'>Password</label>
              <i></i>
            </div> 
            <input id='submit' type="submit" value="Sign Up" />
          </form>
          {error && <div className="error">{error}</div>}
          </div>
      </main>
    );
}

export default OrgsSignUpForm;
