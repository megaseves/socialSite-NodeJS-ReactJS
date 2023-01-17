import React from 'react';
import {getUsername} from "../components/localStorage";

export function Profile() {
    const username = getUsername();
    return(
        <div className={'profile-container'}>
            <h1>{username}</h1>
            <p>Friends: </p>
        </div>
    )
}