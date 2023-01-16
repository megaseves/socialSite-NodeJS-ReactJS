import axios from "axios";

export async function checkLogin(values) {
    try {
        axios({
            method: "post",
            url: "http://localhost:8080/login",
            data: values
        }).then(data => {
            console.log(data.data[0])
            const user = data.data[0];
            localStorage.setItem("username", user.username);
            window.open('/', '_self')
            //window.location.reload(false);
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