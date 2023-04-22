import React, {useEffect} from 'react';
import './SearchResults.css';
import {useSearchParams} from "react-router-dom";
import {SearchResultCompContent} from "./SearchResultCompContent";
import {addFriend, cancelRequest, fetchAllUsers} from "../../api/ApiFetch";

export function SearchResults(props) {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') || '';
/*    const [filterUsers, setFilterUsers] = useState([]);*/

    useEffect(() => {
            console.log('ok');
            const filteredUsers = props.users && props.users.filter((value) => {
                if (q === "") {
                    return "";
                } else if (value.username.toLowerCase().includes(q.toLowerCase())) {
                    return value;
                } else {
                    return "";
                }
            });
            props.setFilterUsers(filteredUsers);
         // eslint-disable-next-line
        }, [q, props.users, props.setUsers]);


    const addToFriend = async (friend_id) => {
        await addFriend(props.user_id, friend_id, props.token, props.setUsers);
        await fetchAllUsers(props.user_id, props.setUsers, props.token);
    };
    const cancelRequestButton = async (friend_id) => {
        await cancelRequest(props.user_id, friend_id, props.token);
        await fetchAllUsers(props.user_id, props.setUsers, props.token);
    };


    return(
        <div className={'search-result-comp-container'}>

            <div className="search-filters">
                <div className={"search-filters-header"}>
                    <h2>Search results for</h2>
                    <p>{q}</p>
                </div>
                <h4>Filters</h4>
                <div className="search-filter active-filter">
                    <p>All</p>
                </div>
                <div className="search-filter">
                    <p>People</p>
                </div>
            </div>

            <div className="search-result-comp-content">

                {props.filterUsers.length > 0 &&
                    props.filterUsers.map((value) =>
                        <SearchResultCompContent value={value} addToFriend={addToFriend} cancelRequestButton={cancelRequestButton} key={value.user_id} />
                    )
                }
            </div>

        </div>
    )
}