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
                    <h1>Help Others</h1>
                </Link>
                <nav>
                    {orgUser && (
                    <div>
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                    )}
                    { !orgUser && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;