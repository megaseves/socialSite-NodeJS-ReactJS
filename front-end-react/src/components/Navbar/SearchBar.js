import React, {useEffect, useState} from "react";
import './SearchBar.css';
import {fetchAllUsers} from "../../api/ApiFetch";

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState("");

    useEffect(() => {
        fetchAllUsers(setUsers);
    }, []);

    const filterUser = users && users.filter((value) => {
       if(searchTerm === "") {
            return "";
        } else if(value.username.toLowerCase().includes(searchTerm.toLowerCase())) {
            return value;
        }
    })

    return (
        <div className={"search-bar-container"}>
            <label className={"search-bar-label"}>
                <input className={"search-bar"} type="text" placeholder={"Type to search..."} onChange={(event) => setSearchTerm(event.target.value)}/>
            </label>
            {filterUser !== "" ?
                <div className="search-result-container">
                    {
                        filterUser.slice(0,5).map((value) => {
                            return(
                                <div className="search-result" key={value.email}>
                                    <p className="search-result-name">{value.username}</p>
                                    <span className="search-result-relation">Friend</span>
                                </div>
                            )
                        })
                    }
                    {searchTerm &&
                         <div className="search-result">
                            <p className="search-result-more">Search: "{searchTerm}"</p>
                         </div>
                    }
                </div>
                :
                <></>
            }

        </div>
    );
}