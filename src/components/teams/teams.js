import React from 'react';
import Modal from 'react-modal';

import { getHeaderOptionValue } from '../../lib/util.js';

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            teams: props.teams,
            columns: this.getHeaders(),
            modalIsOpen: false,
            showTopScorers: false,
            teamInfo: {
                team_name: '',
                team_image: '',
                squad: []
            }
        }
    }

    componentWillReceiveProps(nextState) {
        let teamInfo = {
            team_name: '',
            team_image: '',
            squad: []
        };
        let showModal = false;
        let showTopScorers = false;

        if (nextState.teamInfo.squad.length) {
            teamInfo = {
                team_name: nextState.teamInfo.team_name,
                team_image: nextState.teamInfo.team_image,
                squad: nextState.teamInfo.squad
            };
            showModal = true;
        }

        if (nextState.teams.length) {
            showTopScorers = true;
        }

        this.setState({
            teams: nextState.teams,
            teamInfo: teamInfo,
            modalIsOpen: showModal,
            showTopScorers: showTopScorers
        });
    }

    getHeaders() {
        let columns = [{
            name: 'Position',
            searchState: 'default' 
        },
        {
            name: 'Team Name',
            searchState: 'default' 
        },
        {
            name: 'Played',
            searchState: 'default' 
        },
        {
            name: 'Won',
            searchState: 'default' 
        },
        {
            name: 'Drawn',
            searchState: 'default' 
        },
        {
            name: 'Lost',
            searchState: 'default' 
        },
        {
            name: 'Goal',
            searchState: 'default' 
        },
        {
            name: 'Difference',
            searchState: 'default' 
        },
        {
            name: 'Points',
            searchState: 'default' 
        }];

        return columns;
    }

    onHeaderClick (i) {
        // TODO: needs refactoring
        const headerState = this.state.columns[i].searchState;
        const comparingTerm = getHeaderOptionValue(i);
        let newHeaderState = '';
        let newHeaderColumn;
        let newHeaderColumns = [];
        let newTeamOrder = [];
        let orderInverter = 1;

        switch(headerState) {
            case 'default':
                newHeaderState = 'topBorder';
                break;
            case 'topBorder':
                newHeaderState = 'bottomBorder';
                orderInverter = -1;
                break;
            default:
                newHeaderState = 'default';
        }

        newHeaderColumn = {
            name: this.state.columns[i].name,
            searchState: newHeaderState
        }

        newHeaderColumns = [
            ...this.state.columns.slice(0, i),
            newHeaderColumn,
            ...this.state.columns.slice(i + 1)
        ];

        newTeamOrder = this.state.teams.sort((a, b) => {
            let diff = 0;

            if (a[comparingTerm] < b[comparingTerm]) {
                diff = -1;
            }
            if(a[comparingTerm] > b[comparingTerm]) {
                diff = 1;
            }

            return diff * orderInverter;
        });

        this.setState({
            columns: newHeaderColumns,
            teams: newTeamOrder
        });
    }

    onClickTeamName = (evt) => {
        let teamId = evt.target.getAttribute('data-team-id');

        this.props.onClickTeamName(teamId);
    }

    onClickTopScorers = () => {
        console.log('top scorers clicked', this.props.selectedSeason)
    }
    
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    render() {
        console.log('team props', this.props);
        return (
            <div className="Teams">
                <ul className="Teams--header">
                    {this.state.columns.map((field, index) => (
                        <li key={index}
                            className={`Teams--header--field Teams--header--${field.searchState}`}
                            onClick={this.onHeaderClick.bind(this, index)}
                            >
                            {field.name}
                        </li>
                    ))}
                </ul>
                
                <ul className="Teams--body">
                    {this.state.teams.map(team => (
                        <li key={team.id} className="Teams--body--fieldRow">
                            <ul className="Teams--body--content">
                                <li className="Teams--body--contentField">{team.position}</li>
                                <li className="Teams--body--contentField" onClick={this.onClickTeamName} data-team-id={team.id}>{team.team_name}</li>
                                <li className="Teams--body--contentField">{team.played}</li>
                                <li className="Teams--body--contentField">{team.won}</li>
                                <li className="Teams--body--contentField">{team.drawn}</li>
                                <li className="Teams--body--contentField">{team.lost}</li>
                                <li className="Teams--body--contentField">{team.goal}</li>
                                <li className="Teams--body--contentField">{team.difference}</li>
                                <li className="Teams--body--contentField">{team.points}</li>
                            </ul>
                        </li>
                    ))}
                </ul>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Team Modal"
                    >

                    <button onClick={this.closeModal}>close</button>
                    
                    <h2>{this.state.teamInfo.team_name}</h2>
                    <img src={this.state.teamInfo.team_image} alt="team_logo"/>
                    <ul>
                        {this.state.teamInfo.squad.map(player => (
                            <li key={player.id}>{player.name}</li>
                        ))}
                    </ul>
                </Modal>

                {this.state.showTopScorers &&
                    <button onClick={this.onClickTopScorers}>Show top scorers</button>
                }
            </div>
        );
    }
}

export default Teams;