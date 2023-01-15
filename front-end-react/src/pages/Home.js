import React, { useState } from 'react';
import api from '../api/users';
import {Link} from "react-router-dom";


export function Home() {
    const [users, setUsers] = useState([]);






    const fetchUsers = async () => {
        try {
            const response = await api.get('users');
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
            {
                users.map(user =>
                    <div className={'name-card'} key={user.id}>
                        <h3>{user.username}</h3>
                        <p>{user.email}</p>
                    </div>)
            }
            <Link to={'/signup'} className={'btn-primary'}>Sign Up</Link>
        </div>
    )
}
