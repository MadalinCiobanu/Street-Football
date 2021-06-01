import React from 'react';
import register from "./Register";

export default function RegisterForm() {

    const { values, handleChange, handleSubmit, errors } = register();

    return (
        <div className="form-container">
            <form className="box" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                    <input className="input"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    />
                    {errors.firstName && <p>{errors.firstName}</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                    <input className="input"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    />
                    {errors.lastName && <p>{errors.lastName}</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Phone</label>
                    <div className="control">
                    <input className="input"
                    name="phone"
                    placeholder="Enter a Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    />
                    {errors.phone && <p>{errors.phone}</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                    <input className="input"
                    name="email"
                    placeholder="Enter an email"
                    value={values.email}
                    onChange={handleChange}
                    />
                    {errors.email && <p>{errors.email}</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                    <input className="input"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                    <input className="input"
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter the password again"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    </div>
                </div>

                <button className="button is-primary">Register</button>
            </form>
        </div>
    )
}
