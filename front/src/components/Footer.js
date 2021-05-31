import React from 'react';
import fb from '../facebook.png';
import gh from '../git.png';
import mail from '../mail.png';
import './component.css';

export default function Footer() {
    return (
        <div className="footer">
            <div>
                <a href = "https://github.com/MadalinCiobanu">
                    <img src={gh} alt="github logo" width="50px" height="50px" />
                </a>
                <a href = "https://www.facebook.com" >
                    <img src={fb} alt="facebook logo" width="50px" height="50px" />
                </a>
                <a href="/message" >
                    <img src={mail} alt="mail logo" width="50px" height="50px" />
                </a>
            </div>
            <p>Copyright © 2020-2021 CodeCool. All rights reserved.</p>
        </div>
    )
}