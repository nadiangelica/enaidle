const Home = () => {
    return(
        <div>
            <p className="intro">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <h3>Sign up now!</h3>
            <p>I am an:</p>
            <button className="user-type-redirect-button">Organisation</button>
            <button className="user-type-redirect-button">Individual</button>
            <p className="small-paragraph">Already signed up?</p>
            <button className="login-redirect-button">Login</button>
        </div>
    )
}

export default Home;