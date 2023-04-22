import React, {useEffect, useRef, useState} from "react";
import './SearchBar.css';
import {fetchAllUsers} from "../../api/ApiFetch";
import {SearchBarResult} from "./SearchBarResult";

export function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isShowSearchBar, setIsShowSearchBar] = useState(false);
    const Q_LINK = () => { window.location.assign(`/search/people/?q=${searchTerm}`) };

    //console.log(props.users)


    let searchRef = useRef();

    useEffect( () => {
        fetchAllUsers(props.user_id, props.setUsers, props.token);
    }, [props.setUsers, props.token, props.user_id]);

    // eslint-disable-next-line array-callback-return
    const filterUser = props.users && props.users.filter((value) => {
       if(searchTerm === "") {
            return "";
        } else if(value.username.toLowerCase().includes(searchTerm.toLowerCase())) {
            return value;
        }
    });

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
        <>
        <div className={"search-bar-container"}>
            <label className={"search-bar-label"}>
                <input ref={searchRef} className={"search-bar"} type="text" placeholder={"Type to search..."} onKeyDown={(e)=> e.key === 'Enter' && Q_LINK()}
                       onChange={(event) => setSearchTerm(event.target.value)} onClick={()=> setIsShowSearchBar(true)} />
            </label>
            {isShowSearchBar &&

                <div ref={searchRef} className="search-result-container">

                    {filterUser.length > 0 || searchTerm.length > 0 ?

                        filterUser.slice(0, 5).map((value) =>
                            <SearchBarResult value={value} addToFriend={props.addToFriend} cancelRequestButton={props.cancelRequestButton} key={value.user_id} />
                        )
                    :
                        <p className={"search-result-history-text"}>There is no history!</p>
                    }
                    {searchTerm &&
                        <div className={"sr-container"}>
                             <div id={"search-more"} className="search-result" onClick={Q_LINK}>
                                <p className="search-result-more">Search: "{searchTerm}"</p>
                             </div>
                        </div>
                    }
                </div>
            }

        </div>
        </>
    )
}