import React from 'react';
import Modal from 'react-modal';

import { getHeaderOptionValue, getHeaders } from '../../lib/util.js';
import Goalscorers from '../goalscorers/goalscorers.js';
import Team from './team.js'

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
            columns: getHeaders(),
            modalIsOpen: false,
            showTopScorersButton: false,
            showTopScorersTable: false,
            teamInfo: {
                team_name: '',
                team_image: '',
                squad: []
            },
            goalscorers: []
        }
    }

    componentWillReceiveProps(nextState) {
        let teamInfo = {
            team_name: '',
            team_image: '',
            squad: []
        };
        let showModal = false;
        let showTopScorersButton = false;
        let showTopScorersTable = false;

        if (nextState.teamInfo.squad.length) {
            teamInfo = {
                team_name: nextState.teamInfo.team_name,
                team_image: nextState.teamInfo.team_image,
                squad: nextState.teamInfo.squad
            };
            showModal = true;
        }

        if (nextState.teams.length) {
            showTopScorersButton = true;
        }

        
        if (nextState.goalscorers.length) {
            showTopScorersTable = true;
        }

        this.setState({
            teams: nextState.teams,
            teamInfo: teamInfo,
            modalIsOpen: showModal,
            showTopScorersButton: showTopScorersButton,
            showTopScorersTable: showTopScorersTable
        });
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

    onClickTopScorers = () => {
        console.log('top scorers clicked', this.props.selectedSeason);
        this.props.onClickScorers(this.props.selectedSeason);
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
                        <Team   team={team}
                                onClickTeamName={this.props.onClickTeamName}  />
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

                {this.state.showTopScorersButton &&
                    <button className="m-t-16" onClick={this.onClickTopScorers}>Show top scorers</button>
                }
                {this.state.showTopScorersTable &&
                    <Goalscorers goalscorers={this.props.goalscorers}/>
                }
            </div>
        );
    }
}

export default Teams;