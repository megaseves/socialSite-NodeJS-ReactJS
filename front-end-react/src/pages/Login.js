import React from 'react';
import {useFormik} from "formik";
import './Form.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Login(props) {

    const navigate = useNavigate();

    const { values, handleBlur, handleChange } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

    });

    const login = async () => {
        try {
            axios({
                method: "post",
                url: "http://localhost:8080/login",
                data: values
            }).then(data => {
                const user = data.data.rows[0];
                console.log(user.email);
                console.log(user.username);
                //props.setEmail(user.email);
                //props.setUsername(user.username);
                localStorage.setItem("username", user.username);
                navigate('/');
                window.location.reload(false);
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


    return (
        <div className={'form-container'}>
            <h2>Login</h2>

            <div className={'get-form'}>
                <form>

                    <p>Email</p>
                    <input value={values.email} onBlur={handleBlur} onChange={handleChange} id={'email'} type={'email'} name={'email'} placeholder={'Enter your email'} />

                    <p>Password</p>
                    <input value={values.password} onBlur={handleBlur} onChange={handleChange} id={'password'} type={'password'} name={'password'} placeholder={'Enter your password'} />

                    <a href="/" className={'forgot-password'}>Forgot password?</a>
                    <button type={'submit'} onClick={async event => {
                        event.preventDefault();
                        await login();
                    }
                    }>Submit</button>
                </form>
                <a href={"/signup"} className={'signup-link'}>Create an account</a>
            </div>
        </div>
    )
}