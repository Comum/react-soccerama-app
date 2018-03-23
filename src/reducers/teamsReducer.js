import teams from '../actions/teamsActions';

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
    }
}

function filterLeaguesInfo(info) {
    return info.map(league => {
        return {
            id: league.id,
            name: league.name
        }
    });
}

function getLeagues(state, leaguesInfo) {
    let leagues = filterLeaguesInfo(leaguesInfo.data);

    return {
        ...state,
        leagues: leagues
    };
}

function getSeasons(state, seasonsInfo) {
    // TODO: make into a function
    let seasons = seasonsInfo.map(season => {
        return {
            id: season.id,
            name: season.name
        };
    });

    return {
        ...state,
        seasons: seasons,
        teams: []
    };
}


function getTeams(state, data) {
    // TODO: make into a function
    let result = data.teams.data[0].standings.data.map(team => {
        return {
            id: team.team_id,
            position: team.position,
            team_name: team.team_name,
            played: team.overall.games_played, 
            won: team.overall.won,
            drawn: team.overall.draw,
            lost: team.overall.lost,
            goal: team.overall.goals_scored,
            difference: team.total.goal_difference,
            points: team.total.points
        }
    });

    return {
        ...state,
        teams: result,
        selectedSeason: data.selectedSeason
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