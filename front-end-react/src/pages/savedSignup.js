import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {apiFetch} from "../api/ApiFetch";


export default function Signup() {
    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


    const [username, setUsername] = useState(false);
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);


    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=> {
        userRef.current.focus();
    }, []);

    useEffect(()=> {
        const result = USER_REGEX.test(username);
        console.log(result);
        console.log(username);
        setValidUsername(result);
    }, [username]);


    /*
        const onSubmit = (values) => {
            console.log("submitted");
            console.log(values);
        }
        const { values, handleBlur, handleChange, handleSubmit } = useFormik({
            initialValues: {
                username: "",
                email: "",
                password: ""
            },
            onSubmit,
        });



        const fetchSignUp = async () => {
            try {
                axios({
                    method: "post",
                    url: "http://localhost:8080/users",
                    headers: {'Content-Type': 'application/json'},
                    data: values
                })
                await apiFetch(values);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                } else {
                    console.log(err.message)
                }
            }
        }
    */
    return(
        <div className={'form-container'}>
            <h2>Register</h2>

            <div className={'get-form'}>
                <form onSubmit={handleSubmit}>

                    <p>Username</p>
                    <input ref={userRef} required  autoComplete={'off'} aria-invalid={validUsername ? "false" : "true"} aria-describedby={'uidnote'} value={username} onBlur={() => setUsernameFocus(false)} onChange={(e) => setUsername(e.target.value)} id={'username'} type={'text'} name={'username'} placeholder={'Enter your username'} />


                    <p>Email</p>
                    <input value={email} onBlur={handleBlur} onChange={handleChange} id={'email'} type={'email'} name={'email'} placeholder={'Enter your email'} />

                    <p>Password</p>
                    <input value={values.password} onBlur={handleBlur} onChange={handleChange} id={'password'} type={'password'} name={'password'} placeholder={'Enter your password'} />


                    <button type={'submit'} onClick={async event => {
                        event.preventDefault();
                        await fetchSignUp().then(()=>navigate('/'));

                    }
                    }>Submit</button>

                </form>
            </div>
        </div>
    )
}