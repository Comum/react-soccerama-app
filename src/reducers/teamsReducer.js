import teams from '../actions/teamsActions';
import { filterSeasons, filterTeams } from '../lib/util.js';

const INITIAL_STATE = {
    teams: [],
    leagues: [],
    seasons: [],
    teamInfo: {
        team_name: '',
        team_image: '',
        squad: []
    },
    selectedSeason: 0,
    goalscorers: [],
    playerInfo: {
        fullname: '',
        image_path: '',
        nationality: '',
        weight: ''
    },
    errorMsg: ''
};

const ERROR_MSG = 'Error retrieving information please try again later';

function filterLeaguesInfo(info) {
    return info.map(league => {
        return {
            id: league.id,
            name: league.name
        }
    });
}

function getLeagues(state, leaguesInfo) {
    let leagues = [];
    let errorMsg = ERROR_MSG;
    
    if (typeof leaguesInfo.data !== "undefined") {
        leagues = filterLeaguesInfo(leaguesInfo.data);
        errorMsg = '';
    }

    return {
        ...state,
        leagues: leagues,
        errorMsg: errorMsg
    };
}

function getSeasons(state, seasonsInfo) {
    let seasons = [];
    let errorMsg = ERROR_MSG;

    if (seasonsInfo.length) {
        seasons = filterSeasons(seasonsInfo);
        errorMsg = '';
    }

    return {
        ...state,
        seasons: seasons,
        teams: [],
        errorMsg: errorMsg
    };
}


function getTeams(state, data) {
    let result = [];
    let errorMsg = ERROR_MSG;

    if (typeof data.teams.data !== "undefined") {
        result = filterTeams(data.teams.data[0].standings.data);
        errorMsg = '';
    }

    return {
        ...state,
        teams: result,
        selectedSeason: data.selectedSeason,
        errorMsg: errorMsg
    };
}

function getTeamInfo(state, team) {
    let teamInfo =  {
        team_name: '',
        team_image: '',
        squad: []
    };
    let errorMsg = ERROR_MSG;

    if (team.team_name !== '' && team.squad.length) {
        teamInfo = team;
        errorMsg = '';
    }

    return {
        ...state,
        teamInfo: teamInfo,
        errorMsg: errorMsg
    }
}

function getScorersInfo(state, scorers) {
    let goalscorers = [];
    let errorMsg = ERROR_MSG;

    if (scorers.length) {
        goalscorers = scorers;
        errorMsg = '';
    }

    return {
        ...state,
        goalscorers: goalscorers,
        errorMsg: errorMsg
    }
}

function getPlayerInfo(state, player) {
    let playerInfo = {
        fullname: '',
        image_path: '',
        nationality: '',
        weight: ''
    };
    let errorMsg = ERROR_MSG;

    if (typeof player.data !== "undefined") {
        playerInfo = {
            fullname: player.data.fullname,
            image_path: player.data.image_path,
            nationality: player.data.nationality,
            weight: player.data.weight
        };
        errorMsg = '';
    }

    return {
        ...state,
        playerInfo: playerInfo,
        errorMsg: errorMsg
    }
}

function removeTeamInfo(state) {
    return {
        ...state,
        playerInfo: {
            fullname: '',
            image_path: '',
            nationality: '',
            weight: ''
        }
    }
}

function removePlayerInfo(state) {
    return {
        ...state,
        teamInfo: {
            team_name: '',
            team_image: '',
            squad: []
        }
    }
}

function showErrorMsg(state, msg) {
    return {
        ...state,
        errorMsg: msg
    }
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        state = INITIAL_STATE;
    }
    switch (action.type) {
        case teams.GET_LEAGUES_INFO:
            return getLeagues(state, action.data);
        case teams.GET_SEASONS_INFO:
            return getSeasons(state, action.data);
        case teams.GET_TEAMS_INFO:
            return getTeams(state, action.data);
        case teams.GET_TEAM_INFO:
            return getTeamInfo(state, action.data);
        case teams.GET_SCORERS_INFO:
            return getScorersInfo(state, action.data);
        case teams.GET_PLAYER_INFO:
            return getPlayerInfo(state, action.data);
        case teams.REMOVE_TEAM_INFO:
            return removeTeamInfo(state);
        case teams.REMOVE_PLAYER_INFO:
            return removePlayerInfo(state);
        case teams.SHOW_ERROR_MSG:
            return showErrorMsg(state, action.data);
        default:
            return state;
    }
}