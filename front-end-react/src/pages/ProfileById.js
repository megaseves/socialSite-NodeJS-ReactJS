import React, {useEffect, useState} from 'react';
import {fetchProfileById} from "../api/ApiFetch";
import {Link, Outlet, useParams} from "react-router-dom";
import './ProfileById.css';

export function ProfileById() {

    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect( () => {
        fetchProfileById(id, setUser);
    }, [id]);


    return(
        <div className={'profile-container'}>
            <div className="profile-header">

                <div className="cover-image"></div>
                <div className="user_details">
                    <div className="user-image" style={{background: `url(${user.avatar})`}} ></div>
                    <div className="user-content">
                        <div className="user-name">
                            <h1>{user.username}</h1>
                            <h4 className={"user-name-friends"}>0 friends</h4>
                        </div>
                        <div className="tab-menu">
                            <Link to={`/profile/${id}/posts`}><div className="tab-menu-link active">Posts</div></Link>
                            <Link to={`/profile/${id}/friends`}><div className="tab-menu-link">Friends</div></Link>
                            <Link to={`/profile/${id}/photos`}><div className="tab-menu-link">Photos</div></Link>
                        </div>
                    </div>
                </div>

            </div>

            <div className="profile-content">
                <Outlet />
            </div>

        </div>
    )
}