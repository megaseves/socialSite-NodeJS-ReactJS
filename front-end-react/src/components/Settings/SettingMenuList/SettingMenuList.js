import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useLocation} from "react-router-dom";

export function SettingMenuList({setSearchParams, param, title, icon}) {
    const location = useLocation();
    const isActive = location.search === '?'+param;
    const btnClass = isActive ? "search-filter search-filter-settings active-filter" : "search-filter search-filter-settings";

    return(
        <div className={btnClass} onClick={() => setSearchParams(param)}>
            <FontAwesomeIcon icon={icon} /><p>{title}</p>
        </div>
    )
}