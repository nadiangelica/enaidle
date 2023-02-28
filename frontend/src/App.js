import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IndSignup from "./pages/IndSignup";
import Listings from "./pages/ListingsFeed";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Profile from "./pages/Profile";
import OrgProfile from "./pages/OrgProfile";


const App = () => {
  const {user} = useAuthContext()

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/organisation-signup" />} />
        <Route path="/organisation-signup" element={!user ? <Signup /> : <Navigate to="/listings" />} />
        <Route path="/individual-signup" element={!user ? <IndSignup /> : <Navigate to="/listings" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/listings" /> } />
        <Route path="/listings" element={<Listings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/organisations/:org-user-id" element={<OrgProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
