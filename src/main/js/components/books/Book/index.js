import {compose, withHandlers} from 'recompose';
import Book from './Book';


export default compose(
    withHandlers({
        onEdit: (props) => book => {
            props.history.push(`${props.match.url}/${book.id}/edit`)
        }
    }),
)(Book);