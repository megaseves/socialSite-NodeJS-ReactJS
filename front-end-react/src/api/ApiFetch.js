import axios from "axios";

export async function fetchAllUsers(user_id, setUsers, token) {
    try {
        await axios({
            method: "get",
            url: `http://localhost:8080/users`,
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: user_id
            }
        }).then(data => {
            if (data.data.length > 0) {

                //let users = data.data.result;
                //console.log(users)

                setUsers(data.data);
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

export async function apiFetch(values, setErr, signIn) {
    try {
        axios({
            method: "post",
            url: "http://localhost:8080/login",
            data: values
        }).then(data => {
            if(data.status !== 200) {
                //console.log(data.data.message);
                setErr(data.data.message);
            } else if (data.status === 200) {
                console.log(data.data.accessToken);
                const userToken = data.data.accessToken;

                signIn({
                    token: userToken,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { email: values.email}
                })
                 //cookies.set('token', userToken);
                //localStorage.setItem("username", user.username);
                //localStorage.setItem("id", user.user_id);
                window.open('/', '_self');
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

export async function fetchProfile(id, setUser, token) {
    try {
        axios({
            method: "get",
            url: `http://localhost:8080/profile?id=${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async data => {
            setUser(data.data);
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
export async function convertImage(imageName, setUrl) {
    try {
        axios({
            method: "get",
            url: "http://localhost:8080/convertImageToURL",
            headers: {
                'Content-Type': 'application/json',
                imageurl: imageName
            }
        }).then(data => {
            if(data.status !== 200) {
                console.log("Nem jo valami");
            } else if (data.status === 200) {
                console.log(data.data);
                setUrl(data.data.imageURL);
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

export async function convertImageToURL(imageName, setUrl, token) {
    try {
        axios({
            method: "get",
            url: `http://localhost:8080/convertImageToURL`,
            headers: {
                Authorization: `Bearer ${token}`,
                imageURL: imageName
            }
        }).then(data => {
            console.log(data.data.imageURL);
            //setUrl(data.data.imageURL);
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

export async function fetchProfileById(id, setUser) {
    try {
        axios({
            method: "get",
            url: `http://localhost:8080/profile/id/?id=${id}`
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



export async function checkEmail(registerData, setErr, signIn) {
        try {
            axios({
                method: "post",
                url: "http://localhost:8080/check-register",
                headers: {'Content-Type': 'application/json'},
                data: registerData
            }).then(data => {

                if (data.status === 200) {
                    console.log("MICSODAAA")
                    fetchSignUp(registerData, setErr, signIn);
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

export async function fetchSignUp(registerData, setErr, signIn) {
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
                if (data.status === 200) {
                    console.log("YES")
                    console.log(registerData)
                    apiFetch(registerData, setErr, signIn);
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


export async function addFriend(user_id, friend_id, token) {
        try {
            axios({
                method: "post",
                url: "http://localhost:8080/addFriend",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    user_id: user_id,
                    friend_id: friend_id
                }
            }).then(data => {
                if (data.status === 200) {
                    console.log(data);
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

export async function cancelRequest(user_id, friend_id, token) {
        try {
            axios({
                method: "post",
                url: "http://localhost:8080/cancelRequest",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    user_id: user_id,
                    friend_id: friend_id
                }
            }).then(data => {
                if (data.status === 200) {
                    console.log(data);
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

export async function getAllFriend(user_id, token, setFriends) {
    try {
        axios({
            method: "get",
            url: `http://localhost:8080/friends`,
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: user_id
            }
        }).then(data => {
            //console.log(data.data);
            setFriends(data.data)
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