import React, {useEffect, useState} from 'react';
import {fetchProfileById} from "../api/ApiFetch";
import {Outlet, useParams} from "react-router-dom";
import './ProfileById.css';
import {MenuLinkOnProfile} from "../components/MenuLinks/MenuLinkOnProfile";

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
                    <div className="user-image" style={{background: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${user.avatar || "defaultAvatar.jpg"})`}} ></div>
                    <div className="user-content">
                        <div className="user-name">
                            <h1>{user.username}</h1>
                            <h4 className={"user-name-friends"}>0 friends</h4>
                        </div>
                        <div className="tab-menu">
                            <MenuLinkOnProfile title={'Posts'} to={`/profile/${id}/posts`} />
                            <MenuLinkOnProfile title={'Friends'} to={`/profile/${id}/friends`} />
                            <MenuLinkOnProfile title={'Photos'} to={`/profile/${id}/photos`} />
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