import React from 'react'
import { Link } from 'react-router'
import Input from '../../../components/Input'

export const SignInForm = () => (
    <div className="login-form">
        <div className="login-form__body">
            <h1 className="login-form__header">Login Into Yout Account!</h1>
            <div className="login-form__form">

                <Input type="email" placeholder="Email" name="email" info="Check your email" />

                <Input type="password" placeholder="Choose Password" name="password" info="Password must be at least 8 characters" />

                <button className="btn">Log in</button>
                
                <Link to="/register" className="login-form__sign-in-link">Don't have an account? Please Register!</Link>
            </div>
        </div>
    </div>
)

export default SignInForm