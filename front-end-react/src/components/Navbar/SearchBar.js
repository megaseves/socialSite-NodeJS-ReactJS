import React, {useEffect, useRef, useState} from "react";
import './SearchBar.css';
import {fetchAllUsers} from "../../api/ApiFetch";

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState("");
    const [isShowSearchBar, setIsShowSearchBar] = useState(false);

    let searchRef = useRef();

    useEffect(() => {
        fetchAllUsers(setUsers);
    }, []);

    // eslint-disable-next-line array-callback-return
    const filterUser = users && users.filter((value) => {
       if(searchTerm === "") {
            return "";
        } else if(value.username.toLowerCase().includes(searchTerm.toLowerCase())) {
            return value;
        }
    })

    useEffect(() => {
        let handler = (event) => {
            if (!searchRef.current.contains(event.target)) {
                setIsShowSearchBar(false);
            }
        }
       document.addEventListener("mousedown", handler);

       return () => {
           document.removeEventListener("mousedown", handler);
       }
    });
    return (
        <div className={"search-bar-container"}>
            <label className={"search-bar-label"}>
                <input ref={searchRef} className={"search-bar"} type="text" placeholder={"Type to search..."} onChange={(event) => setSearchTerm(event.target.value)} onClick={()=> setIsShowSearchBar(true)} />
            </label>
            {isShowSearchBar &&

                <div ref={searchRef} className="search-result-container">

                    {filterUser.length > 0 || searchTerm.length > 0 ?

                        filterUser.slice(0, 5).map((value) => {
                            return (
                                <div className="search-result" key={value.email} onClick={()=> window.location.assign(`/profile/${value.user_id}`)}>
                                    <p className="search-result-name">{value.username}</p>
                                    <span className="search-result-relation">Friend</span>
                                </div>
                            )
                        })
                    :
                        <p className={"search-result-history-text"}>There is no history!</p>
                    }
                    {searchTerm &&
                         <div className="search-result">
                            <p className="search-result-more">Search: "{searchTerm}"</p>
                         </div>
                    }
                </div>
            }

        </div>
    );
}