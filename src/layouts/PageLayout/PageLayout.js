import React from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { signIn, signOut, isAuth } from '../../store/auth'

export class PageLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            popup: false
        }
    }

    componentWillMount() {
        this.props.isAuth();
    }

    _popupToggle = () => {
        this.setState({
            popup: !this.state.popup
        })
    }

    _renderPopup() {
        if(this.state.popup) {
            let {auth, signOut} = this.props;
            if(!auth) {
                return (
                    <ul className="top-nav__popup">
                        <li className="top-nav__popup-el">
                            <Link to="/register" onClick={this._popupToggle}>Register</Link>
                        </li>
                        <li className="top-nav__popup-el">
                            <Link to="/login" onClick={this._popupToggle}>Sign in</Link>
                        </li>
                    </ul>
                )
            } else {
                return (
                    <ul className="top-nav__popup">
                        <li className="top-nav__popup-el">
                            <a href="#" onClick={() => signOut().then(() => browserHistory.replace('/'))}>Log out</a>
                        </li>
                    </ul>
                )
            }
        }
    }

    render() {
        let {user, auth} = this.props;
        return (
            <div>
                <div>
                    <nav className="top-nav">
                        <div className="top-nav__logo">
                            <img src="/img/logo.png" alt="logo"/>
                        </div>
                        <div className="top-nav__menu">
                            <div className="top-nav__menu-el">
                                <IndexLink to='/'
                                           className="top-nav__menu-el-link"
                                           activeClassName='top-nav__menu-el-link--active'>Home</IndexLink>
                            </div>
                            <div className="top-nav__menu-el">
                                <Link to='/counter'
                                      className="top-nav__menu-el-link"
                                      activeClassName='top-nav__menu-el-link--active'>Counter</Link>
                            </div>
                        </div>
                        <div className="top-nav__user">
                            <div className="top-nav__menu-el top-nav__menu-el--dropdown"
                                 onClick={this._popupToggle}>{auth ? user : 'Register / Sign in'}</div>
                            {this._renderPopup()}
                        </div>
                    </nav>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <div className="footer">
                        <div className="footer__container">
                            <div className="footer__copyright">© 2017 TELLENTS</div>
                            <div className="footer__links">
                                <div className="footer__links-el">
                                    <a href="#">Terms of use</a>
                                </div>
                                <div className="footer__links-el">
                                    <a href="#">Privacy policy</a>
                                </div>
                                <div className="footer__links-el">
                                    <a href="#">About us</a>
                                </div>
                                <div className="footer__links-el">
                                    <a href="#">Blog</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
PageLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = state => {
    let {auth, user} = state.auth;
    return {
        auth,
        user
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        signIn,
        signOut,
        isAuth
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
