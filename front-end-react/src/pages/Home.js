import React, { useState } from 'react';
import api from '../api/users';
import {Link} from "react-router-dom";
import '../App.css';
import './Home.css';


export function Home() {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const response = await api.get('latestUsers');
            setUsers(response.data);
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
            } else {
                console.log(err.message)
            }

        }
    }
    fetchUsers()

    return (
        <div className={'home-container'}>
            <h1>Welcome to the SocialSite!</h1>
            <div className={'design-line'}></div>
            <br/>
            <h4>The newest registered users</h4>
            <br/>
            <div className={'registered-container'}>
                {
                    users.map(user =>
                        <div className={'name-card'} key={user.id}>
                            <h3>{user.username}</h3>
                            <p>{user.email}</p>
                        </div>)
                }
            </div>
            <Link to={'/signup'} className={'btn-primary'}>Sign Up</Link>
        </div>
    )
}
