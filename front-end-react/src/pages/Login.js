import React, {useState} from 'react';
import {useFormik} from "formik";
import './Form.css';
import {apiFetch} from "../api/ApiFetch";
import {useSignIn} from "react-auth-kit";

export function Login(props) {

    const [err, setErr] = useState('');
    const signIn = useSignIn();

    const { values, handleBlur, handleChange } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

    });

    return (
        <div className={'form-container'}>
            <h2>Login</h2>
            {err?
                <p className={'err-message'}>{err}</p>
                :
                <p></p>
            }
            <div className={'get-form'}>
                <form>

                    <p className={"form-text"}>Email</p>
                    <input value={values.email} onBlur={handleBlur} onChange={handleChange} id={'email'} type={'email'} name={'email'} placeholder={'Enter your email'} />

                    <p className={"form-text"}>Password</p>
                    <input value={values.password} onBlur={handleBlur} onChange={handleChange} id={'password'} type={'password'} name={'password'} placeholder={'Enter your password'} />

                    <a href="/" className={'forgot-password'}>Forgot password?</a>
                    <button type={'submit'} onClick={async event => {
                        event.preventDefault();
                        await apiFetch(values, setErr, signIn);
                    }
                    }>Submit</button>
                </form>
                <a href={"/signup"} className={'signup-link'}>Create an account</a>
            </div>
        </div>
    )
}
