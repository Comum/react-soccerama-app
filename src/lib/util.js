/**
 * @param {number} i
 * @return {string}
 */
function getHeaderOptionValue(i) {
    switch(i) {
        case 0:
            return 'position';
        case 1:
            return 'team_name';
        case 2:
            return 'played';
        case 3:
            return 'won';
        case 4:
            return 'lost';
        case 5:
            return 'goal';
        case 6:
            return 'difference';
        case 7:
            return 'points';
    }
}

/**
 * @return {array}
 */
function getHeaders() {
    let columns = [{
        name: 'Position',
        searchState: 'default' 
    },
    {
        name: 'Team Name',
        searchState: 'default' 
    },
    {
        name: 'Played',
        searchState: 'default' 
    },
    {
        name: 'Won',
        searchState: 'default' 
    },
    {
        name: 'Drawn',
        searchState: 'default' 
    },
    {
        name: 'Lost',
        searchState: 'default' 
    },
    {
        name: 'Goal',
        searchState: 'default' 
    },
    {
        name: 'Difference',
        searchState: 'default' 
    },
    {
        name: 'Points',
        searchState: 'default' 
    }];

    return columns;
}

/**
 * @param {string} currentState
 * @return {string}
 */
function getNewHeaderState(currentState) {
    switch(currentState) {
        case 'default':
            return 'topBorder';
        case 'topBorder':
            return 'bottomBorder';
        default:
            return 'default';
    }
}

/**
 * @param {array} columns
 * @param {object} newColumn
 * @param {number} index
 * @return {array}
 */
function getNewHeaderColumns(columns, newColumn, index) {
    return [
        ...columns.slice(0, index),
        newColumn,
        ...columns.slice(index + 1)
    ];
}

/**
 * 
 * @param {array} teams
 * @param {number} orderInverter
 * @param {string} comparingTerm
 * @return {array}
 */
function getNewTeamOrder(teams, orderInverter, comparingTerm) {
    return teams.sort((a, b) => {
        let diff = 0;

        if (a[comparingTerm] < b[comparingTerm]) {
            diff = -1;
        }
        if(a[comparingTerm] > b[comparingTerm]) {
            diff = 1;
        }

        return diff * orderInverter;
    });
}

/**
 * @param {array} seasons
 * @return {array} 
 */
function filterSeasons(seasons) {
    return seasons.map(season => {
        return {
            id: season.id,
            name: season.name
        };
    });
}

function filterTeams(teams) {
    return teams.map(team => {
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
}

module.exports = {
    getHeaderOptionValue: getHeaderOptionValue,
    getHeaders: getHeaders,
    getNewHeaderState: getNewHeaderState,
    getNewHeaderColumns: getNewHeaderColumns,
    getNewTeamOrder: getNewTeamOrder,
    filterSeasons: filterSeasons,
    filterTeams: filterTeams
};