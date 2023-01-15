import './App.css';
import {Home} from "./pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup";
import {Navbar} from "./components/Navbar";
import {Watch} from "./pages/Watch";
import {Messages} from "./pages/Messages";

function App() {
  return (
    <>
        <Navbar />
        <Router>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"/watch"} element={<Watch />} />
                <Route path={"/messages"} element={<Messages />} />
            </Routes>
        </Router>
    </>
  );
}

export default App;
