import axios from 'axios';
import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApplicationCards from './ApplicationCards';
import paginate from 'jw-paginate';

export default function TeamApplications() {

    const id = window.localStorage.getItem("teamId");

    const [values, setValues] = useState({
        teamApplications: null
    });

    const [ applications, setApplications ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/team/${id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
            })
            .then(res => {
                console.log(res.data)
                setValues(res.data);
                setApplications(res.data.teamApplications);
            })
    }, []);

    const [currentPage, setCurrentPage] = useState(1);

    const pag = paginate(applications.length, currentPage, 2);

    const handlePageClick = e => {
        setCurrentPage(Number(e.target.id));
    }

    const displayPages = pag.pages.map(number => {
        if (number >= currentPage - 2 && number <= currentPage + 2) {
            return <li key={number}
                id={number} 
                onClick={handlePageClick}
                className={currentPage === number ? "active" : null}>
                    {number}
                </li>
        }
    })

    const items = applications.slice(pag.startIndex, (pag.endIndex + 1));
    console.log(items);

    const unavailable = <div className="team-container">
        <h1 className="box-text">No applications!</h1>
    </div>

    return (
        <div className="form-container">
            <div className="team-details">
                <div className="navbar">
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="team" className="navbar-item">My Team</Link>
                            <Link to="create-team" className="navbar-item">Create a Team</Link>
                            <Link to="team-search" className="navbar-item">Search</Link>
                            <Link to="applications" className="navbar-item">Applications</Link>
                        </div>
                    </div>
                </div>
                <div className="extra-container">
                    {values.teamApplications && <ApplicationCards applications={items}/>}
                    <div className="pagination">
                        <ul className="page-numbers">
                            <li><button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === pag.startPage ? true : false}
                            >&laquo;</button></li>
                            {displayPages}
                            <li><button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === pag.pages.length ? true : false}
                            >&raquo;</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
