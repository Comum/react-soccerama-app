import React from 'react';
import classNames from 'classnames';

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            showErrorMsg: false,
            errorMsg: ''
        }
    }

    componentWillReceiveProps(nextState) {
        this.setState({
            showErrorMsg: nextState.errorMsg.length ? false : true,
            errorMsg: nextState.errorMsg
        });
    }

    render() {
        let elClasses = classNames({
            'Error': true,
            'display-none': this.state.showErrorMsg
        });

        return (
            <p className={elClasses}>{this.state.errorMsg}</p>
        )
    }
}

export default Error;