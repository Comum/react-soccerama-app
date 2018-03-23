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
            <div className="Modal">
                <button className="Modal--closeButton" onClick={this.props.closeModal}>x</button>
                    
                <h2 className="Modal--center m-t-16">{this.state.teamInfo.team_name}</h2>
                <img className="Modal--center" src={this.state.teamInfo.team_image} alt="team_logo"/>
                <ul className="Modal--content">
                    {this.state.teamInfo.squad.map(player => (
                        <li key={player.id}>{player.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default TeamModal;