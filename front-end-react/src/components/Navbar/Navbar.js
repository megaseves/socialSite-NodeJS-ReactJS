import React from 'react';
import './Navbar.css';
import {SearchBar} from "./SearchBar";
import {ProfileUI} from "./ProfileUI";
import {useIsAuthenticated} from "react-auth-kit";

export function Navbar(props) {

    const isAuthenticated = useIsAuthenticated();

    return(
        <div className={'navbar-container'}>
                <div className={"logo-and-search"}>
                    <div className={'logo-ui'}>
                        <img src={'/socialSiteLogo.png'} width={40} height={40} alt={'logo'} onClick={()=> window.location.assign("/")} />
                    </div>
                    {isAuthenticated() && <SearchBar setUsers={props.setUsers} users={props.users} token={props.token} user_id={props.userDetail.user_id} cancelRequestButton={props.cancelRequestButton} addToFriend={props.addToFriend}/>}
                </div>

                <div className={'menu-ui'}>
                    <ul>
                        <li onClick={()=> window.location.assign("/")}>Home</li>
                        <li onClick={()=> window.location.assign("/watch")}>Watch</li>
                        <li onClick={()=> window.location.assign("/messages")}>Messages</li>
                    </ul>
                </div>
                <ProfileUI userDetail={props.userDetail} token={props.token} />
        </div>
    )
}