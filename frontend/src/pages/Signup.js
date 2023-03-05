import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Styling/home.css'

const Signup = () => {
    const [organisationName, setOrganisationName] = useState("");
    const [email, setEmail] = useState("");
    const [charityNumber, setCharityNumber] = useState("");
    const [password, setPassword] = useState("");
    const { signup, error, loading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(organisationName, email, charityNumber, password);
    }
    return (
    //     <main>
    //     <h2 id='sign-up-title'>Sign up now!</h2>
    //     <div className="container">
    //         <form className='signUpLoginForm' onSubmit={handleSubmit}>
    //             <div className="input-box">
    //             <label id='form_label' htmlFor='email'>Organisation Name</label >
    //             <input className='form_field' id="organisation-name" type='text' value={ organisationName } onChange={(e) => setOrganisationName(e.target.value)} />
    //             <i></i>
    //             </div>

    //             <div className="input-box">
    //             <label id='form_label' htmlFor='email'>Email Address</label >
    //             <input className='form_field' id="email" type='text' value={ email } onChange={(e) => setEmail(e.target.value)} />
    //             <i></i>
    //             </div>

    //             <div className="input-box">
    //             <label id='form_label' htmlFor='email'>Charity Number (if applicable)</label >
    //             <input className='form_field' id="charity-number" type='text' value={ charityNumber } onChange={(e) => setCharityNumber(e.target.value)} />
    //             <i></i>

    //             </div>
    //             <div className="input-box">
    //             <label id='form_label' htmlFor='password'>Password</label>
    //             <input className='form_field' id="password" type='password' value={ password } onChange={(e) => setPassword(e.target.value)} />
    //             <i></i>
    //             </div> 
    //             <input id='submit' type="submit" value="Sign Up" disabled={loading} />
    //         </form>
    //         {error && <div className="error">{error}</div>}
    //     </div>
    //     </main>
    <div className="form-container">
    <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Organisation Name</Form.Label>
        <Form.Control type="input" placeholder="Enter Organisation name" value={ organisationName } onChange={(e) => setOrganisationName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" value={ email } onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Charity Number </Form.Label>
        <Form.Control type="input" placeholder="(if applicable)" value={ charityNumber } onChange={(e) => setCharityNumber(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={ password } onChange={(e) => setPassword(e.target.value)}  />
        <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8 characters long, contain letters and numbers,
        and must not contain spaces, special characters.
      </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" value="Sign Up" disabled={loading}>
        Submit
      </Button>
      
    </Form>
     {error && <div className="error">{error}</div>}
    </div>
    );


}

export default Signup;