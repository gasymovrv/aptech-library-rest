import {compose, withHandlers} from 'recompose';
import Author from './Author';

export default compose(
    withHandlers({
        onEdit: (props)=> author => {
            props.history.push(`${props.match.url}/${author.id}/edit`)
        }
    })
)(Author);