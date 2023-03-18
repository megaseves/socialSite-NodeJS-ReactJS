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
import {useState} from "react";
import {RequireAuth, useAuthHeader} from "react-auth-kit";
import jwt_decode from 'jwt-decode';


function App() {
    const [users, setUsers] = useState("");

    const authHeader = useAuthHeader();
    let token = authHeader().slice(7);
    const userDetail = token && jwt_decode(token);
    //console.log(userDetail)

  return (
    <>
        <Navbar users={users} setUsers={setUsers} userDetail={userDetail} token={token} />
        <Routes>

            <Route path={"/"} element={
                <RequireAuth loginPath={"/login"} >
                    <Home userDetail={userDetail} />
                </RequireAuth>
            } />
            <Route path={"/login"} element={<Login />} />
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
