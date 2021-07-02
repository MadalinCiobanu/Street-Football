import React from 'react'
import UsernameImageCreator from '../UsernameImageCreator'
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function UserDetails() {

    const email = localStorage.getItem("email");

    const history = useHistory();

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        roles: [],
        team: {
            name: ""
        }
    });

    const [name, setName] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${email}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
            })
        .then(res => {
            console.log(res.data);
            setValues(res.data);
            setName(res.data.firstName + " " + res.data.lastName)
        })
    }, []);

    return (
        <div className="form-container">
            <div className="user-details">
                <div className="left-part">
                    {UsernameImageCreator(name, 250)}
                    <button className="button is-light is-medium"
                        onClick={ () => {
                            history.push("/user-edit");
                        }}
                    >Edit Profile</button>
                    <button className="button is-light is-medium"
                        onClick={ () => {
                            history.push("/team")
                        }}
                        >
                        Team Details
                    </button>
                </div>
                <div className="right-part">
                    <h1 className="box-text">User Details</h1>
                    <div className="user-details-values">
                        <p>First Name: <span>{values.firstName}</span></p>
                        <p>Last Name: <span>{values.lastName}</span></p>
                        <p>Email: <span>{values.email}</span></p>
                        <p>Phone: <span>{values.phone}</span></p>
                        <p>Team: <span>{values.team === null ? "None": values.team.name}</span></p>
                        <p>Role: <span>{values.roles[0] === "USER_ROLE" ? "Member" : "Admin"}</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
