import {compose} from 'recompose';

import BookList from './BookList';
import {deleteBookById, findBooksWithPaging} from '../../../api/booksApi';
import withPaging from '../../../hocs/withPaging';
import withLoadingEntities from '../../../hocs/withLoadingEntities';
import withDeleting from '../../../hocs/withDeleting';

export default compose(
    withLoadingEntities(findBooksWithPaging, true),
    withPaging(3),
    withDeleting(deleteBookById)
)(BookList);