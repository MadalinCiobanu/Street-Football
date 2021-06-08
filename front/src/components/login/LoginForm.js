import React from 'react'
import LoginFunctionality from './LoginFunctionality';

export default function Login() {

    const { values, handleChange, handleSubmit, errors } = LoginFunctionality();

    return (
        <div className="form-container">
            <form className="box" onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                    <input className="input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                    <input className="input"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    />
                    </div>
                </div>

                {errors.message && <p>{errors.message}</p>}

                <button className="button is-primary">Sign in</button>
            </form>
        </div>
    )
}
