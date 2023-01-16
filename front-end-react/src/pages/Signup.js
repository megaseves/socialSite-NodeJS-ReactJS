import React from 'react';
import {useFormik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {checkLogin} from "../api/CheckLogin";


export default function Signup() {
    const navigate = useNavigate();

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
            await checkLogin(values);
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
            } else {
                console.log(err.message)
            }
        }
    }

    return(
        <div className={'form-container'}>
            <h2>Register</h2>

            <div className={'get-form'}>
                <form onSubmit={handleSubmit}>

                    <p>Username</p>
                    <input value={values.username} onBlur={handleBlur} onChange={handleChange} id={'username'} type={'text'} name={'username'} placeholder={'Enter your username'} />

                    <p>Email</p>
                    <input value={values.email} onBlur={handleBlur} onChange={handleChange} id={'email'} type={'email'} name={'email'} placeholder={'Enter your email'} />

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