import {withHandlers} from 'recompose';
import {logoutUser, setLocalCurrentUser} from '../api/usersApi';

export default function withLogout() {
    return withHandlers({
        onLogout: (props) => (event) => {
            event.preventDefault();
            setLocalCurrentUser(null);
            logoutUser();
            props.history.push(props.appPaths.auth.login)
        }
    });
}