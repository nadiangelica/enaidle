import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/ListingsFeed";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import AccountProfile from "./pages/AccountProfile";
import OrgProfile from "./pages/OrgProfile";

const App = () => {
  const {orgUser} = useAuthContext()

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={!orgUser ? <Signup /> : <Navigate to="/listings" />} />
        <Route path="/login" element={!orgUser ? <Login /> : <Navigate to="/listings" /> } />
        <Route path="/listings" element={<Listings />} />
        <Route path="/profile" element={orgUser ? <AccountProfile /> : <Navigate to="/login" />} />
        <Route path="/organisations/:org-user-id" element={<OrgProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
