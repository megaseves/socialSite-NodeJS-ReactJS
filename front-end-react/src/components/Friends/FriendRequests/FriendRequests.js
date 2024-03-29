import React, {useEffect} from 'react';
import './FriendRequests.css';
import {FriendContentCard} from "./FriendContentCard";
import {getAllFriendRequest, getAllOwnRequest} from "../../../api/ApiFetch";
import {FriendSentRequestCard} from "./FriendSentRequestCard";


export function FriendRequests(props) {

    useEffect(() => {
        getAllFriendRequest(props.user_id, props.setFriendRequests, props.token);
    }, [props.user_id, props.token, props.setFriendRequests]);

    useEffect(() => {
        getAllOwnRequest(props.user_id, props.setOwnRequests, props.token);
    }, [props.user_id, props.token, props.setOwnRequests]);

    return(
        <div className="friend-requests-container">
            <div className="search-filters">
                <div className={"search-filters-header friends-container-header"}>
                    <h2>Friends</h2>
                </div>

                <div className="search-filter active-filter">
                    <p>All</p>
                </div>
                <div className="search-filter">
                    <p>Friend requests</p>
                </div>
                <div className="search-filter">
                    <p>Sent requests</p>
                </div>
                <div className="search-filter">
                    <p>Suggestions</p>
                </div>
                <div className="search-filter">
                    <p>Birthdays</p>
                </div>
            </div>


            <div className="friend-flex-container">

                <div className="friend-requests-content-container">
                    <div className="friend-content-header">
                        <h3>Friend requests</h3>
                        <a href={"/"}>See all</a>
                    </div>
                    <div className="friend-content-card-container">
                        {props.friendRequests.length > 0 &&
                            props.friendRequests.map((value) =>
                            <FriendContentCard value={value} key={value.user_id} addToFriend={props.addToFriend} cancelRequestButton={props.cancelRequestButton} />
                        )}
                    </div>
                </div>


                <div className="friend-requests-content-container">
                    <div className="friend-content-header">
                        <h3>Sent requests</h3>
                        <a href={"/"}>See all</a>
                    </div>
                    <div className="friend-content-card-container">
                        {props.ownRequests.length > 0 &&
                            props.ownRequests.map((value) =>
                            <FriendSentRequestCard value={value} key={value.user_id} cancelRequestButton={props.cancelRequestButton} />
                        )}
                    </div>
                </div>

            </div>

        </div>
    )
}