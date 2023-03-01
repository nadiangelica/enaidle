import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IndSignup from "./pages/IndSignup";
import Listings from "./pages/ListingsFeed";
import SingleListing from "./pages/SingleListing";
import AccountProfile from "./pages/AccountProfile";
import OrgProfile from "./pages/OrgProfile";
import UpdateProfile from "./pages/UpdateProfile";
import OrgList from "./pages/OrgList";


const App = () => {
    const {user} = useAuthContext()

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/signup" />} />
                <Route path="/organisation-signup" element={!user ? <Signup /> : <Navigate to="/listings" />} />
                <Route path="/individual-signup" element={!user ? <IndSignup /> : <Navigate to="/listings" />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/listings" /> } />
                <Route path="/listings" element={<Listings />} />
                <Route path="/listings/:listing_id" element={<SingleListing />} />
        <Route path="/profile" element={user ? <AccountProfile /> : <Navigate to="/login" />} />
                <Route path="/profile/update" element={user ? <UpdateProfile /> : <Navigate to="/login" />} />
                <Route path="/organisations/" element={<OrgList />} />
                <Route path="/organisations/:org_user_id" element={<OrgProfile />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;