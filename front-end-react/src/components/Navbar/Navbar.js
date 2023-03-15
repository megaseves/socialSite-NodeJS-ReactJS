import React from 'react';
import './Navbar.css';
import {SearchBar} from "./SearchBar";
import {ProfileUI} from "./ProfileUI";

export function Navbar() {

    return(
        <div className={'navbar-container'}>
                <div className={"logo-and-search"}>
                    <div className={'logo-ui'}>
                        <img src={'/socialSiteLogo.png'} width={40} height={40} alt={'logo'} onClick={()=> window.location.assign("/")} />
                    </div>
                    <SearchBar />
                </div>

                <div className={'menu-ui'}>
                    <ul>
                        <li onClick={()=> window.location.assign("/")}>Home</li>
                        <li onClick={()=> window.location.assign("/watch")}>Watch</li>
                        <li onClick={()=> window.location.assign("/messages")}>Messages</li>
                    </ul>
                </div>
                <ProfileUI />
        </div>
    )
}