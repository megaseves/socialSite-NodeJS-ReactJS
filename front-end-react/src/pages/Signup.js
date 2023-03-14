import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";



export default function Signup() {
    const navigate = useNavigate();

    const userRef = useRef();
    const emailRef = useRef();
    const pwdRef = useRef();

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    //const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;

    useEffect(()=> {
        userRef.current.focus();
    }, []);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);


    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(()=> {
       setValidUsername(isValidUsername);
       setValidPassword(isValidPassword);
       setValidEmail(isValidEmail);
       console.log(email)
    }, [username, password, email, usernameFocus, passwordFocus, emailFocus]);

    const isValidUsername = () => {
        return username && USER_REGEX.test(username) && usernameFocus;
    }
    const isValidEmail = () => {
        return email && EMAIL_REGEX.test(email) && emailFocus;
    }

    const isValidPassword = () => {
        return password && PWD_REGEX.test(password) && passwordFocus;
    }

    useEffect(()=> {
        setErrMsg('');
    }, [username])

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

            <p className={errMsg ? "error" : "hide"} aria-live={'assertive'}>{errMsg}</p>

            <div className={'get-form'}>
                <form>

                    <p>Username</p>
                    <div className={!validUsername ?  "hide" : "correct-data"} ></div>
                    <input ref={userRef} required autoComplete={'off'} aria-describedby={'uidnote'} aria-invalid={validUsername? "false" : "true"} onChange={(e) => setUsername(e.target.value)} onFocus={()=> setUsernameFocus(true) } onBlur={()=> setUsernameFocus(false)} type={'text'} name={'username'} placeholder={'Enter your username'} />
                    <p id={'uidnote'} className={usernameFocus && username && !validUsername ? "error" : "hide"}>Must begin with a letter <br/>4 to 24 characters</p>

                    <p>Email</p>
                    <div className={!validEmail ?  "hide" : "correct-data"} ></div>
                    <input ref={emailRef} required autoComplete={'off'} aria-describedby={'uidnote'} aria-invalid={validEmail? "false" : "true"} onChange={(e) => setEmail(e.target.value)} onFocus={()=> setEmailFocus(true) } onBlur={()=> setEmailFocus(false)} type={'text'} name={'email'} placeholder={'Enter your email'} />
                    <p id={'uidnote'} className={emailFocus && email && !validEmail ? "error" : "hide"}>Must begin with a letter <br/>4 to 24 characters</p>

                    <p>Password</p>
                    <div className={!validPassword ?  "hide" : "correct-data"} ></div>
                    <input ref={pwdRef} required autoComplete={'off'} aria-describedby={'uidnote'} aria-invalid={validPassword? "false" : "true"} onChange={(e) => setPassword(e.target.value)} onFocus={()=> setPasswordFocus(true) } onBlur={()=> setPasswordFocus(false)} type={'password'} name={'password'} placeholder={'Enter your password'} />
                    <p id={'uidnote'} className={passwordFocus && password && !validPassword ? "error" : "hide"}>Kaki</p>


                    <button type={'submit'} onClick={async event => {
                        event.preventDefault();
                        navigate('/');
                    }
                    }>Submit</button>

                </form>
            </div>
        </div>
    )
}