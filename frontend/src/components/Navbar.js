import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
// import './Navbar.css';
import logo from '../assets/images/enaidle.png'
// import logo from '../assets/images/Hand.png'
// import logo from "../assets/images/Hand_Logo_2.png";
// import logo from '../assets/images/Hand_Logo_2.png'
// import Container from 'react-bootstrap/Container';

// const Navbar = () => {
//     const { logout } = useLogout();
//     const { user } = useAuthContext();
//     const handleClick = () => {
//         logout();
//     }
//     return (
//         <header>
//             <div className="container">
//                 <a href="/"><img src={logo} alt="enaidle" height="200"/></a>
//                 <nav>
//                     {user && (
//                         <div>
//                             <Link to="/listings">Opportunities</Link>
// {user.type === "org" && <Link to="/profile">Profile</Link>}
//                             <Link to="/organisations">Charity Directory</Link>
//                             <button onClick={handleClick}>Log Out</button>
//                         </div>
//                     )}
//                     { !user && (
//                         <div>
//                             <Link to="/login">Login</Link>
//                             <Link to="/organisation-signup">Organisation Signup</Link>
//                             <Link to="/individual-signup">Individual Signup</Link>
//                             <Link to="/listings">Opportunities</Link>
//                             <Link to="/organisations">Charity Directory</Link>
//                         </div>
//                     )}
//                 </nav>
//             </div>
//         </header>
//     )
// }
// export default Navbar;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navibar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <a href="/">
          <img src={logo} alt="enaidle" height="200" />
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!user && (
              <div>
                <NavDropdown title="Sign up" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/organisation-signup">
                    As an Organisation
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/individual-signup">
                    As a Individual
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              </div>
            )}
            {user && (
              <div>
                {user.type === "org" && (
                  <Nav.Link href="/profile">Profile</Nav.Link>
                )}
              </div>
            )}
            
            {!user && <Nav.Link href="/login">Login</Nav.Link>}

            <Nav.Link href="/listings">Feed</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link href="/organisations">Partners Directory</Nav.Link>

        {user && (
          <div>
            <button className="btn" onClick={handleClick}>
              Log Out
            </button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Navibar;
