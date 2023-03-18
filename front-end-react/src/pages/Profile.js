import React, {useEffect, useState} from 'react';
import {fetchProfile} from "../api/ApiFetch";

export function Profile(props) {


    const [user, setUser] = useState({});

    const userDetail = props.userDetail;

    useEffect( () => {
        fetchProfile(userDetail.user_id, setUser, props.token);
    }, [props.token, userDetail]);


    return(
        <div className={'profile-container'}>
            <h3>{user.user_id}</h3>
            <h1>{user.username}</h1>
            <p>Friends: </p>
        </div>
    )
}