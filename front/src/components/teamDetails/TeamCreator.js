import React from 'react';
import { Link } from "react-router-dom";
import AddTeam from './AddTeam';

export default function TeamCreator() {

    const { team, handleChange, handleSubmit, errors, uploadImage } = AddTeam();

    const unavailable = <div className="team-container">
            <h1 className="box-text">You already have a team!</h1>
        </div>

    const notLogged = <div className="team-container">
            <h1 className="box-text">You are not logged!</h1>
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
                <div>
                    <input type="file" onChange={uploadImage}/>
                </div>
                <button className="button is-medium margin-top" type="submit">Submit</button>
            </form>
        </div>
    </div>;

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
                            {window.localStorage.getItem("team") && appLink}
                        </div>
                    </div>
                </div>
                {window.localStorage.getItem("email") ? !window.localStorage.getItem("team") ? form : unavailable : notLogged}
            </div>           
        </div>
    )
}