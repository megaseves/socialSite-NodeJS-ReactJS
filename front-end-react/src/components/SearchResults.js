import React from 'react';
import './SearchResults.css';
import {useSearchParams} from "react-router-dom";

export function SearchResults(props) {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q') || '';

    // eslint-disable-next-line array-callback-return
    const filterUser = props.users && props.users.filter((value) => {
       if(q === "") {
            return "";
        } else if(value.username.toLowerCase().includes(q.toLowerCase())) {
            return value;
        }
    });

    return(
        <div className={'search-result-comp-container'}>
            <h2>Search</h2>
            <div className="search-result-comp-content">

                {filterUser.length > 0 &&
                    filterUser.map((value) => {
                        return (
                            <div className="search-result-comp-usernames" key={value.email} onClick={()=> window.location.assign(`/profile/${value.user_id}`)}>
                                <p className="search-result-name">{value.username}</p>
                                <span className="search-result-relation">Friend</span>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}