import React from 'react';
import {useFormik} from "formik";
import './Form.css';

export function Login() {

    const { values, handleBlur, handleChange } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },

    });

    return (
        <div className={'form-container'}>
            <h2>Login</h2>

            <div className={'get-form'}>
                <form>

                    <p>Email</p>
                    <input value={values.email} onBlur={handleBlur} onChange={handleChange} id={'email'} type={'email'} name={'email'} placeholder={'Enter your email'} />

                    <p>Password</p>
                    <input value={values.password} onBlur={handleBlur} onChange={handleChange} id={'password'} type={'password'} name={'password'} placeholder={'Enter your password'} />


                    <button type={'submit'} onClick={async event => {
                        event.preventDefault();
                    }
                    }>Submit</button>
                </form>
                <span>Forgot <a href="/">password</a>?</span>
            </div>
        </div>
    )
}