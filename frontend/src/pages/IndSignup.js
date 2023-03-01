import { useState } from "react";
import { useIndSignup } from "../hooks/useIndSignup";
import { useNavigate } from "react-router";

const IndSignup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { indSignup, error, loading } = useIndSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await indSignup(firstName, lastName, email, password);
        navigate('/login');
    }
    return (
        <main>
        <h2 id='sign-up-title'>Sign up now!</h2>
        <div className="container">
            <form className='signUpLoginForm' onSubmit={handleSubmit}>
                <div className="input-box">
                <label id='form_label' htmlFor='email'>First Name</label >
                <input className='form_field' id="first-name" type='text' value={ firstName } onChange={(e) => setFirstName(e.target.value)} />
                <i></i>
                </div>

                <div className="input-box">
                <label id='form_label' htmlFor='email'>Last Name</label >
                <input className='form_field' id="last-name" type='text' value={ lastName } onChange={(e) => setLastName(e.target.value)} />
                <i></i>
                </div>

                <div className="input-box">
                <label id='form_label' htmlFor='email'>Email Address</label >
                <input className='form_field' id="email" type='text' value={ email } onChange={(e) => setEmail(e.target.value)} />
                <i></i>
                </div>

                <div className="input-box">
                <label id='form_label' htmlFor='password'>Password</label>
                <input className='form_field' id="password" type='password' value={ password } onChange={(e) => setPassword(e.target.value)} />
                <i></i>
                </div> 
                <input id='submit' type="submit" value="Sign Up" disabled={loading} />
            </form>
            {error && <div className="error">{error}</div>}
        </div>
        </main>
    );
}

export default IndSignup;