import teams from '../actions/teamsActions';

const INITIAL_STATE = {
    teams: [],
    leagues: [],
    seasons: []
}

function getLeagues(state, leaguesInfo) {
    let leagues = leaguesInfo.data.map(league => {
        return {
            id: league.id,
            name: league.name
        }
    });

    return {
        ...state,
        leagues: leagues
    };
}

function getSeasons(state, seasonsInfo) {
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


function getTeams(state, teams) {
    return {
        ...state,
        teams: teams.data[0].standings.data
    };
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
        default:
            return state;
    }
}