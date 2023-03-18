import React, {useEffect, useState} from 'react';
import api from '../api/users';
import '../App.css';
import './Home.css';


export function Home(props) {
    const [users, setUsers] = useState([]);

    const userDetail = props.userDetail;

    useEffect(() => {
        fetchUsers();
    }, []);


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


    return (
        <div className={'home-container'}>
            <h1>Welcome
                {userDetail.username ?
                    <span> {userDetail.username}!</span>
                    :
                    <span> to the SocialSite!</span>
                }
            </h1>
            <div className={'design-line'}></div>
            <br/>
            <h4>The newest registered users</h4>
            <br/>
            <div className={'registered-container'}>
                {
                    users.map(user =>
                        <div className={'name-card'} key={user.email}>
                            <h3>{user.username}</h3>
                            <p className={"name-card-text"}>{user.email}</p>
                            <p className={"name-card-text"}>City: -</p>
                        </div>)
                }
            </div>
        </div>
    )
}
