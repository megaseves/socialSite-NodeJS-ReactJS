import React, {useEffect, useState} from 'react';
import {fetchProfileById} from "../api/ApiFetch";
import {useParams} from "react-router-dom";

export function ProfileById() {

    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect( () => {
        fetchProfileById(id, setUser);
    }, [id, user]);


    return(
        <div className={'profile-container'}>
            <h3>{user.user_id}</h3>
            <h1>{user.username}</h1>
            <p>Friends: </p>
        </div>
    )
}