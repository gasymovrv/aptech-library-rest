import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import './fader.css';

function Fader({children}) {
    return (
        <CSSTransitionGroup
            transitionName='fade'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}

        >
            {children}
        </CSSTransitionGroup>
    )
}

export default class InfoBox extends React.Component {
    state = {
        isTimeout: false
    };

    componentDidMount() {
        const {show} = this.props;
        if(show){
            this.startInfoBoxTimeout();
        }
    }

    componentWillReceiveProps(nextProp) {
        if (nextProp.show) {
            this.setState(()=>{
                clearTimeout(this.infoBoxTimeout);
                this.startInfoBoxTimeout();
                return {isTimeout: false};
            });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.infoBoxTimeout);
    }

    startInfoBoxTimeout = () => {
        const {timeout, callbackStopShow} = this.props;
        this.infoBoxTimeout = setTimeout(() => {
            this.setState({isTimeout: true});
            if (callbackStopShow && typeof callbackStopShow === 'function') {
                //если есть функция callbackStopShow - вызываем ее
                //она меняет пропс show на false в родительском компоненте/хоке
                callbackStopShow();
            }
        }, timeout * 1000);
    };

    render() {
        const {infoKey, successText, errorText, successAction, show} = this.props;
        const {isTimeout} = this.state;
        let info = null;
        if (show && successAction && !isTimeout) {
            info =
                (<div key={infoKey} className='alert alert-success' role='alert'>
                    {successText}
                </div>)
        } else if (show && !successAction && !isTimeout) {
            info =
                (<div key={infoKey} className='alert alert-danger' role='alert'>
                    {errorText}
                </div>)
        }
        return (
            <Fader>
                {info}
            </Fader>
        );
    }

}