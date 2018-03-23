import React from 'react';

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            team: props.team
        }
    }

    componentWillReceiveProps(nextState) {
        this.setState({
            team: nextState.team
        });
    }

    onClickTeamName = (evt) => {
        let teamId = evt.target.getAttribute('data-team-id');

        this.props.onClickTeamName(teamId);
    }
    
    render() {
        return (
            <li key={this.state.team.id} className="Teams--body--fieldRow">
                <ul className="Teams--body--content">
                    <li className="Teams--body--contentField">{this.state.team.position}</li>
                    <li className="Teams--body--contentField cursor-pointer" onClick={this.onClickTeamName} data-team-id={this.state.team.id}>{this.state.team.team_name}</li>
                    <li className="Teams--body--contentField">{this.state.team.played}</li>
                    <li className="Teams--body--contentField">{this.state.team.won}</li>
                    <li className="Teams--body--contentField">{this.state.team.drawn}</li>
                    <li className="Teams--body--contentField">{this.state.team.lost}</li>
                    <li className="Teams--body--contentField">{this.state.team.goal}</li>
                    <li className="Teams--body--contentField">{this.state.team.difference}</li>
                    <li className="Teams--body--contentField">{this.state.team.points}</li>
                </ul>
            </li>
        )
    }
}

export default Team;