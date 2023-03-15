import React, {useEffect, useRef, useState} from "react";
import {getId, getUsername, hasUsername} from "../localStorage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";

export function ProfileUI() {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const username = getUsername();

    let menuRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setIsOpenDropDown(false);
            }
        }
       document.addEventListener("mousedown", handler);

       return () => {
           document.removeEventListener("mousedown", handler);
       }
    });

    const logout = () => {
        localStorage.setItem("username", "");
        localStorage.setItem("id", "");
        window.location.href = '/';
    }
    return (
        <>
            {hasUsername() ?
                <div>
                <div className={'profile'}>
                    <div className={'profile-ui'} onClick={()=> window.location.assign(`/profile/${getId()}`)}>
                        <img src={'/SocialSiteNoFace.jpg'} width={30} height={30} alt={'profile-avatar'} />
                        <span>{username}</span>

                    </div>
                    <div ref={menuRef} className={'options-ui'}>
                        <ul>
                            <li onClick={() => setIsOpenDropDown(true)}><FontAwesomeIcon icon={faCaretDown} /></li>
                        </ul>
                    </div>
                </div>
                {isOpenDropDown ?
                <div ref={menuRef} className={'drop-down-container'}>
                    <div className={'drop-down-btn'} onClick={()=> window.location.assign(`/profile/${getId()}`)}>Profile</div>
                    <div className={'drop-down-btn'} onClick={logout}>Logout</div>
                </div>
                :
                <div></div>
                }
                </div>
                :
                <div className={'profile-ui-logout'}>
                    <div className="login-btn" onClick={() => window.location.href = '/login'}>Login</div>
                    <div className="signup-btn-container" onClick={() => window.location.href = '/signup'}><a href={'/signup'} className={'signup-btn'}>Sign Up</a></div>

                </div>
            }
        </>
    )
}