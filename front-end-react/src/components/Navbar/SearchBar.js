import React, {useState} from "react";
import './SearchBar.css';

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className={"search-bar-container"}>
            <label className={"search-bar-label"}>
                <input className={"search-bar"} type="text" placeholder={"Type to search..."} onChange={(event) => setSearchTerm(event.target.value)}/>
            </label>
            <div className="search-result-container hide">
                <div className="search-result"><p className="search-result-name">Kaki</p><span className="search-result-relation">Friend</span></div>
                <div className="search-result"><p className="search-result-name">Kaki</p><span className="search-result-relation">Friend</span></div>
                <div className="search-result"><p className="search-result-name">Kaki</p><span className="search-result-relation">Friend</span></div>
            </div>
        </div>
    );
}