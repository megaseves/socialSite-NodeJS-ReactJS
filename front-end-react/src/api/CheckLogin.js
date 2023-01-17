import axios from "axios";

export async function checkLogin(values, setErr) {
    try {
        axios({
            method: "post",
            url: "http://localhost:8080/login",
            data: values
        }).then(data => {
            if(data.data.message) {
                //console.log(data.data.message);
                setErr(data.data.message);
            } else {
                const user = data.data[0];
                localStorage.setItem("username", user.username);
                localStorage.setItem("id", user.user_id);
                window.open('/', '_self')
                //window.location.reload(false);
            }
        })

    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
        } else {
            console.log(err.message)
        }
    }
}

export async function fetchProfile(id, setUser) {
    try {
        axios({
            method: "get",
            url: `http://localhost:8080/profile?id=${id}`
        }).then(data => {
            setUser(data.data);
            //console.log(data.data);
        })
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
        } else {
            console.log(err.message);
        }
    }
}