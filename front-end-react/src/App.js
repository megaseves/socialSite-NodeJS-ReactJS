import './App.css';
import {Home} from "./pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup";
import {Navbar} from "./components/Navbar";
import {Watch} from "./pages/Watch";
import {Messages} from "./pages/Messages";
import {Login} from "./pages/Login";
import {hasUsername} from "./components/localStorage";
import {PageNotFound} from "./components/PageNotFound";
import {Profile} from "./pages/Profile";

function App() {

  return (
    <>
        <Navbar  />
        <Router>
            {hasUsername() ?
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/watch"} element={<Watch />} />
                <Route path={"/messages"} element={<Messages />} />
                <Route path={"/login"} element={<Home />} />
                <Route path={"/signup"} element={<Home />} />
                <Route path={"/profile"} element={<Profile />} />
                <Route path={"*"} element={<PageNotFound />} />
            </Routes>
            :
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/login"} element={<Login  />} />
                <Route path={"/signup"} element={<Signup  />} />
                <Route path={"*"} element={<Login />} />
            </Routes>
            }
        </Router>
    </>
  );
}

export default App;
