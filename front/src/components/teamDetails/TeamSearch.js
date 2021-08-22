import React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TeamCards from './TeamCards';
import paginate from 'jw-paginate';

export default function TeamSearch() {

    const [values, setValues] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/team`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
            })
        .then(res => {
            console.log(res.data);
            setValues(res.data);
        })
    }, []);

    //paginate
    // take parameters
    // totalItems: number, currentPage: number, pageSize: number, maxPages: number
    // return Object with :
    // currentPage: number, endIndex: number, endPage: number, pageSize: number, pages: list of numbers
    // startIndex: number, startPage: number, totalItems: number, totalPages: number

    const [currentPage, setCurrentPage] = useState(1);

    const pag = paginate(values.length, currentPage, 2);

    console.log(pag);

    const handlePageClick = e => {
        setCurrentPage(Number(e.target.id));
        console.log(currentPage);
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

    const items = values.slice(pag.startIndex, (pag.endIndex + 1));

    console.log(items);

    const unavailable = <div className="team-container">
        <h1 className="box-text">No teams registered yet!</h1>
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
                            {window.localStorage.getItem("team") && appLink}
                        </div>
                    </div>
                </div>
                <div className="extra-container">
                    <TeamCards teams={items}/>
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