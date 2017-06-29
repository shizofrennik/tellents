// ------------------------------------
// J-toker config
// ------------------------------------
import Auth from 'j-toker';
Auth.configure({
    apiUrl: 'https://floating-atoll-63112.herokuapp.com/api'
});
// ------------------------------------
// route auth checker
// ------------------------------------

export function checkAuth(nextState, replace, callback) {
    let currentPath = nextState.location.pathname;
    validateToken().then((user) => {
        if(currentPath === '/login') {
            replace({
                pathname: '/'
            });
            callback();
        }
        callback();
    }).catch((err) => {
        if(currentPath !== '/login') {
            replace({
                pathname: '/login'
            });
            callback();
        }
        callback();
    });
}

// ------------------------------------
// Constants
// ------------------------------------
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const REGISTER = 'REGISTER';
export const IS_AUTH = 'IS_AUTH';

// ------------------------------------
// Actions
// ------------------------------------
export function signOut () {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            Auth.signOut().then(data => {
                dispatch({
                    type: SIGN_OUT,
                    success: data.success
                });
                resolve();
            }).catch(err => reject(err));
        });
    }
}

export function signIn (email, password) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            Auth.emailSignIn({
                email,
                password
            }).then(data => {
                dispatch({
                    type: SIGN_IN,
                    success: data.success,
                    user: data.data.full_name
                });
                resolve();
            }).catch(err => {
                reject(err);
            });
        });
    }
}

export function register (email, password, first_name, last_name) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            Auth.emailSignUp({
                config_name: 'default',
                confirm_success_url: '/',
                email,
                password,
                password_confirmation: password,
                first_name,
                last_name
            }).then(data => {
                console.log('register', data);
                dispatch({
                    type: REGISTER,
                    success: data.success,
                    user: `${data.data.first_name} ${data.data.last_name}`
                });
                resolve();
            }).catch(err => {
                console.log('register err', err);
                reject(err);
            });
        });
    }
}

export function validateToken() {
    return new Promise((resolve, reject) => {
        Auth.validateToken()
            .then(user => {
                console.log('user', user);
                !!user.id ? resolve(user) : reject();
            })
            .catch(err => {
                console.log('err', err);
                reject(err);
            });
    })
}

export function isAuth () {
    return (dispatch) => {
        Auth.validateToken()
            .then(user => {
                dispatch({
                    type: IS_AUTH,
                    auth: true,
                    user: user.full_name
                });
            })
            .catch(err => {
                dispatch({
                    type: IS_AUTH,
                    auth: false,
                    user: null
                });
            });
    }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SIGN_OUT]: (state = initialState, action) => {
        return {
            auth: !action.success,
            user: null
        }
    },
    [SIGN_IN]: (state = initialState, action) => {
        return {
            auth: !!action.success,
            user: action.user
        }
    },
    [REGISTER]: (state = initialState, action) => {
        return {
            auth: true,
            user: action.user
        }
    },
    [IS_AUTH]: (state = initialState, action) => {
        let {auth, user} = action;
        return {
            auth,
            user
        }
    }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {auth: false, user: null};

export default function (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
