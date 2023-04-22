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
import {SearchResults} from "./components/SearchResults/SearchResults";
import {useState} from "react";
import {RequireAuth, useAuthHeader, useSignIn} from "react-auth-kit";
import jwt_decode from 'jwt-decode';
import {ProfileById} from "./pages/ProfileById";
import {Friends} from "./components/Friends/Friends";
import {Posts} from "./components/Posts/Posts";
import {Photos} from "./components/Photos/Photos";
import {FriendRequests} from "./components/Friends/FriendRequests";
import {addFriend, cancelRequest, fetchAllUsers} from "./api/ApiFetch";


function App() {
    const [users, setUsers] = useState("");
    const [filterUsers, setFilterUsers] = useState([]);
    const [friends, setFriends] = useState([]);
    //console.log(friends);
    //console.log(friendStatus);
    const authHeader = useAuthHeader();
    let token = authHeader().slice(7);
    const userDetail = token && jwt_decode(token);
    //console.log(userDetail)

    const signIn = useSignIn();

    const addToFriend = async (friend_id) => {
        await addFriend(userDetail.user_id, friend_id, token, setUsers);
        await fetchAllUsers(userDetail.user_id, setUsers, token);
    };
    const cancelRequestButton = async (friend_id) => {
        await cancelRequest(userDetail.user_id, friend_id, token);
        await fetchAllUsers(userDetail.user_id, setUsers, token);
    };


  return (
    <>
        <Navbar users={users} setUsers={setUsers} userDetail={userDetail} token={token} addToFriend={addToFriend} cancelRequestButton={cancelRequestButton} />
        <Routes>

            <Route path={"/"} element={ <Home userDetail={userDetail} /> }/>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<Signup signIn={signIn} />} />


            <Route path={"/profile/:id/"} element={<ProfileById />}>

                <Route index element={<Posts />} />
                <Route path={"posts"} element={<Posts />} />
                <Route path={"friends"} element={<Friends user_id={userDetail.user_id} token={token} setFriends={setFriends} />} />
                <Route path={"photos"} element={<Photos userDetail={userDetail} />} />
            </Route>


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
                    <SearchResults users={users} setUsers={setUsers} user_id={userDetail.user_id} token={token} filterUsers={filterUsers} setFilterUsers={setFilterUsers} addToFriend={addToFriend} cancelRequestButton={cancelRequestButton} />
                </RequireAuth>
            }/>

            <Route path={"/profile"} element={
                <RequireAuth loginPath={"/login"} >
                    <Profile userDetail={userDetail} token={token} />
                </RequireAuth>
            }>
                <Route index element={<Posts />} />
                <Route path={"posts"} element={<Posts />} />
                <Route path={"friends"} element={<Friends user_id={userDetail.user_id} token={token} setFriends={setFriends} friends={friends} />} />
                <Route path={"photos"} element={<Photos userDetail={userDetail} />} />
            </Route>

            <Route path={"/friends"} element={
                <RequireAuth loginPath={"/login"} >
                    <FriendRequests />
                </RequireAuth>
            }/>
            {/*
            <Route path={"/profile/friends"} element={
                <RequireAuth loginPath={"/login"} >
                    <Profile userDetail={userDetail} token={token} />
                </RequireAuth>
            }/>
*/}
        </Routes>
    </>
  );
}

export default App;
