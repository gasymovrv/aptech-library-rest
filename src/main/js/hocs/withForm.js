import React from 'react';

import getDisplayName from '../helpers/getDisplayName';
import convertUTCDateToLocalDate from '../helpers/convertUTCDateToLocalDate';

export default function withForm(Component) {
    class Form extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data:{...props.entity},
                savedData:{...props.entity},
                oldData:{...props.entity},
                successSubmit: undefined,
                showInfo: false
            };
        }

        onChange = event => {
            let changedData = {...this.state.data};
            changedData[event.target.name] = event.target.value;
            this.setState({ data: changedData });
        };

        onChangeDate = (name) => (date) => {
            let changedData = {...this.state.data};
            changedData[name] = convertUTCDateToLocalDate(date);
            this.setState({ data: changedData });
        };

        onSubmit = e => {
            const {onSubmit} = this.props;
            e.preventDefault();
            if (onSubmit) {
                onSubmit(
                    this.state.data,
                    () => {
                        this.setState((state, props) => ({
                            savedData: {...state.data},
                            oldData: {...state.savedData},
                            successSubmit: true,
                            showInfo: true
                        }));
                    },
                    () => {
                        this.setState({
                            successSubmit: false,
                            showInfo: true
                        });
                    }
                );
            }
        };

        onReset = e => {
            e.preventDefault();
            this.setState((state, props) => ({data: {...state.savedData}}));
        };

        componentWillReceiveProps(nextProp) {
            if (nextProp.entity !== this.props.entity) {
                this.setState({
                    data:{...nextProp.entity},
                    savedData:{...nextProp.entity},
                    oldData:{...nextProp.entity}
                })
            }
        }

        callbackStopShow = () => {
            this.setState({showInfo: false})
        };

        render() {
            const {data, savedData, oldData, successSubmit, showInfo} = this.state;
            return (
                <Component
                    {...this.props}
                    successSubmit={successSubmit}
                    onSubmit={this.onSubmit}
                    onReset={this.onReset}
                    onChange={this.onChange}
                    onChangeDate={this.onChangeDate}
                    data={data}
                    savedData={savedData}
                    oldData={oldData}
                    showInfo={showInfo}
                    callbackStopShow={this.callbackStopShow}
                />
            );
        }
    }

    Form.displayName = `withForm(${getDisplayName(Component)})`;
    return Form;
}
