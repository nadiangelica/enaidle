import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

    const { logout } = useLogout();
    const { orgUser } = useAuthContext();

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
                    {orgUser && (
                    <div>
                        <Link to="/listings">Listings</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                    )}
                    { !orgUser && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                        <Link to="/listings">Listings</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;