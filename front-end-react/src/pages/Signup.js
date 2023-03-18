import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import {checkEmail} from "../api/ApiFetch";



export default function Signup(props) {

    const { register, formState: {errors}, handleSubmit,} = useForm();
    const [err, setErr] = useState();

    const onSubmit = (registerData) => {
        checkEmail(registerData, setErr, props.signIn);
        console.log(err)
    };

    return(
        <div className={'form-container'}>
            <h2>Register</h2>

            <div className={'get-form'}>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <p className={"form-header"}>Username</p>
                    <input placeholder={"Enter your username..."}
                        {...register("username",{required: true, minLength: 4, maxLength: 14})} />
                    <error className={"error"}>
                        <p>{errors.username?.type === "required" && "Username is required!"}</p>
                        <p>{errors.username?.type === "minLength" && "Username should be in 4-14 letters!"}</p>
                        <p>{errors.username?.type === "maxLength" && "Username should be in 4-14 letters!"}</p>
                    </error>

                    <p className={"form-header"}>Email</p>
                    <input placeholder={"Enter your email..."}
                        {...register("email", {required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/})}/>
                    <error className={"error"}>
                        <p>{errors.email?.type === "required" && "Email is required!"}</p>
                        <p>{errors.email?.type === "pattern" && "Entered email is in wrong format! Example: example@gmail.com"}</p>
                    </error>
                    {err?
                        <p className={'err-message'}>{err}</p>
                        :
                        <p></p>
                    }

                    <p className={"form-header"}>Password</p>
                    <input type={"password"} placeholder={"Enter your password..."}
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,24}$/})}/>
                    <error className={"error"}>
                        <p>{errors.password?.type === "required" && "Password is required!"}</p>
                        <p>{errors.password?.type === "pattern" && "Password should contain Capital, small letter and min 8 character!"}</p>
                    </error>

                    <button type={'submit'}>Submit</button>

                </form>

            </div>
        </div>
    )
}