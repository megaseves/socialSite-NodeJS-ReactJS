import React from 'react';

export function AccountSettings({userDetail}) {
    return(
        <>
            <div className="settings-content-header">
                    <h3>Account settings</h3>
                </div>
                <div className="settings-content-container">

                    <div className="settings-content">
                        <h5 className={"settings-content-title"}>Name</h5><p className={"settings-user-detail"}>{userDetail.username}</p><a className={"settings-edit"} href="/">Edit</a>
                    </div>
                    <div className="settings-content">
                        <h5 className={"settings-content-title"}>E-mail</h5><p className={"settings-user-detail"}>{userDetail.email}</p><a className={"settings-edit"} href="/">Edit</a>
                    </div>
                    <div className="settings-content warning">
                        <h5>Delete account</h5>
                    </div>

                </div>

        </>
    )
}