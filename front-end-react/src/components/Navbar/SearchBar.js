import React, {useEffect, useRef, useState} from "react";
import './SearchBar.css';
import {addFriend, cancelRequest, fetchAllUsers} from "../../api/ApiFetch";

export function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isShowSearchBar, setIsShowSearchBar] = useState(false);
    const Q_LINK = () => { window.location.assign(`/search/people/?q=${searchTerm}`) };

    const addToFriend = (friend_id) => {
        addFriend(props.user_id, friend_id, props.token);
        window.location.reload();
    }
    const cancelRequestButton = (friend_id) => {
        cancelRequest(props.user_id, friend_id, props.token);
        window.location.reload();
    }

    let searchRef = useRef();

    useEffect( () => {
        fetchAllUsers(props.setUsers, props.token);
    }, [props.setUsers, props.token]);

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

                        filterUser.slice(0, 5).map((value) => {
                            return (
                                <div className={"sr-container"} key={value.user_id}>

                                    <div className="sr-container-header">
                                        <div className="search-result-avatar-container">
                                             <div className="search-result-avatar" style={{backgroundImage: `url(https://social-site-facebook-copy-project.s3.eu-central-1.amazonaws.com/${value.avatar})`}} ></div>
                                        </div>
                                        <div className="search-result" key={value.email} onClick={()=> window.location.assign(`/profile/${value.user_id}`)}>
                                            <p className="search-result-name">{value.username}</p>
                                            {value.user_id === props.user_id ?
                                                    <span className="search-result-relation">You</span>
                                                :
                                                value.friend_status === null ?
                                                    <>
                                                        <span className="search-result-relation">City: -</span>
                                                    </>

                                                :
                                                value.friend_status === 'request' ?
                                                    <>
                                                        <span className="search-result-relation">City: -</span>
                                                    </>
                                                :
                                                    <>
                                                    <span className="search-result-relation">Friend</span>
                                                    </>
                                            }
                                        </div>
                                    </div>

                                    <div className="add-friend-container" onClick={()=> window.location.assign(`/`)}>
                                        {value.friend_status === null ?
                                        <span className="search-result-add-friend" onClick={() => addToFriend(value.user_id)}>Add friend</span>
                                        :
                                        value.friend_status === 'request' ?
                                        <span className="search-result-add-friend" onClick={() => cancelRequestButton(value.user_id)} >Cancel request</span>
                                        :
                                        <span className="search-result-add-friend">Message</span>
                                        }
                                    </div>
                                </div>
                            )
                        })
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