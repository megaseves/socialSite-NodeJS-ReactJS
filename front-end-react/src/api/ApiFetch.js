import axios from "axios";

export async function fetchAllUsers(setUsers) {
    try {
        axios({
            method: "get",
            url: `http://localhost:8080/users`
        }).then(data => {
            if (data.data.ok) {
                setUsers(data.data.result);
                console.log(data.data.result);
            } else {
                setUsers("");
            }

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

export async function apiFetch(values, setErr) {
    try {
        axios({
            method: "post",
            url: "http://localhost:8080/login",
            data: values
        }).then(data => {
            if(!data.data.ok) {
                //console.log(data.data.message);
                setErr(data.data.message);
            } else {
                const user = data.data.result[0];
                console.log(user)
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

export async function checkEmail(registerData, setErr) {
        try {
            axios({
                method: "post",
                url: "http://localhost:8080/check-register",
                headers: {'Content-Type': 'application/json'},
                data: registerData
            }).then(data => {
                console.log(data.data.ok)

                if (data.data.ok) {
                    console.log("MICSODAAA")
                    fetchSignUp(registerData, setErr);
                } else {
                    setErr(data.data.message);
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

export async function fetchSignUp(registerData, setErr) {
        try {
            axios({
                method: "post",
                url: "http://localhost:8080/users",
                headers: {'Content-Type': 'application/json'},
                data: registerData
            }).then(data => {
                //console.log(data.data.ok);
                //console.log(data.data.message);
                console.log("HETEEE");
                if (data.data.ok) {
                    console.log(registerData)
                    apiFetch(registerData, setErr);
                }
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