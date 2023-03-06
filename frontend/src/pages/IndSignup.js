import { useState } from "react";
import { useIndSignup } from "../hooks/useIndSignup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Styling/home.css'

const IndSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { indSignup, error, loading } = useIndSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await indSignup(firstName, lastName, email, password);
    }
//     return (
//         <main>
//         <h2 id='sign-up-title'>Sign up now!</h2>
//         <div className="container">
//             <form className='signUpLoginForm' onSubmit={handleSubmit}>
//                 <div className="input-box">
//                 <label id='form_label' htmlFor='email'>First Name</label >
//                 <input className='form_field' id="first-name" type='text' value={ firstName } onChange={(e) => setFirstName(e.target.value)} />
//                 <i></i>
//                 </div>

//                 <div className="input-box">
//                 <label id='form_label' htmlFor='email'>Last Name</label >
//                 <input className='form_field' id="last-name" type='text' value={ lastName } onChange={(e) => setLastName(e.target.value)} />
//                 <i></i>
//                 </div>

//                 <div className="input-box">
//                 <label id='form_label' htmlFor='email'>Email Address</label >
//                 <input className='form_field' id="email" type='text' value={ email } onChange={(e) => setEmail(e.target.value)} />
//                 <i></i>
//                 </div>

//                 <div className="input-box">
//                 <label id='form_label' htmlFor='password'>Password</label>
//                 <input className='form_field' id="password" type='password' value={ password } onChange={(e) => setPassword(e.target.value)} />
//                 <i></i>
//                 </div> 
//                 <input id='submit' type="submit" value="Sign Up" disabled={loading} />
//             </form>
//             {error && <div className="error">{error}</div>}
//         </div>
//         </main>
//     );
// }

// export default IndSignup;

  return (
    <div className="form-container">
    <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="input" placeholder="Enter First Name" value={ firstName } onChange={(e) => setFirstName(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="input" placeholder="Enter Last Name" value={ lastName } onChange={(e) => setLastName(e.target.value)}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" value={ email } onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={ password } onChange={(e) => setPassword(e.target.value)}  />
        <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8 characters long, contain letters and numbers,
        and must not contain spaces, special characters.
      </Form.Text>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
        {/* <Form.Check type="checkbox" label="Check me out" /> */}
      {/* </Form.Group> */}
      <Button variant="custom" type="submit" value="Sign Up" disabled={loading}>
        Submit
      </Button>
    </Form>
     {error && <div className="error">{error}</div>}
    </div>
  );
}

export default IndSignup;