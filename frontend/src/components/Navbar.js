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
            <div className="container">
                    <h1>en<span style={{ color: '#e32945' }}>aid</span>le</h1>
                <nav>
                    {user && (
                    <div>

                        <Link to="/listings">Opportunities</Link>
                        {user.type === "org" && <Link to="/profile">Profile</Link>}
                        <Link to="/organisations">Charity Directory</Link>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                    )}
                    { !user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/organisation-signup">Organisation Signup</Link>
                        <Link to="/individual-signup">Individual Signup</Link>
                        <Link to="/listings">Opportunities</Link>
                        <Link to="/organisations">Charity Directory</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}
export default Navbar;