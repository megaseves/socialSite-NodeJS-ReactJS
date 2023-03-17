import './App.css';
import {Home} from "./pages/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./pages/Signup";
import {Navbar} from "./components/Navbar/Navbar";
import {Watch} from "./pages/Watch";
import {Messages} from "./pages/Messages";
import {Login} from "./pages/Login";
import {hasUsername} from "./components/localStorage";
import {PageNotFound} from "./components/PageNotFound";
import {Profile} from "./pages/Profile";
import {SearchResults} from "./components/SearchResults";
import {useEffect, useState} from "react";


function App() {
    const [users, setUsers] = useState("");
    const [myDetails, setMyDetails] = useState('');
    useEffect(()=> {
        console.log(myDetails);
    }, [myDetails, setMyDetails]);
  return (
    <>
        <Router>
            <Navbar users={users} setUsers={setUsers} />
            {hasUsername() ?
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/watch"} element={<Watch />} />
                <Route path={"/messages"} element={<Messages />} />
                <Route path={"/login"} element={<Home />} />
                <Route path={"/signup"} element={<Home />} />
                <Route path={"/profile/:id"} element={<Profile />} />
                <Route path={"/search/people/"} element={<SearchResults users={users} />} />
                <Route path={"*"} element={<PageNotFound />} />
            </Routes>
            :
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/login"} element={<Login setMyDetails={setMyDetails} />} />
                <Route path={"/signup"} element={<Signup />} />
                <Route path={"*"} element={<Login setMyDetails={setMyDetails} />} />
            </Routes>
            }
        </Router>
    </>
  );
}

export default App;
