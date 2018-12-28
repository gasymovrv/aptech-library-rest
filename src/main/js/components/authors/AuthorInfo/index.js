import AuthorInfo from './AuthorInfo';
import {compose, withHandlers} from 'recompose';
import {deleteAuthorById, findAuthorById} from '../../../api/authorsApi';
import withDeleting from '../../../hocs/withDeleting';
import withFindById from '../../../hocs/withFindById';

export default compose(
    withHandlers({
        onEdit: (props)=> () => {
            props.history.push(`${props.match.url}/edit`)
        }
    }),
    withFindById(findAuthorById),
    withDeleting(deleteAuthorById)
)(AuthorInfo);