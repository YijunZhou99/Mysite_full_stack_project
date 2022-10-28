import './App.css';
import Landing from "./Components/LandingPage/Landing";
import Main from "./Components/MainPage/Main";
import Profile from "./Components/ProfilePage/Profile";
import Redirect from "./Components/LandingPage/Redirect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/Main" exact element={<Main />} />
          <Route path="/Profile" exact element={<Profile />} />
          <Route path="/Redirect" exact element={<Redirect />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
