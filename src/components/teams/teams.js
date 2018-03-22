import React from 'react';

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            teams: []
        }
    }

    componentWillReceiveProps(nextState) {
        this.setState({
            teams: nextState.teams
        });
    }

    render() {
        return (
            <div className="Teams">
                {this.state.teams.map(team => 
                    <div>
                        <div>{JSON.stringify(team)}</div>
                        <br />
                    </div>
                )}
            </div>
        );
    }
}

export default Teams;