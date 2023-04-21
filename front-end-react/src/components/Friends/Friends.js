import React, {useEffect, useRef} from 'react';
import './Friends.css';
import {getAllFriend} from "../../api/ApiFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";


export function Friends(props) {

    let ref = useRef();

    useEffect( () => {
        getAllFriend(props.user_id, props.token, props.setFriends);
    }, [props.setFriends, props.user_id, props.token]);

    const open = (friend_id) => {
        const setting = document.querySelector(`.setting${friend_id}`);
        const setting_container = setting.querySelector('[data-setting-container]');
        if (!setting_container.classList.contains("open")) {
            setting_container.classList.add("open");
        }
    }

    useEffect(() => {
        let handler = (event) => {
            const settings = document.querySelectorAll('.open');
            if (!ref.current.contains(event.target)) {
                settings.forEach(setting =>{
                    setting.classList.remove('open');
                })
            }
        }
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });


    return(
        <div className="friends-container">
            <div className="friends-header">
                <div className="friends-header-title">
                    <h2>Friends</h2>
                    <span className="friends-requests" onClick={()=> window.location.assign("/friends")}>
                        Friend requests
                    </span>
                </div>

            </div>
            <div className="friends-content">
                {props.friends && props.friends.map(friend =>

                    <div className="friend-card" key={friend.user_id}>
                        <div className="friend-card-avatar" onClick={()=> window.location.assign(`/profile/${friend.user_id}`)} style={{backgroundImage: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${friend.avatar || "defaultAvatar.jpg"})`}} ></div>
                        <div className="friend-card-details">

                            <div className="fcd-name-email">
                                <span className="friend-card-name" onClick={()=> window.location.assign(`/profile/${friend.user_id}`)}>
                                    {friend.username}
                                </span>
                                <span className="friend-card-email">
                                    {friend.email}
                                </span>
                            </div>
                            <div className={'setting'+friend.user_id} onClick={() => open(friend.user_id)}>
                                <div className="fcd-settings" >
                                        <FontAwesomeIcon className="fcd-setting-icon" icon={faEllipsis} />
                                        <span ref={ref} className="fcd-setting-container" data-setting-container={friend.user_id}>
                                            <span className="unfriend">
                                                Unfriend
                                            </span>
                                        </span>
                                </div>
                            </div>

                        </div>


                    </div>

                )}
            </div>
        </div>
    )
}