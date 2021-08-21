import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PlayersCards from './PlayersCards';

export default function TeamDetails() {

    const email = localStorage.getItem("email");

    const [values, setValues] = useState({
        roles: [],
        team: {
            name: "",
            players: [],
            teamAdminEmail: "",
            teamImage: {
                data: ""
            }
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

    const img = values.team && values.team.teamImage && <img src={"data:image/png;base64," + values.team.teamImage.data} style={{width: 250, height: 250, marginTop: 50}} />

    console.log(img);

    const teamDetails = values.team ? <div>
        <h1 className="box-text">Players</h1>
        <PlayersCards players={values.team.players} />
    </div> : "";

    const withTeam = <div className="extra-container">
        <div className="left-part">
            {values.team && <p className="box-text">{values.team.name}</p>}
            {img}
        </div>
        <div className="right-part">
            {teamDetails}
        </div>
    </div>

    const unavailable = <div className="team-container">
        <h1 className="box-text">You don't have a team!</h1>
    </div>

    const notLogged = <div className="team-container">
        <h1 className="box-text">You are not logged!</h1>
    </div>

    const appLink = <Link to="applications" className="navbar-item">Applications</Link>

    return (
        <div className="form-container">
            <div className="team-details">
                <div className="navbar">
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="team" className="navbar-item">My Team</Link>
                            <Link to="create-team" className="navbar-item">Create a Team</Link>
                            <Link to="team-search" className="navbar-item">Search</Link>
                            {values.team && values.team.teamAdminEmail === window.localStorage.getItem("email") && appLink}
                        </div>
                    </div>
                </div>
                {values.team ? values.team.name ? withTeam : notLogged : unavailable}
                {/* <div className="extra-container">
                    <div className="left-part">
                        {values.team && <p className="box-text">{values.team.name}</p>}
                        {img}
                    </div>
                    <div className="right-part">
                        {teamDetails}
                    </div>
                </div> */}
            </div>
        </div>
    )
}
