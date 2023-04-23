import React, {useEffect, useState} from 'react';
import './Settings.css';
import {faShield, faUser, faWrench} from "@fortawesome/free-solid-svg-icons";
import {useSearchParams} from "react-router-dom";
import {GeneralSettings} from "./GeneralSettings/GeneralSettings";
import {AccountSettings} from "./AccountSettings/AccountSettings";
import {Security} from "./Security/Security";
import {SettingMenuList} from "./SettingMenuList/SettingMenuList";

export function Settings({userDetail}) {
    const [settingTerm, setSettingTerm] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get('tab') || '';

    useEffect(() => {
        if (tab === '') {
            window.location.assign("?tab=profile");
        }
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setSettingTerm(tab);
    }, [tab]);

    return (
        <div className="settings">
            <div className="search-filters">
                <div className={"search-filters-header friends-container-header"}>
                    <h2>Settings</h2>
                </div>

                <div className="setting-menu-btns">
                    <SettingMenuList userDetail={userDetail} setSearchParams={setSearchParams} icon={faUser} title={userDetail.username} param={"tab=profile"}/>
                    <SettingMenuList userDetail={userDetail} setSearchParams={setSearchParams} icon={faWrench}  title={"Account Settings"} param={"tab=account"}/>
                    <SettingMenuList userDetail={userDetail} setSearchParams={setSearchParams} icon={faShield}  title={"Security and login"} param={"tab=security"}/>
                </div>

            </div>

            <div className="settings-container">

                {settingTerm === 'profile' ?
                    <GeneralSettings userDetail={userDetail} />
                    :
                settingTerm === 'account' ?
                    <AccountSettings userDetail={userDetail} />
                        :
                settingTerm === 'security' ?
                    <Security userDetail={userDetail} />
                    :
                    <></>
                }

            </div>

        </div>
    )
}