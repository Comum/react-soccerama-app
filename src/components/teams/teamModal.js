import React from 'react';

class TeamModal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            teamInfo: props.teamInfo
        }
    }

    componentWillReceiveProps(nextState) {
        this.setState({
            teamInfo: nextState.teamInfo
        });
    }
    
    render() {
        return (
            <div className="TeamModal">
                <button className="TeamModal--closeButton" onClick={this.props.closeModal}>x</button>
                    
                <h2 className="TeamModal--teamName">{this.state.teamInfo.team_name}</h2>
                <img className="TeamModal--teamName" src={this.state.teamInfo.team_image} alt="team_logo"/>
                <ul className="TeamModal--teamSquad">
                    {this.state.teamInfo.squad.map(player => (
                        <li className="TeamModal--teamSquad--player" key={player.id}>{player.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default TeamModal;