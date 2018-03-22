import teams from '../actions/teamsActions';

const INITIAL_STATE = {
    teams: [],
    leagues: [],
    seasons: [],
    teamInfo: {
        teamName: '',
        teamImagePath: '',
        squad: []
    }
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
    let result = teams.data[0].standings.data.map(team => {
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
        teams: result
    };
}

function getTeamInfo(state, team) {
    // let squad = team.data.squad.data.map(player => {
    //     return {
    //         id: player.id
    //     }
    // })
    // console.log('reducer', team);

    return {
        ...state
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
        default:
            return state;
    }
}