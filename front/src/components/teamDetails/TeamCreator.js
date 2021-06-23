import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddTeam from './AddTeam';

export default function TeamDetails() {

    const email = localStorage.getItem("email");

    const [values, setValues] = useState({
        team: {
            name: ""
        }
    });

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

    const { team, handleChange, handleSubmit, errors } = AddTeam();

    const unavailable = <div className="team-container">
            <h1 className="box-text">You already have a team!</h1>
        </div>

    const form = <div className="team-container">
        <div>
            <h1 className="small-title">Add Team</h1>
            <form className="margin-top" onSubmit={handleSubmit}>
                <input className="input margin-top"
                name="name"
                placeholder="Team Name"
                onChange={handleChange}
                value={team.name}/>
                {errors.name && <p>{errors.name}</p>}
                <button className="button is-medium margin-top" type="submit">Submit</button>
            </form>
        </div>
    </div>;

    return (
        <div className="form-container">
            <div className="team-details">
                <div className="navbar">
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="team" className="navbar-item">My Team</Link>
                            <Link to="create-team" className="navbar-item">Create a Team</Link>
                            <Link to="team-search" className="navbar-item">Search</Link>
                        </div>
                    </div>
                </div>
                {values.team == null ? form : unavailable}
            </div>           
        </div>
    )
}