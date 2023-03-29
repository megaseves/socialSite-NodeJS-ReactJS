import React, {useEffect} from 'react';
import './Friends.css';
import {getAllFriend} from "../../api/ApiFetch";


export function Friends(props) {

    useEffect( () => {
        getAllFriend(props.user_id, props.token, props.setFriends);
    }, [props.setFriends, props.user_id, props.token]);

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
                {props.friends.map(friend =>
                    <div className="friend-card" key={friend.friend_id}>
                        <div className="friend-card-avatar" onClick={()=> window.location.assign(`/profile/${friend.friend_id}`)} style={{backgroundImage: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${friend.avatar || "defaultAvatar.jpg"})`}} ></div>
                        <div className="friend-card-details">
                            <span className="friend-card-name" onClick={()=> window.location.assign(`/profile/${friend.friend_id}`)}>
                            {friend.username}
                        </span>
                        <span className="friend-card-email">
                            {friend.email}
                        </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}