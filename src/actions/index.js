import fetch from 'cross-fetch';

import socceramaActions from './teamsActions';

const SERVER_URL = 'https://soccer.sportmonks.com/api/v2.0';
const API_TOKEN = 'HOLCAStI6Z0OfdoPbjdSg5b41Q17w2W5P4WuoIBdC66Z54kUEvGWPIe33UYC';

function createAction(actionType) {
    return data => {
        let action = {type: actionType};
        if (typeof data !== 'undefined') {
            action.data = data;
        }
        return action;
    }
}

const receiveLeaguesInfo = createAction(socceramaActions.GET_LEAGUES_INFO);
export const leaguesInfo = _ => {
    return dispatch => {
        return fetch(`${SERVER_URL}/leagues?api_token=${API_TOKEN}`)
            .then(response => response.json())
            .then(json => dispatch(receiveLeaguesInfo(json)));
    }
}

const receiveSeasonsInfo = createAction(socceramaActions.GET_SEASONS_INFO);
export const seasonsInfo = leagueId => {
    return dispatch => {
        return fetch(`${SERVER_URL}/seasons?api_token=${API_TOKEN}`)
            .then(response => response.json())
            .then(json => {
                let results = [];
                
                if (typeof json.data !== "undefined") {
                    results = json.data.filter(season => {
                        if (season.league_id === leagueId) {
                            return season;
                        }
                    });
                }

                return results;
            })
            .then(json => dispatch(receiveSeasonsInfo(json)));
    }
}

const receiveTeamsInfo = createAction(socceramaActions.GET_TEAMS_INFO);
export const teamsInfo = seasonId => {
    return dispatch => {
        return fetch(`${SERVER_URL}/standings/season/${seasonId}?api_token=${API_TOKEN}`)
            .then(response => response.json())
            .then(json => dispatch(receiveTeamsInfo({
                teams: json,
                selectedSeason: seasonId
            })));
    }
}

const receiveTeamInfo = createAction(socceramaActions.GET_TEAM_INFO);
export const specificTeamInfo = teamId => {
    return dispatch => {
        return fetch(`${SERVER_URL}/teams/${teamId}?api_token=${API_TOKEN}&include=squad`)
            .then(response => response.json())
            .then(json => {
                let team = {
                    team_name: json.data.name,
                    team_image: json.data.logo_path,
                    squad: []
                };

                return new Promise(resolve => {
                    let squad = [];
                    let playersProcessed = 0;
                
                    json.data.squad.data.forEach((player, index) => {
                        fetch(`${SERVER_URL}/players/${player.player_id}?api_token=${API_TOKEN}`)
                            .then(response => response.json())
                            .then(playerInfo => {
                                team.squad.push({
                                    id: playerInfo.data.player_id,
                                    name: playerInfo.data.fullname
                                });

                                if (index === json.data.squad.data.length - 1) {
                                    resolve(team);
                                }
                            });
                    });
                });
            })
            .then(value => dispatch(receiveTeamInfo(value)));
    }
}

const receiveScorersInfo = createAction(socceramaActions.GET_SCORERS_INFO);
export const scorersInfo = seasonId => {
    return dispatch => {
        return fetch(`${SERVER_URL}/topscorers/season/${seasonId}?api_token=${API_TOKEN}`)
            .then(response => response.json())
            .then(json => {
                let scorers = [];

                return new Promise(resolve => {
                    json.data.goalscorers.data.forEach((player, index) => {
                        fetch(`${SERVER_URL}/players/${player.player_id}?api_token=${API_TOKEN}`)
                            .then(response => response.json())
                            .then(playerInfo => {
                                scorers.push({
                                    id: playerInfo.data.player_id,
                                    name: playerInfo.data.fullname,
                                    goals: player.goals,
                                    penalty_goals: player.penalty_goals
                                });

                                if (index === json.data.goalscorers.data.length - 1) {
                                    resolve(scorers);
                                }
                            });
                    });
                });
            })
            .then(value => dispatch(receiveScorersInfo(value)));
    }
}

const receivePlayerInfo = createAction(socceramaActions.GET_PLAYER_INFO);
export const playerInfo = playerId => {
    return dispatch => {
        return fetch(`${SERVER_URL}/players/${playerId}?api_token=${API_TOKEN}`)
            .then(response => response.json())
            .then(json => dispatch(receivePlayerInfo(json)))
    }
}

const removeTeamInfo = createAction(socceramaActions.REMOVE_TEAM_INFO);
export const dropTeamInfo = _ => {
    return dispatch => dispatch(removeTeamInfo())
}

const removePlayerInfo = createAction(socceramaActions.REMOVE_PLAYER_INFO);
export const dropPlayerInfo = _ => {
    return dispatch => dispatch(removePlayerInfo())
}