import React from 'react';
import { Link, useHistory } from "react-router-dom";

export default function Home() {

    const history = useHistory();

    const notLogged = <div>
        <p className="title">Join our community</p>
        <button className="button is-light is-medium"
        onClick={() => history.push("/register")}>
            Register Now
        </button>
    </div>

    const logged = <div>
        <p className="title">Welcome to Street Football</p>
        <button className="button is-light is-medium"
        onClick={() => history.push("/team-search")}>
            Find a Team
        </button>
    </div>

    return (
        <div>
            <div className="bg">
                {localStorage.getItem("email") ? logged : notLogged}
            </div>
            <div className="card-container">
                <Link to="/team" className="card card1">
                    <h1 className="card-text">
                        Join a Team
                    </h1>
                </Link>
                <Link to="/referee" className="card card2">
                    <h1 className="card-text">
                        Play with Referees
                    </h1>
                </Link>
                <Link to="/tournament" className="card card3">
                    <h1 className="card-text">
                        Win Tournaments
                    </h1>
                </Link>
            </div>
        </div>
    )
}
