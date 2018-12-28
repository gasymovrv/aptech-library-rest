import {compose, withHandlers, withState} from 'recompose';

import Header from './Header';

const withWatch = compose(
    withState('isActiveWatch', 'setActiveWatch', false),
    withState('watchText', 'setWatchText', 'Включить часы'),
    withHandlers({
        onToggleWatch: props => () => {
            if (!props.isActiveWatch) {
                props.setActiveWatch(true);
                props.setWatchText('Выключить часы');
            } else {
                props.setActiveWatch(false);
                props.setWatchText('Включить часы');
            }
        }
    })
);
export default withWatch(Header);