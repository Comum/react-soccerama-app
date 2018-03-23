import React from 'react';
import Modal from 'react-modal';

import Goalscorers from '../goalscorers/goalscorers.js';
import Team from './team.js';
import TeamModal from './teamModal.js';
import PlayerModal from './playerModal.js';
import {
    getHeaderOptionValue,
    getHeaders,
    getNewHeaderState,
    getNewHeaderColumns,
    getNewTeamOrder
} from '../../lib/util.js';
import { customStyles } from '../../lib/helpers.js';

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            teams: props.teams,
            columns: getHeaders(),
            teamModalIsOpen: false,
            playerModalIsOpen: false,
            showTopScorersButtons: false,
            showTopScorersTable: false,
            teamInfo: {
                team_name: '',
                team_image: '',
                squad: []
            },
            playerInfo: {
                fullname: '',
                image_path: '',
                nationality: '',
                weight: ''
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
        let playerInfo = {
            fullname: '',
            image_path: '',
            nationality: '',
            weight: ''
        };
        let showTeamModal = false;
        let showPlayerModal = false;
        let showTopScorersButtons = false;
        let showTopScorersTable = false;

        if (nextState.teamInfo.squad.length) {
            teamInfo = {
                team_name: nextState.teamInfo.team_name,
                team_image: nextState.teamInfo.team_image,
                squad: nextState.teamInfo.squad
            };
            showTeamModal = true;
        }

        if (nextState.playerInfo.fullname.length) {
            playerInfo = nextState.playerInfo;
            showPlayerModal = true;
        }

        if (nextState.teams.length) {
            showTopScorersButtons = true;
        }

        
        if (nextState.goalscorers.length) {
            showTopScorersTable = true;
        }

        this.setState({
            teams: nextState.teams,
            teamInfo: teamInfo,
            playerInfo: playerInfo,
            teamModalIsOpen: showTeamModal,
            playerModalIsOpen: showPlayerModal,
            showTopScorersButtons: showTopScorersButtons,
            showTopScorersTable: showTopScorersTable
        });
    }

    onHeaderClick (i) {
        const headerState = this.state.columns[i].searchState;
        const comparingTerm = getHeaderOptionValue(i);
        let newHeaderState = '';
        let newHeaderColumn;
        let newHeaderColumns = [];
        let newTeamOrder = [];
        let orderInverter;

        newHeaderState = getNewHeaderState(headerState);
        orderInverter = newHeaderState === 'bottomBorder' ? -1 : 1;

        newHeaderColumn = {
            name: this.state.columns[i].name,
            searchState: newHeaderState
        }

        newHeaderColumns = getNewHeaderColumns(this.state.columns, newHeaderColumn, i);
        newTeamOrder = getNewTeamOrder(this.state.teams, orderInverter, comparingTerm);

        this.setState({
            columns: newHeaderColumns,
            teams: newTeamOrder
        });
    }

    onClickTopScorers = () => {
        this.props.onClickScorers(this.props.selectedSeason);
    }
    
    closeModal = () => {
        this.props.removeTeamInfo();
        this.props.removePlayerInfo();

        this.setState({
            teamModalIsOpen: false,
            playerModalIsOpen: false
        });
    }

    render() {
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
                        <Team   key={team.id}
                                team={team}
                                onClickTeamName={this.props.onClickTeamName}  />
                    ))}
                </ul>

                <Modal
                    isOpen={this.state.teamModalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Team Modal"
                    >

                    <TeamModal  closeModal={this.closeModal}
                                teamInfo={this.state.teamInfo}/>
                </Modal>

                {this.state.showTopScorersButtons &&
                    <div className="buttonsContainer">
                        <button className="m-r-8" onClick={this.onClickTopScorers}>Show top goal scorers</button>
                    </div>
                }
                {this.state.showTopScorersTable &&
                    <div>
                        <Goalscorers    goalscorers={this.props.goalscorers}
                                        onClickPlayer={this.props.onClickPlayer}/>
                        <Modal
                            isOpen={this.state.playerModalIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Team Modal"
                            >

                            <PlayerModal    closeModal={this.closeModal}
                                            playerInfo={this.state.playerInfo}/>
                        </Modal>
                    </div>
                }
            </div>
        );
    }
}

export default Teams;