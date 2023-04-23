import React from 'react';

export function GeneralSettings({userDetail}) {
    return(
        <>
            <div className="settings-content-header">
                    <h3>General profile settings</h3>
                </div>
                <div className="settings-content-container">

                    <div className="settings-content">
                        <h5 className={"settings-content-title"}>Name</h5><p className={"settings-user-detail"}>{userDetail.username}</p><a className={"settings-edit"} href="/">Edit</a>
                    </div>
                    <div className="settings-content">
                        <h5 className={"settings-content-title"}>Age</h5><p className={"settings-user-detail"}>-</p><a className={"settings-edit"} href="/">Edit</a>
                    </div>
                    <div className="settings-content">
                        <h5 className={"settings-content-title"}>City</h5><p className={"settings-user-detail"}>-</p><a className={"settings-edit"} href="/">Edit</a>
                    </div>

                </div>

        </>
    )
}