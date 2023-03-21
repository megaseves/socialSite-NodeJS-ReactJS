import React, {useState} from 'react';
import axios from "axios";
import './UploadAvatar.css';

export function UploadAvatar(props) {

    const [file, setFile] = useState()
    const [caption, setCaption] = useState("avatar")

    const submit = async event => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("image", file)
        formData.append("caption", caption)
        formData.append("user_id", props.userDetail.user_id)
        await axios.post("http://localhost:8080/uploadAvatar", formData, { headers: {'Content-Type': 'multipart/form-data'}})
        window.location.assign("/profile");
    }

    const close = () => {
        const uploadForm = document.querySelector('.upload-avatar-form');
        const uploadContainer = document.querySelector('.upload-avatar-container');
        if (uploadForm.classList.contains("open")) {
            uploadForm.classList.remove("open");
            uploadContainer.classList.remove("open");
        }
    }

    return (
        <>
            <div className={'upload-avatar-container'} onClick={() => close()} >
            </div>
            <div className="upload-avatar-form">
                <form onSubmit={submit} onKeyDown={(e)=> e.key === 'Enter' && submit()}>
                    <div className="upload-comp">
                        <div className="upload-header">
                            <h3>Update profile picture</h3>
                        </div>

{/*                        <label className={"upload-btn"} htmlFor="file">+ Upload photo</label>
                        <input className={"upload-input"} name={"file"} id={"file"} onChange={e => setFile(e.target.files[0])} type="file" accept="image/*"></input>

                        <input hidden value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
                        <button className={"submit-btn"} type="submit">Upload</button>*/}

                         <div className={"new-drop-form"}>
                            <label htmlFor="images" className="drop-container">
                                <span className="drop-title">Drop files here</span>
                                or
                                <input type="file" id="images" accept="image/*" required onChange={e => setFile(e.target.files[0])} />
                                <input hidden value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
                            </label>
                        </div>
                        <button className={"submit-btn"} type="submit">Upload</button>
                    </div>


                </form>
            </div>
        </>
    )
}