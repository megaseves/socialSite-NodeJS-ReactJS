import React from 'react';
import './Navbar.css';

export function Navbar() {
    return(
        <div className={'navbar-container'}>

                <div className={'logo-ui'}>
                    <img src={'socialSiteLogo.png'} width={40} height={40} alt={'logo'} onClick={()=> window.location.assign("/")} />
                </div>

                <div className={'menu-ui'}>
                    <ul>
                        <li onClick={()=> window.location.assign("/")}>Home</li>
                        <li onClick={()=> window.location.assign("/watch")}>Watch</li>
                        <li onClick={()=> window.location.assign("/messages")}>Messages</li>
                    </ul>
                </div>
                <div className={'profile-ui'}>
                    <img src={'SocialSiteNoFace.jpg'} width={30} height={30} alt={'profile-avatar'} />
                    <span>Attila</span>
                </div>
        </div>
    )
}