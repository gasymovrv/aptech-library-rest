import {compose, lifecycle, withStateHandlers} from 'recompose';

export default function withFindById(findById) {
    return compose(
        withStateHandlers(
            (props) => {//default value
                let entity = {};
                if (props.location && props.location.state) {
                    entity = props.location.state.entity;
                }
                return {entity: entity}
            },
            {
                onFind: state => data => ({//get fetched value
                    entity: {...data}
                })
            }),
        lifecycle({
            componentDidMount() {
                const {match} = this.props;
                if (findById && typeof findById === 'function') {
                    findById(
                        (entity) => {
                            this.props.onFind(entity)
                        },
                        match.params.id
                    );
                } else {
                    throw Error('Argument findById is incorrect!')
                }
            }
        })
    );
}