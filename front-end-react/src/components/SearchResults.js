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
                            <div className="search-result-comp-usernames" key={value.email}  >
                                <div className="search-result-header">
                                    <span className="search-result-comp-name" onClick={()=> window.location.assign(`/profile/${value.user_id}`)} >{value.username}</span>
                                    <span className="search-result-add-friend">Add friend</span>
                                </div>

                                <div className="search-result-details">
                                    <span className="search-result-relation">Friend</span>
                                    <span className="search-result-city">~ City: -</span>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}