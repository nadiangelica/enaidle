import { useState } from "react";
import { useOrgLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, loading } = useOrgLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
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
            <input id="submit" type="submit" value="LOGIN" disabled={loading}/>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
        </main>
    )
}

export default Login;