import React, { Component } from 'react';
import {connect} from 'react-redux';

import './App.css';
import Header from './components/header/header.js';
import Teams from './components/teams/teams.js';
import {
  seasonsInfo,
  teamsInfo,
  specificTeamInfo,
  scorersInfo,
  playerInfo,
  dropTeamInfo,
  dropPlayerInfo
} from './actions/index.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div>
        <Header leagues={this.props.info.leagues}
                seasons={this.props.info.seasons}
                onChangeLeague={this.props.onChangeLeague}
                onChangeSeason={this.props.onChangeSeason}/>
        <Teams  teams={this.props.info.teams}
                teamInfo={this.props.info.teamInfo}
                playerInfo={this.props.info.playerInfo}
                selectedSeason={this.props.info.selectedSeason}
                onClickTeamName={this.props.onClickTeamName}
                onClickScorers={this.props.onClickScorers}
                goalscorers={this.props.info.goalscorers}
                onClickPlayer={this.props.onClickPlayer}
                removeTeamInfo={this.props.removeTeamInfo}
                removePlayerInfo={this.props.removePlayerInfo}/>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    info: state.teams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeLeague: (...args) => {
      dispatch(seasonsInfo(...args))
    },
    onChangeSeason: (...args) => {
      dispatch(teamsInfo(...args))
    },
    onClickTeamName: (...args) => {
      dispatch(specificTeamInfo(...args))
    },
    onClickScorers: (...args) => {
      dispatch(scorersInfo(...args))
    },
    onClickPlayer: (...args) => {
      dispatch(playerInfo(...args))
    },
    removeTeamInfo: (...args) => {
      dispatch(dropTeamInfo(...args))
    },
    removePlayerInfo: (...args) => {
      dispatch(dropPlayerInfo(...args))
    }
  }
};

export default connect(stateToProps, mapDispatchToProps)(App);