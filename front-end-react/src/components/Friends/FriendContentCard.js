import React from 'react';

export function FriendContentCard({value, addToFriend, cancelRequestButton}) {
    return(
        <div className="friend-content-card" onClick={() => window.location.assign(`/profile/${value.user_id}`)}>
            <div className="friend-requests-card-avatar" style={{backgroundImage: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${value.avatar})`}}></div>
            <div className="friend-requests-card-detail-container">
                <div className="friend-requests-card-name" onClick={() => window.location.assign(`/profile/${value.user_id}`)}>{value.username}</div>
                <div className="friend-requests-card-mutual-friends">0 mutual friends</div>
                <div className="friend-requests-card-confirm"><button className="request-friend-btn confirm-btn" onClick={() => addToFriend(value.user_id)}>Confirm</button></div>
                <div className="friend-requests-card-remove"><button className="request-friend-btn remove-btn" onClick={() => cancelRequestButton(value.user_id)}>Remove</button></div>
            </div>
        </div>
    )
}