import { useState } from "react";
import { useOrgLogin } from "../hooks/useLogin";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("ind");
  const { login, error, loading } = useOrgLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, userType);
  };
  return (
    // <main>
    // <h2 id="login-title">LOGIN</h2>
    //     <div className="container">
    //         <form className="signUpLoginForm" onSubmit={handleSubmit}>
    //             <div className="input-box">
    //                 <label id="form_label" htmlFor="email">
    //                 Email Address
    //                 </label>
    //                 <input
    //                 className="form_field"
    //                 type="text"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 />
    //                 <i></i>
    //             </div>

    //             <div className="input-box">
    //                 <label id="form_label" htmlFor="password">
    //                 Password
    //                 </label>
    //                 <input
    //                 className="form_field"
    //                 type="password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 />
    //                 <i></i>
    //             </div>

    //             <div>
    //                 <p className="small-paragraph">Are you logging in as an: </p>
    //                 <input
    //                     type="radio"
    //                     id="ind"
    //                     name="userType"
    //                     value="ind"
    //                     onChange={(e) => setUserType(e.target.value)}
    //                 />
    //                 <label htmlFor="ind">Individual</label>
    //                 <input
    //                     type="radio"
    //                     id="org"
    //                     name="userType"
    //                     value="org"
    //                     onChange={(e) => setUserType(e.target.value)}
    //                 />
    //                 <label htmlFor="org">Organisation</label>
    //             </div>

    //             <input id="submit" type="submit" value="LOGIN" disabled={loading}/>
    //         </form>
    //         {error && <div className="error">{error}</div>}
    //     </div>
    // </main>

    <div className="form-container">
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
  
      <Form.Group className="mb-3">
        <Form.Label>Are you logging in as an:</Form.Label>
        <div>
          <Form.Check
            type="radio"
            id="ind"
            label="Individual"
            value="ind"
            checked={userType === 'ind'}
            onChange={(e) => setUserType(e.target.value)}
          />
          <Form.Check
            type="radio"
            id="org"
            label="Organisation"
            value="org"
            checked={userType === 'org'}
            onChange={(e) => setUserType(e.target.value)}
          />
        </div>
      </Form.Group>
  
      <Button
        variant="custom"
        type="submit"
        value="Sign Up"
        disabled={loading}
      >
        Submit
      </Button>
    </Form>
    {error && <div className="error">{error}</div>}
  </div>
  )  
};

export default Login;
