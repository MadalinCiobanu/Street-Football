import React from 'react'

export default function Login() {
    return (
        <div className="form-container">
            <form className="box">
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                    <input className="input" type="email" placeholder="Email" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                    <input className="input" type="password" placeholder="Password" />
                    </div>
                </div>

                <button className="button is-primary">Sign in</button>
            </form>
        </div>
    )
}
