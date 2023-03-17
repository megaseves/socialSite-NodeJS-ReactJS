import './App.css';
import {Home} from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import {Navbar} from "./components/Navbar/Navbar";
import {Watch} from "./pages/Watch";
import {Messages} from "./pages/Messages";
import {Login} from "./pages/Login";
import {PageNotFound} from "./components/PageNotFound";
import {Profile} from "./pages/Profile";
import {SearchResults} from "./components/SearchResults";
import {useEffect, useState} from "react";
import {RequireAuth} from "react-auth-kit";
import Cookies from "universal-cookie/es6";
import jwt_decode from "jwt-decode";



function App() {
    const [users, setUsers] = useState("");



    const cookies = new Cookies();
    let token = cookies.get('token');

    const decoded = token && jwt_decode(token);

    useEffect(()=> {
        console.log(cookies.get('token'));
        console.log(decoded);
    }, [cookies]);

  return (
    <>
        <Navbar users={users} setUsers={setUsers} />
        <Routes>

            <Route path={"/"} element={
                <RequireAuth loginPath={"/login"}>
                    <Home />
                </RequireAuth>
            } />
            <Route path={"/login"} element={<Login cookies={cookies} />} />
            <Route path={"/signup"} element={<Signup />} />


            <Route path={"/watch"} element={<Watch />} />
            <Route path={"/messages"} element={<Messages />} />
            <Route path={"/profile/:id"} element={<Profile />} />
            <Route path={"/search/people/"} element={<SearchResults users={users} />} />
            <Route path={"*"} element={<PageNotFound />} />
            <Route path={"*"} element={<Login />} />
        </Routes>
    </>
  );
}

export default App;
