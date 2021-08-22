import React from 'react'
import { useState } from "react";
import PasswordChanger from './PasswordChanger';
import DetailsChanger from './DetailsChanger';

export default function EditUser() {

    const {handlePassword, handleSubmitPassword, errors } = PasswordChanger();

    const { values, handleDetails, handleSubmitDetails, detailsErrors } = DetailsChanger();

    const [details, setDetails] = useState(false);

    const passwordForm = <div>
        <h1 className="small-title">Change Password</h1>
        <form className="small-margin-top control" onSubmit={handleSubmitPassword}>
            <input className="input small-margin-top" name="old"
            onChange={handlePassword}
            type="password"
            placeholder="Old Password"/>
            {errors.old && <p>{errors.old}</p>}
            <input className="input small-margin-top" name="password"
            onChange={handlePassword}
            type="password"
            placeholder="New Password"/>
            {errors.password  && <p>{errors.password}</p>}
            <input className="input small-margin-top" name="confirmPassword"
            onChange={handlePassword}
            type="password"
            placeholder="Re-type Password"/>
            {errors.confirmPassword  && <p>{errors.confirmPassword}</p>}
            <button className="button is-medium small-margin-top" type="submit">Submit</button>
        </form>
    </div>

    const detailsForm = <div>
    <h1 className="small-title">Edit Details</h1>
    <form className="small-margin-top control" onSubmit={handleSubmitDetails}>
        <input className="input small-margin-top" name="firstName"
        onChange={handleDetails}
        value={values.firstName}
        placeholder="First Name"/>
        {detailsErrors.firstName && <p>{detailsErrors.firstName}</p>}
        <input className="input small-margin-top" name="lastName"
        onChange={handleDetails}
        value={values.lastName}
        placeholder="Last Name"/>
        {detailsErrors.lastName  && <p>{detailsErrors.lastName}</p>}
        <input className="input small-margin-top" name="phone"
        onChange={handleDetails}
        value={values.phone}
        placeholder="Phone"/>
        {detailsErrors.phone  && <p>{detailsErrors.phone}</p>}
        <button className="button is-medium small-margin-top" type="submit">Submit</button>
    </form>
    </div>

    return (
        <div className="form-container">
            <div className="user-details">
                <div className="full-width">
                    <div>
                    <a onClick={() => setDetails(false)}>Change Password</a> &nbsp; / &nbsp; <a onClick={() => setDetails(true)}>Edit Details</a>
                    </div>
                    <div className="margin-top">{details ? detailsForm : passwordForm}</div>
                </div>
            </div>            
        </div>
    )
}
