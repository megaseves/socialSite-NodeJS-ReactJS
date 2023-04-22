import React from 'react';

export function SearchBarResult({value, addToFriend, cancelRequestButton}) {
    return (
        <div className={"sr-container"} key={value.user_id}>

            <div className="sr-container-header">
                <div className="search-result-avatar-container">
                     <div className="search-result-avatar" style={{backgroundImage: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${value.avatar})`}} ></div>
                </div>
                <div className="search-result" key={value.email} onClick={()=> window.location.assign(`/profile/${value.user_id}`)}>
                    <p className="search-result-name">{value.username}</p>
                    {value.status === 'you' ?
                            <span className="search-result-relation">You</span>
                        :
                        value.status === 'not_friend' || value.status === 'pending'  ?
                            <>
                                <span className="search-result-relation">City: -</span>
                            </>
                        :
                            <>
                            <span className="search-result-relation">Friend</span>
                            </>
                    }
                </div>
            </div>

            <div className="add-friend-container" onClick={()=> window.location.assign(`/`)}>
                {value.status === 'you' ?
                    <span className="search-result-add-friend" onClick={() => window.location.assign(`/profile`)}>View profile</span>
                    :
                value.status === 'not_friend' ?
                    <span className="search-result-add-friend" onClick={() => addToFriend(value.user_id)}>Add friend</span>
                    :
                value.status === 'pending' ?
                    <span className="search-result-add-friend" onClick={() => cancelRequestButton(value.user_id)} >Cancel request</span>
                    :
                    <span className="search-result-add-friend">Message</span>
                }
            </div>
        </div>
    )
}