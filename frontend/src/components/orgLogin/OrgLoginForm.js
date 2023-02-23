import React, { useState } from "react";
// import './OrgsSignUpForm.css';

const OrgsLoginForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/orgUsers", {
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
      // not sure if it's org_user_id or is orgUser_id? 
      window.localStorage.setItem("org_user_id", data.org_user_id);
      // route path "/listing" needs to be ammend to the same path (which ever pair is working on creating this path)
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
            <label id="form_label" htmlFor="email">
              Email Address
            </label>
            <input
              className="form_field"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
            <i></i>
          </div>

          <div className="input-box">
            <label id="form_label" htmlFor="password">
              Password
            </label>
            <input
              className="form_field"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
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
