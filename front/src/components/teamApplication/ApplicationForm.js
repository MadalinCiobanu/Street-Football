import React from 'react'
import { useParams, Link } from 'react-router-dom';
import ApplicationFunc from './ApplicationFunc';

export default function ApplicationForm() {

    let { id } = useParams();

    console.log(id);

    const { values, handleChange, handleSubmit, errors } = ApplicationFunc(id);

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
                <div className="team-container">
                    <div>
                        <h1 className="small-title">Apply for Team</h1>
                        <form className="small-margin-top control" onSubmit={handleSubmit}>
                            <textarea rows="3" cols="30" className="input small-margin-top" name="description"
                            onChange={handleChange}
                            value={values.description}/>
                            {errors.description && <p>{errors.description}</p>}
                            <button className="button is-medium small-margin-top" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* <div className="team-container">
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
    </div>; */}
