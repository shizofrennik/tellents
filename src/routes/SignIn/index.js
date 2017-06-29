import SignIn from './components/SignIn'
import { checkAuth } from '../../store/auth'

export default (store) => ({
    path: '/login',
    component: SignIn,
    onEnter: checkAuth
});
