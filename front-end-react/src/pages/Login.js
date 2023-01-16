import React from 'react';
import {useFormik} from "formik";
import './Form.css';
import {checkLogin} from "../api/CheckLogin";

export function Login() {

    const { values, handleBlur, handleChange } = useFormik({
        initialValues: {
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

                    <a href="/" className={'forgot-password'}>Forgot password?</a>
                    <button type={'submit'} onClick={async event => {
                        event.preventDefault();
                        await checkLogin(values);
                    }
                    }>Submit</button>
                </form>
                <a href={"/signup"} className={'signup-link'}>Create an account</a>
            </div>
        </div>
    )
}
