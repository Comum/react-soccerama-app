import React from 'react';

class Leagues extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            leagues: []
        }
    }

    componentWillReceiveProps(nextState) {
        this.setState({
            leagues: nextState.leagues
        });
    }

    handleLeagueChange = evt => {
        this.props.onChangeLeague(parseInt(evt.target.value, 10));
    }

    render() {
        return (
            <div className="Header--leagues">
                <select onChange={this.handleLeagueChange}>
                    <option key="0" value="0">--League--</option>
                    {this.state.leagues.map(league => 
                        <option key={league.id} value={league.id}>{league.name}</option>
                    )}
                </select>
            </div>
        )
    }
}

export default Leagues;