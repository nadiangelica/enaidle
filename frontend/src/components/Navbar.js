import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>enaidle</h1>
                </Link>
                <nav>
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
                </nav>
            </div>
        </header>
    )
}

export default Navbar;