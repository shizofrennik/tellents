import React from 'react'
import { Link } from 'react-router'
import Input from '../../../components/Input'

export const RegisterForm = () => (
    <div className="register-form">
        <div className="register-form__body">
            <h1 className="register-form__header">Please sign up!</h1>
            <p className="register-form__join">Join over 2 million tallents already using Tellents. Start now for free!</p>
            <div className="register-form__form">
                <Input placeholder="First Name" name="first_name" info="Please enter your First Name" />

                <Input placeholder="Last Name" name="last_name" info="Please enter your Last Name" />

                <Input type="email" placeholder="Email" name="email" info="Check your email" />

                <Input type="password" placeholder="Choose Password" name="password" info="Password must be at least 8 characters" />

                <button className="btn">Start now</button>

                <Link to="/login" className="register-form__sign-in-link">Already have an account? Please SignIn</Link>
            </div>
        </div>
    </div>
)

export default RegisterForm