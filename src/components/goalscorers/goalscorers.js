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

    render() {
        console.log(this.state.goalscorers);
        return (
            <ul className="m-t-16">
                <li>
                    <ul>
                        <li>Player</li>
                        <li>Goals</li>
                        <li>Penalty Goals</li>
                    </ul>
                </li>
                {this.state.goalscorers.map(player => { console.log('aqui', player);
                    return (
                        <li key={player.id}>
                            <ul>
                                <li>{player.name}</li>
                                <li>{player.goals}</li>
                                <li>{player.penalty_goals}</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Goalscorers;