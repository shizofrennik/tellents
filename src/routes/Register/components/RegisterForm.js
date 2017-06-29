import React from 'react'
import { Link, browserHistory } from 'react-router'
import Input from '../../../components/Input'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { register, isAuth } from '../../../store/auth'

export class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            error: '',
            spinner: false
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleRegister() {
        let {register} = this.props;
        let {email, password, firstName, lastName} = this.state;
        console.log(firstName);
        console.log(lastName);

        if(!this.validateEmail(email)) {
            this.setState({error: 'Enter valid email address'});
            return;
        }

        if(password.length < 8) {
            this.setState({error: 'Password must be at least 8 chars'});
            return;
        }
        this.setState({spinner: true});

        register(email, password, firstName, lastName).then(() => {
            this.setState({spinner: false});
            browserHistory.replace('/')
        }).catch((err) => {
            this.setState({
                spinner: false,
                error: err.reason
            })
        });
    }

    errorMessage() {
        return this.state.error ? (<h1 className="login-form__error">{this.state.error}</h1>) : null
    }
    render() {
        let {spinner} = this.state;
        return (
            <div className="register-form">
                <div className="register-form__body">
                    <h1 className="register-form__header">Please sign up!</h1>
                    <p className="register-form__join">Join over 2 million tallents already using Tellents. Start now for free!</p>
                    {this.errorMessage()}
                    <div className="register-form__form">
                        <Input placeholder="First Name"
                               name="first_name"
                               onChange={(e) => this.setState({firstName: e.target.value})}
                               info="Please enter your First Name" />

                        <Input placeholder="Last Name"
                               name="last_name"
                               onChange={(e) => this.setState({lastName: e.target.value})}
                               info="Please enter your Last Name" />

                        <Input type="email"
                               placeholder="Email"
                               name="email"
                               onChange={(e) => this.setState({email: e.target.value})}
                               info="Check your email" />

                        <Input type="password"
                               placeholder="Choose Password"
                               name="password"
                               onChange={(e) => this.setState({password: e.target.value})}
                               info="Password must be at least 8 characters" />

                        <button className="btn" onClick={this.handleRegister.bind(this)}>{spinner ? (<div className="spinner"></div>) : 'Start now'}</button>

                        <Link to="/login" className="register-form__sign-in-link">Already have an account? Please SignIn</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        isAuth,
        register
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);