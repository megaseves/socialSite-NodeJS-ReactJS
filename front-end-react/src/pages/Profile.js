import React, {useEffect, useState} from 'react';
import {fetchProfile} from "../api/ApiFetch";
import './Profile.css';
import {Link, Outlet} from "react-router-dom";
import {UploadAvatar} from "../components/Photos/avatar/UploadAvatar";

export function Profile(props) {

    const [user, setUser] = useState({});
    const userDetail = props.userDetail;

    useEffect(  () => {
        fetchProfile(userDetail.user_id, setUser, props.token);
        //convertImage(user.avatar, setUrl);
        //console.log(url)
        //convertImageToURL(user.avatar, setUrl, props.token);
    }, [props.token, userDetail]);

    return(
        <div className={'profile-container'}>
            <div className="profile-header">

                <div className="cover-image"></div>
                <div className="user_details">
                    <div className="user-image" style={{backgroundImage: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${user.avatar || "defaultAvatar.jpg"})`}} ></div>
                    <div className="user-content">
                        <div className="user-name">
                            <h1>{user.username}</h1>
                            <h4 className={"user-name-friends"}>0 friends</h4>
                        </div>
                        <div className="tab-menu">
                            <Link to={"/profile/posts"}><div className="tab-menu-link active">Posts</div></Link>
                            <Link to={"/profile/friends"}><div className="tab-menu-link">Friends</div></Link>
                            <Link to={"/profile/photos"}><div className="tab-menu-link">Photos</div></Link>
                        </div>
                        <UploadAvatar userDetail={userDetail} />
                    </div>
                </div>

            </div>

            <div className="profile-content">
                <Outlet />
            </div>

        </div>
    )
}