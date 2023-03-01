import { useState } from "react";
import { useOrgLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const { login, error, loading } = useOrgLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, userType);
    }
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
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <i></i>
                    </div>

                    <div className="input-box">
                        <label id="form_label" htmlFor="password">
                        Password
                        </label>
                        <input
                        className="form_field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <i></i>
                    </div>

                    <div>
                        <p>Are you logging in as an: </p>
                        <input 
                            type="radio" 
                            id="ind" 
                            name="userType" 
                            value="ind" 
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        <label htmlFor="ind">Individual</label>
                        <input 
                            type="radio"
                            id="org" 
                            name="userType" 
                            value="org" 
                            onChange={(e) => setUserType(e.target.value)}
                        />
                        <label htmlFor="org">Organisation</label>
                    </div>

                    <input id="submit" type="submit" value="LOGIN" disabled={loading}/>
                </form>
                {error && <div className="error">{error}</div>}
            </div>
        </main>
    )
}

export default Login;