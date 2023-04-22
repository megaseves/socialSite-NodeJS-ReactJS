import React from 'react';
import {Link, useLocation} from "react-router-dom";

export function MenuLinkOnProfile(props) {
    const location = useLocation();
    const isActive = location.pathname === props.to;
    const btnClass = isActive ? "tab-menu-link active" : "tab-menu-link";

    return(
        <Link to={props.to}>
            <div className={btnClass}>{props.title}</div>
        </Link>
    )
}