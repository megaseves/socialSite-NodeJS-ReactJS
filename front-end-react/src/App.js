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
import {RequireAuth, useAuthHeader, useSignIn} from "react-auth-kit";
import jwt_decode from 'jwt-decode';
import {ProfileById} from "./pages/ProfileById";


function App() {
    const [users, setUsers] = useState("");

    const authHeader = useAuthHeader();
    let token = authHeader().slice(7);
    const userDetail = token && jwt_decode(token);

    const signIn = useSignIn();

  return (
    <>
        <Navbar users={users} setUsers={setUsers} userDetail={userDetail} token={token} />
        <Routes>

            <Route path={"/"} element={ <Home userDetail={userDetail} /> }/>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup signIn={signIn} />} />
            <Route path={"/profile/:id"} element={<ProfileById />} />
            <Route path={"*"} element={<PageNotFound />} />

            <Route path={"/watch"} element={
                <RequireAuth loginPath={"/login"} >
                    <Watch />
                </RequireAuth>
            }/>

            <Route path={"/messages"} element={
                <RequireAuth loginPath={"/login"} >
                    <Messages />
                </RequireAuth>
            }/>

            <Route path={"/search/people/"} element={
                <RequireAuth loginPath={"/login"} >
                    <SearchResults users={users} />
                </RequireAuth>
            }/>

            <Route path={"/profile"} element={
                <RequireAuth loginPath={"/login"} >
                    <Profile userDetail={userDetail} token={token} />
                </RequireAuth>
            }/>

        </Routes>
    </>
  );
}

export default App;
