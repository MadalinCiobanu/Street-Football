import React from 'react';
import { Link } from "react-router-dom";
import logo from '../ball.png';
import './component.css';

export default function Header() {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} alt="logo" width="80px" height="80px"></img>
                </Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    <h1 className="name">StreetFootball.com</h1>
                </div>
                <div className="navbar-end">
                    <Link to="/" className="navbar-item">
                        Home
                    </Link>
                    <Link to="/login" className="navbar-item">
                        Login
                    </Link>
                    <Link to="/register" className="navbar-item">
                        Register
                    </Link>
                    <Link to="/about" className="navbar-item">
                        About
                    </Link>
                </div>
            </div>
        </div>
    )
}
