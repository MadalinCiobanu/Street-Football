import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import UsernameImageCreator from './UsernameImageCreator'

export default function UserDetails() {

    const email = localStorage.getItem("email");

    const [values, setValues] = useState({
        roles: [],
        team: {
            name: ""
        }
    });

    // const [password, setPassword] = useState({
    //     old: "",
    //     password: "",
    //     confirmPassword: ""
    // })

    // const [editing, setEditing] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${email}`, {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
          })
        .then(res => {
            console.log(res.data);
            setValues(res.data);
        })
    }, []);


    return (
        <div className="form-container">
            <div className="user-details">
                <div className="user-details-first-part">
                    {UsernameImageCreator("mad co")}
                </div>
                <div className="user-details-second-part">
                    <h1 className="box-text">User Details</h1>
                    <div className="user-details-values">
                        <p>First Name: <span>{values.firstName}</span></p>
                        <p>Last Name: <span>{values.lastName}</span></p>
                        <p>Email: <span>{values.email}</span></p>
                        <p>Phone Number: <span>{values.phone}</span></p>
                        <p>Team: <span>{values.team === null ? "None": values.team.name}</span></p>
                        <p>Role: <span>{values.roles[0] === "USER_ROLE" ? "Member" : "Admin"}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
