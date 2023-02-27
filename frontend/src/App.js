import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Listings from "./pages/ListingsFeed";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
