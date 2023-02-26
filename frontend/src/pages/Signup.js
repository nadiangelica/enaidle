import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router";

const Signup = () => {
    const [organisationName, setOrganisationName] = useState("");
    const [email, setEmail] = useState("");
    const [charityNumber, setCharityNumber] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { signup, error, loading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(organisationName, email, charityNumber, password);
        navigate('/login');
    }
    return (
        <main>
        <h2 id='sign-up-title'>Sign up now!</h2>
        <div className="container">
            <form className='signUpLoginForm' onSubmit={handleSubmit}>
                <div className="input-box">
                <label id='form_label' htmlFor='email'>Organisation Name</label >
                <input className='form_field' id="organisation-name" type='text' value={ organisationName } onChange={(e) => setOrganisationName(e.target.value)} />
                <i></i>
                </div>

                <div className="input-box">
                <label id='form_label' htmlFor='email'>Email Address</label >
                <input className='form_field' id="email" type='text' value={ email } onChange={(e) => setEmail(e.target.value)} />
                <i></i>
                </div>

                <div className="input-box">
                <label id='form_label' htmlFor='email'>Charity Number (if applicable)</label >
                <input className='form_field' id="charity-number" type='text' value={ charityNumber } onChange={(e) => setCharityNumber(e.target.value)} />
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

export default Signup;