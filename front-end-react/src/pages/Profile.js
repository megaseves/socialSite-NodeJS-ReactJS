import React, {useEffect, useState} from 'react';
import {fetchProfile} from "../api/ApiFetch";
import './Profile.css';
import {Outlet} from "react-router-dom";
import {UploadAvatar} from "../components/Photos/avatar/UploadAvatar";
import {MenuLinkOnProfile} from "../components/MenuLinks/MenuLinkOnProfile";

export function Profile(props) {

    const [user, setUser] = useState({});
    const userDetail = props.userDetail;

    useEffect(  () => {
        fetchProfile(userDetail.user_id, setUser, props.token);
        //convertImage(user.avatar, setUrl);
        //console.log(url)
        //convertImageToURL(user.avatar, setUrl, props.token);
    }, [props.token, userDetail]);

    const open = () => {
        const uploadForm = document.querySelector('.upload-avatar-form');
        const uploadContainer = document.querySelector('.upload-avatar-container');
        const uploadFormContainer = document.querySelector('.upload-avatar-form-container');
        if (!uploadForm.classList.contains("open")) {
            uploadForm.classList.add("open");
            uploadContainer.classList.add("open");
            uploadFormContainer.classList.add("open");
        }
    }

    return(
        <div className={'profile-container'}>
            <div className="profile-header">

                <div className="cover-image"></div>
                <div className="user_details">
                    <div className="user-image" onClick={() => open()} style={{backgroundImage: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${user.avatar || "defaultAvatar.jpg"})`}} ></div>
                    <UploadAvatar userDetail={userDetail} />
                    <div className="user-content">
                        <div className="user-name">
                            <h1>{user.username}</h1>
                            <h4 className={"user-name-friends"}>0 friends</h4>
                        </div>
                        <div className="tab-menu">
                            <MenuLinkOnProfile title={'Posts'} to={"/profile/posts"} />
                            <MenuLinkOnProfile title={'Friends'} to={"/profile/friends"} />
                            <MenuLinkOnProfile title={'Photos'} to={"/profile/photos"} />
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