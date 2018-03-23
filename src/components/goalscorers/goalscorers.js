import React from 'react';

class Goalscorers extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            goalscorers: this.props.goalscorers
        }
    }

    componentWillReceiveProps(nextState) {
        this.setState({
            goalscorers: nextState.goalscorers
        });
    }

    onPlayerClick = (evt) => {
        this.props.onClickPlayer(evt.target.getAttribute('data-player-id'));
    }

    render() {
        console.log(this.state.goalscorers);
        return (
            <div className="Scorers--container m-t-16">
                <ul className="Scorers">
                    <li>
                        <ul className="Scorers--row">
                            <li className="Scorers--header">Player</li>
                            <li className="Scorers--header">Goals</li>
                            <li className="Scorers--header">Penalty Goals</li>
                        </ul>
                    </li>
                    {this.state.goalscorers.map(player => {
                        return (
                            <li className="Scorers--playerRow" key={player.id}>
                                <ul className="Scorers--row">
                                    <li className="Scorers--playerField cursor-pointer"
                                        onClick={this.onPlayerClick}
                                        data-player-id={player.id}
                                        >
                                        {player.name}</li>
                                    <li className="Scorers--playerField">{player.goals}</li>
                                    <li className="Scorers--playerField">{player.penalty_goals}</li>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Goalscorers;