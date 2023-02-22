import React, { useState } from "react";
import './OrgsSignUpForm.css';

const NewListingForm = ({ navigate }) => {
  const [title, setTitle] = useState("");
  const [requirement, setRequirement] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // '/users' to be amended when we have clarity of route path for backend
    const response = await fetch("/users", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
    } else {
      console.log("yay");
      let data = await response.json();
      console.log(data);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("org_user_id", data.org_user_id);
      navigate("/listings");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <main>
      <h2 id="login-title">LOGIN</h2>
      <div className="container">
        <form className="signUpLoginForm" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              className="form_field"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <label id="form_label" htmlFor="email">
              Email
            </label>
            <i></i>
          </div>

          <div className="input-box">
            <input
              className="form_field"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label id="form_label" htmlFor="password">
              Password
            </label>
            <i></i>
          </div>
          <input id="submit" type="submit" value="LOGIN" />
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </main>
  );
};

export default OrgsLoginForm;
