import React, {useEffect} from 'react';
import './SearchResults.css';
import {useSearchParams} from "react-router-dom";
import {SearchResultCompContent} from "./SearchResultCompContent";

export function SearchResults(props) {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') || '';

    //console.log(props.users)


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
                        <SearchResultCompContent value={value} addToFriend={props.addToFriend} cancelRequestButton={props.cancelRequestButton} key={value.user_id} />
                    )
                }
            </div>

        </div>
    )
}