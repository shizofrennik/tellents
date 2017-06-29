import React from 'react'
import { Link, browserHistory } from 'react-router'
import Input from '../../../components/Input'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { signIn, signOut, isAuth } from '../../../store/auth'

export class SignInForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: '',
            spinner: false
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    handleSignIn() {
        let {signIn} = this.props;
        let {email, password} = this.state;

        if(!this.validateEmail(email)) {
            this.setState({error: 'Enter valid email address'});
            return;
        }

        if(password.length < 8) {
            this.setState({error: 'Password must be at least 8 chars'});
            return;
        }
        this.setState({spinner: true});

        signIn(this.state.email, this.state.password).then(() => {
            this.setState({spinner: false});
            browserHistory.replace('/')
        }).catch((err) => {
            this.setState({
                spinner: false,
                error: err.reason
            })
        });
    }

    handleSignOut() {
        let {signOut} = this.props;
        this.setState({spinner: true});

        signOut().then(() => {
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
        let {auth} = this.props;
        let {spinner} = this.state;
        // this.props.isAuth();
        return (<div className="login-form">
            <div className="login-form__body">
                <h1 className="login-form__header">Login Into Yout Account!</h1>
                {this.errorMessage()}
                <div className="login-form__form">

                    <Input type="email"
                           placeholder="Email"
                           name="email"
                           onChange={(e) => this.setState({email: e.target.value})}
                           info="Enter your email" />

                    <Input type="password"
                           placeholder="Choose Password"
                           name="password"
                           onChange={(e) => this.setState({password: e.target.value})}
                           info="Password must be at least 8 characters" />

                    {auth.auth ? 
                        (<button className="btn"
                                 onClick={this.handleSignOut.bind(this)}>{spinner ? (<div className="spinner"></div>) : 'Log out'}</button>)
                        :
                        (<button className="btn" 
                                 onClick={this.handleSignIn.bind(this)}>{spinner ? (<div className="spinner"></div>) : 'Log in'}</button>)}

                    <Link to="/register" className="login-form__sign-in-link">Don't have an account? Please Register!</Link>
                </div>
            </div>
        </div>)
    }

}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        signIn,
        signOut,
        isAuth
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);