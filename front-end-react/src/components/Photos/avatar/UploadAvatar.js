import React, {useState} from 'react';
import axios from "axios";

export function UploadAvatar(props) {

    const [file, setFile] = useState()
    const [caption, setCaption] = useState("")

    const submit = async event => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("image", file)
    formData.append("caption", caption)
    formData.append("user_id", props.userDetail.user_id)
    await axios.post("http://localhost:8080/uploadAvatar", formData, { headers: {'Content-Type': 'multipart/form-data'}})
    }

    return (
        <div className={'form-container'}>
            <form onSubmit={submit}>
                <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*"></input>
                <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}