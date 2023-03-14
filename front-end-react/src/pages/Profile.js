import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchProfile} from "../api/ApiFetch";

export function Profile() {


    const [user, setUser] = useState({});

    const { id } = useParams();

    useEffect( () => {
        fetchProfile(id, setUser);
    }, [id]);


    return(
        <div className={'profile-container'}>
            <h3>{id}</h3>
            <h1>{user.username}</h1>
            <p>Friends: </p>
        </div>
    )
}