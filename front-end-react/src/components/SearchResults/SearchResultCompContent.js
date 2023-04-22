import React from 'react';

export function SearchResultCompContent({value, addToFriend, cancelRequestButton}) {
    return (
        <div className="search-result-comp-usernames" key={value.user_id}>
            <div className="search-box"
                 onClick={() => window.location.assign(`/profile/${value.user_id}`)}>
                <div className="sr-avatar"
                     style={{backgroundImage: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${value.avatar})`}}></div>
                <div className="sr-comp">
                    <div className="search-result-header">
                        <span className="search-result-comp-name"
                              onClick={() => window.location.assign(`/profile/${value.user_id}`)}>{value.username}</span>

                    </div>

                    <div className="search-result-details">
                        {value.status === 'you' ?
                                <span className="search-result-relation">You</span>
                            :
                            value.status === 'not_friend' ?
                                <>
                                    <span className="search-result-relation">City: -</span>
                                </>

                            :
                            value.status === 'pending' ?
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
            </div>


            <div className="search-add-friend" >
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