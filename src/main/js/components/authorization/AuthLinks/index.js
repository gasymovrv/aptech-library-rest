import AuthLinks from './AuthLinks';
import withLogout from '../../../hocs/withLogout';
import {compose} from 'recompose';

export default compose(withLogout())(AuthLinks);