import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'

export class PageLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            popup: false
        }
    }

    _popupToggle = () => {
        this.setState({
            popup: !this.state.popup
        })
    }

    _renderPopup() {
        if(this.state.popup) {
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
        }
    }

    render() {
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
                                 onClick={this._popupToggle}>Register / Sign in</div>
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

export default PageLayout
