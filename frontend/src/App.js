import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const {orgUser} = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={!orgUser ? <Signup /> : <Navigate to="/listings" />} />
        <Route path="/login" element={!orgUser ? <Login /> : <Navigate to="/listings" /> } />
        {/* <Route path="/new-request" element={<NewRequest navigate={useNavigate()} />} />
        <Route path="/request-feed" element={<RequestFeed navigate={useNavigate()} />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
