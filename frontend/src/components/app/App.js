import OrgSignUpForm from "../orgSignUp/OrgSignUpForm";
import OrgsLoginForm from "../orgLogin/OrgLoginForm";
import NewRequest from "../newRequest/NewRequest";
import RequestFeed from "../requestFeed/RequestFeed";
import IndSignUpForm from "../indSignUp/IndSignUpForm";
import { useNavigate, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<OrgSignUpForm navigate={useNavigate()} />} />
        <Route path="/individual-signup" element={<IndSignUpForm navigate={useNavigate()} />} />
        <Route path="/login" element={<OrgsLoginForm navigate={useNavigate()} />} />
        <Route path="/new-request" element={<NewRequest navigate={useNavigate()} />} />
        <Route path="/request-feed" element={<RequestFeed navigate={useNavigate()} />} />
      </Routes>
    </>
  );
};

export default App;
