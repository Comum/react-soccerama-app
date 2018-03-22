import React, { Component } from 'react';
import {connect} from 'react-redux';

import './App.css';
import Header from './components/header/header.js';
import Teams from './components/teams/teams.js';
import { seasonsInfo, teamsInfo, specificTeamInfo } from './actions/index.js';

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
                onClickTeamName={this.props.onClickTeamName}/>
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
    }
  }
};

export default connect(stateToProps, mapDispatchToProps)(App);