import {compose, withHandlers} from 'recompose';

import {deleteAuthorById, findAuthorsWithPaging} from '../../../api/authorsApi';
import withDeleting from '../../../hocs/withDeleting';
import withPaging from '../../../hocs/withPaging';
import AuthorList from './AuthorList';
import withLoadingEntities from '../../../hocs/withLoadingEntities';

export default compose(
    withHandlers({
        onAdd: (props)=> () => {
            props.history.push(`${props.match.url}/add`)
        }
    }),
    withLoadingEntities(findAuthorsWithPaging, true),
    withPaging(6),
    withDeleting(deleteAuthorById)
)(AuthorList);