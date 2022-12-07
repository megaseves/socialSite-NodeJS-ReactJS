import React, { useState } from 'react';
import { useFormik } from "formik";
import api from '../api/users';
import axios from "axios";


export function Home() {
    const [users, setUsers] = useState([]);

    const onSubmit = (values) => {
        console.log("submitted");
        console.log(values);
    }
    const { values, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            age: ""
        },
        onSubmit,
    });




    const fetchUsers = async () => {
        try {
            const response = await api.get('users');
            setUsers(response.data);
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
            } else {
                console.log(err.message)
            }

        }
    }
    fetchUsers()


    const fetchPostUsers = async () => {
        try {
            axios({
                method: "post",
                url: "http://localhost:8080/users",
                headers: {'Content-Type': 'application/json'},
                data: values
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
        <div className={'home-container'}>
            <h1>Hello ...</h1>
            {
                users.map(user =>
                    <div className={'name-card'} key={user.id}>
                        <h3>{user.username}</h3>
                        <p>{user.email}</p>
                    </div>)
            }
            <div className={'post-form'}>
                <form onSubmit={handleSubmit}>
                    <h3>Add new user</h3>

                    <p>Name</p>
                    <input value={values.name} onBlur={handleBlur} onChange={handleChange} id={'name'} type={'text'} name={'name'} placeholder={'Enter your name'} />

                    <p>Age</p>
                    <input value={values.age} onBlur={handleBlur} onChange={handleChange} id={'age'} type={'number'} name={'age'} placeholder={'Enter your age'} />


                    <button type={'submit'} onClick={async event => {
                        event.preventDefault();
                        fetchPostUsers();
                    }
                    }>Submit</button>
                </form>
            </div>
        </div>
    )
}
