import React, {useEffect, useState} from 'react';
import './Friends.css';
import {getAllFriend, removeFriend} from "../../api/ApiFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";


export function Friends(props) {

    const [openModalId, setOpenModalId] = useState(null);

    useEffect( () => {
        getAllFriend(props.user_id, props.token, props.setFriends);
    }, [props.setFriends, props.user_id, props.token]);

    const openFriendSetting = (id) => {
        if (openModalId === id) {
            setOpenModalId(null);
        } else {
            setOpenModalId(id);
        }
    };

    const deleteFriend = async (friend_id) => {
        await removeFriend(props.user_id, friend_id, props.token);
        await getAllFriend(props.user_id, props.token, props.setFriends);
    };

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

                            <div id={'setting'} className={'setting'+friend.user_id} onClick={() => openFriendSetting(friend.user_id)}>
                                <div className="fcd-settings" >
                                        <FontAwesomeIcon className="fcd-setting-icon" icon={faEllipsis} />

                                        {openModalId === friend.user_id && (
                                            <span className="fcd-setting-container" data-setting-container={friend.user_id}>
                                                <span className="unfriend" onClick={() => deleteFriend(friend.user_id)}>
                                                    Unfriend
                                                </span>
                                            </span>
                                        )}

                                </div>
                            </div>

                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}