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
    return {
        ...state,
        teamInfo: team
    }
}

function getScorersInfo(state, scorers) {
    return {
        ...state,
        goalscorers: scorers
    }
}

function getPlayerInfo(state, player) {
    let playerInfo = {
        fullname: player.data.fullname,
        image_path: player.data.image_path,
        nationality: player.data.nationality,
        weight: player.data.weight
    }

    return {
        ...state,
        playerInfo: playerInfo
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
        default:
            return state;
    }
}