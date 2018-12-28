import BookInfo from './BookInfo';
import {compose, withHandlers, withState} from 'recompose';
import {deleteBookById, findBookById} from '../../../api/booksApi';
import withFindById from '../../../hocs/withFindById';
import withDeleting from '../../../hocs/withDeleting';

export default compose(
    withState('activeTab', 'setActiveTab', 1),
    withHandlers({
        onToggleTab: props => (tab) => (event) => {
            props.setActiveTab(tab);
        },
        onEdit: (props) => () => {
            props.history.push(`${props.match.url}/edit`)
        }
    }),
    withFindById(findBookById),
    withDeleting(deleteBookById)
)(BookInfo);