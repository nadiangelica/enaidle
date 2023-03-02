import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import './Navbar.css';

const Navbar = () => {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            {/* <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/listings">enaidle</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/listings">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/listings">Link</a>
                    </li>
                </ul>
                </div>
            </div>
            </nav> */}
            <div className="container">
                    <h1>enaidle</h1>
                <p>
                    {user && (
                    <div>
                        <Link to="/listings">Listings</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/organisations">Organisations List</Link>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                    )}
                    { !user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/organisation-signup">Organisation Signup</Link>
                        <Link to="/individual-signup">Individual Signup</Link>
                        <Link to="/listings">Listings</Link>
                        <Link to="/organisations">Organisations List</Link>
                    </div>
                    )}
                </p>
            </div>
        </header>
    )
}

export default Navbar;