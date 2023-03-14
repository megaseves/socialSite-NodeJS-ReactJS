import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";



export default function Signup() {
    const navigate = useNavigate();

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    //const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{8,24}$/;


    const { register, formState: {errors}, handleSubmit,} = useForm();
    const onSubmit = (data) => {
        console.log(data)
    };


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
                <form onSubmit={handleSubmit(onSubmit)} >

                    <p>Username</p>
                    <input placeholder={"Enter your username..."}
                        {...register("name",{required: true, minLength: 4, maxLength: 14})} />
                    <error className={"error"}>
                        <p>{errors.name?.type === "required" && "Name is required!"}</p>
                        <p>{errors.name?.type === "minLength" && "Username should be in 4-14 letters!"}</p>
                        <p>{errors.name?.type === "maxLength" && "Username should be in 4-14 letters!"}</p>
                    </error>

                    <p>Email</p>
                    <input placeholder={"Enter your email..."}
                        {...register("email", {required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/})}/>
                    <error className={"error"}>
                        <p>{errors.email?.type === "required" && "Email is required!"}</p>
                        <p>{errors.email?.type === "pattern" && "Entered email is in wrong format! Example: example@gmail.com"}</p>
                    </error>


                    <p>Password</p>
                    <input type={"password"} placeholder={"Enter your password..."}
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,24}$/})}/>
                    <error className={"error"}>
                        <p>{errors.password?.type === "required" && "Password is required!"}</p>
                        <p>{errors.password?.type === "pattern" && "Password should contain Capital, small letter and min 8 character!"}</p>
                    </error>

                    <button type={'submit'} >Submit</button>

                </form>
            </div>
        </div>
    )
}