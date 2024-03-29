import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {useIsAuthenticated, useSignOut} from "react-auth-kit";
import {fetchProfile} from "../../api/ApiFetch";

export function ProfileUI(props) {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);

    const signOut = useSignOut();
    const isAuthenticated = useIsAuthenticated();

    const userDetail = props.userDetail;

    let menuRef = useRef();

    const [user, setUser] = useState({});

    useEffect( () => {
        fetchProfile(userDetail.user_id, setUser, props.token);
    }, [props.token, userDetail]);

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
        signOut();
        window.location.href = '/'
    }
    return (
        <>
            {isAuthenticated() ?
                <div>
                <div className={'profile'}>
                    <div className={'profile-ui'} onClick={()=> window.location.assign("/profile")}>
                        <div className="profile-avatar" style={{backgroundImage: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${user.avatar || "defaultAvatar.jpg"})`}}></div>
                        <span>{userDetail.username}</span>

                    </div>
                    <div ref={menuRef} className={'options-ui'}>
                        <ul>
                            <li onClick={() => setIsOpenDropDown(true)}><FontAwesomeIcon icon={faCaretDown} /></li>
                        </ul>
                    </div>
                </div>
                {isOpenDropDown ?
                <div ref={menuRef} className={'drop-down-container'}>
                    <div className={'drop-down-btn'} onClick={()=> window.location.assign("/profile")}>Profile</div>
                    <div className={'drop-down-btn'} onClick={()=> window.location.assign("/settings")}>Settings</div>
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