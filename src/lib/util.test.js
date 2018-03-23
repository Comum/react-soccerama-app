import {
    getHeaderOptionValue,
    getNewHeaderState,
    getNewHeaderColumns,
    getNewTeamOrder,
    filterSeasons,
    filterTeams
} from './util.js';

//-----------------------------------------------------------------------
// TEST getHeaderOptionValue()
test('Should return the expected header option value', () => {
    const optionId = 0;
    const expected = 'position';
    const result = getHeaderOptionValue(optionId);

    expect(result).toEqual(expected);
});

test('Should return the expected header option value', () => {
    const optionId = 1;
    const expected = 'team_name';
    const result = getHeaderOptionValue(optionId);

    expect(result).toEqual(expected);
});

test('Should return the expected header option value', () => {
    const optionId = 2;
    const expected = 'played';
    const result = getHeaderOptionValue(optionId);

    expect(result).toEqual(expected);
});

test('Should return the expected header option value', () => {
    const optionId = 3;
    const expected = 'won';
    const result = getHeaderOptionValue(optionId);

    expect(result).toEqual(expected);
});

test('Should return the expected header option value', () => {
    const optionId = 4;
    const expected = 'lost';
    const result = getHeaderOptionValue(optionId);

    expect(result).toEqual(expected);
});

test('Should return the expected header option value', () => {
    const optionId = 5;
    const expected = 'goal';
    const result = getHeaderOptionValue(optionId);

    expect(result).toEqual(expected);
});

test('Should return the expected header option value', () => {
    const optionId = 6;
    const expected = 'difference';
    const result = getHeaderOptionValue(optionId);

    expect(result).toEqual(expected);
});

test('Should return the expected header option value', () => {
    const optionId = 7;
    const expected = 'points';
    const result = getHeaderOptionValue(optionId);

    expect(result).toEqual(expected);
});

//-----------------------------------------------------------------------
// TEST getNewHeaderState()
test('Should return the next header state', () => {
    const currentState = 'default';
    const expected = 'topBorder';
    const result = getNewHeaderState(currentState);

    expect(result).toEqual(expected);
});

test('Should return the next header state', () => {
    const currentState = 'topBorder';
    const expected = 'bottomBorder';
    const result = getNewHeaderState(currentState);

    expect(result).toEqual(expected);
});

test('Should return the next header state', () => {
    const currentState = 'bottomBorder';
    const expected = 'default';
    const result = getNewHeaderState(currentState);

    expect(result).toEqual(expected);
});

//-----------------------------------------------------------------------
// TEST getNewHeaderColumns()
test('Should change the state of the indexed option', () => {
    const originalState = [
        {name: "Position", searchState: "default"},
        {name: "Team Name", searchState: "default"},
        {name: "Played", searchState: "default"},
        {name: "Won", searchState: "default"},
        {name: "Drawn", searchState: "default"},
        {name: "Lost", searchState: "default"},
        {name: "Goal", searchState: "default"},
        {name: "Difference", searchState: "default"},
        {name: "Points", searchState: "default"}
    ];
    const newColumnState = {name: "Team Name", searchState: "topBorder"};
    const index = 1;
    const expected = [
        {name: "Position", searchState: "default"},
        {name: "Team Name", searchState: "topBorder"},
        {name: "Played", searchState: "default"},
        {name: "Won", searchState: "default"},
        {name: "Drawn", searchState: "default"},
        {name: "Lost", searchState: "default"},
        {name: "Goal", searchState: "default"},
        {name: "Difference", searchState: "default"},
        {name: "Points", searchState: "default"}
    ];
    const result = getNewHeaderColumns(originalState, newColumnState, index);

    expect(result).toEqual(expected);
});

test('Should change the state of the indexed option', () => {
    const originalState = [
        {name: "Position", searchState: "default"},
        {name: "Team Name", searchState: "topBorder"},
        {name: "Played", searchState: "default"},
        {name: "Won", searchState: "default"},
        {name: "Drawn", searchState: "default"},
        {name: "Lost", searchState: "default"},
        {name: "Goal", searchState: "default"},
        {name: "Difference", searchState: "default"},
        {name: "Points", searchState: "default"}
    ];
    const newColumnState = {name: "Team Name", searchState: "bottomBorder"};
    const index = 1;
    const expected = [
        {name: "Position", searchState: "default"},
        {name: "Team Name", searchState: "bottomBorder"},
        {name: "Played", searchState: "default"},
        {name: "Won", searchState: "default"},
        {name: "Drawn", searchState: "default"},
        {name: "Lost", searchState: "default"},
        {name: "Goal", searchState: "default"},
        {name: "Difference", searchState: "default"},
        {name: "Points", searchState: "default"}
    ];
    const result = getNewHeaderColumns(originalState, newColumnState, index);

    expect(result).toEqual(expected);
});

test('Should change the state of the indexed option', () => {
    const originalState = [
        {name: "Position", searchState: "default"},
        {name: "Team Name", searchState: "bottomBorder"},
        {name: "Played", searchState: "default"},
        {name: "Won", searchState: "default"},
        {name: "Drawn", searchState: "default"},
        {name: "Lost", searchState: "default"},
        {name: "Goal", searchState: "default"},
        {name: "Difference", searchState: "default"},
        {name: "Points", searchState: "default"}
    ];
    const newColumnState = {name: "Team Name", searchState: "default"};
    const index = 1;
    const expected = [
        {name: "Position", searchState: "default"},
        {name: "Team Name", searchState: "default"},
        {name: "Played", searchState: "default"},
        {name: "Won", searchState: "default"},
        {name: "Drawn", searchState: "default"},
        {name: "Lost", searchState: "default"},
        {name: "Goal", searchState: "default"},
        {name: "Difference", searchState: "default"},
        {name: "Points", searchState: "default"}
    ];
    const result = getNewHeaderColumns(originalState, newColumnState, index);

    expect(result).toEqual(expected);
});

//-----------------------------------------------------------------------
// TEST getNewTeamOrder()
test('Should returned the team ordered', () => {
    const originalState = [
        { team_name: "Celtic" }, 
        { team_name: "Aberdeen" },
        { team_name: "Hearts" },
        { team_name: "Dundee" },
        { team_name: "Hamilton Academical" },
        { team_name: "St. Johnstone" },
        { team_name: "Hibernian" },
        { team_name: "Kilmarnock" },
        { team_name: "Partick Thistle" },
        { team_name: "Rangers" },
        { team_name: "Motherwell" },
        { team_name: "Ross County" }
    ];
    const orderInverter = 1;
    const comparingTerm = 'team_name';
    const expected = [
        { team_name: "Aberdeen" },
        { team_name: "Celtic" }, 
        { team_name: "Dundee" },
        { team_name: "Hamilton Academical" },
        { team_name: "Hearts" },
        { team_name: "Hibernian" },
        { team_name: "Kilmarnock" },
        { team_name: "Motherwell" },
        { team_name: "Partick Thistle" },
        { team_name: "Rangers" },
        { team_name: "Ross County" },
        { team_name: "St. Johnstone" }
    ];
    const result = getNewTeamOrder(originalState, orderInverter, comparingTerm);

    expect(result).toEqual(expected);
});

test('Should returned the team ordered', () => {
    const originalState = [
        { team_name: "Celtic" }, 
        { team_name: "Aberdeen" },
        { team_name: "Hearts" },
        { team_name: "Dundee" },
        { team_name: "Hamilton Academical" },
        { team_name: "St. Johnstone" },
        { team_name: "Hibernian" },
        { team_name: "Kilmarnock" },
        { team_name: "Partick Thistle" },
        { team_name: "Rangers" },
        { team_name: "Motherwell" },
        { team_name: "Ross County" }
    ];
    const orderInverter = -1;
    const comparingTerm = 'team_name';
    const expected = [
        { team_name: "St. Johnstone" },
        { team_name: "Ross County" },
        { team_name: "Rangers" },
        { team_name: "Partick Thistle" },
        { team_name: "Motherwell" },
        { team_name: "Kilmarnock" },
        { team_name: "Hibernian" },
        { team_name: "Hearts" },
        { team_name: "Hamilton Academical" },
        { team_name: "Dundee" },
        { team_name: "Celtic" }, 
        { team_name: "Aberdeen" }
    ];
    const result = getNewTeamOrder(originalState, orderInverter, comparingTerm);

    expect(result).toEqual(expected);
});

//-----------------------------------------------------------------------
// TEST filterSeasons()
test('Should returned the seasons params filtered', () => {
    const originalState = [
        { current_round_id: null, current_stage_id: null, id: 1927, is_current_season: false, league_id: 501, name: "2005/2006" }, 
        { current_round_id: null, current_stage_id: null, id: 1928, is_current_season: false, league_id: 501, name: "2006/2007"}
    ];
    const expected = [
        { id: 1927, name: "2005/2006" }, 
        { id: 1928, name: "2006/2007"}
    ];
    const result = filterSeasons(originalState);

    expect(result).toEqual(expected);
});

//-----------------------------------------------------------------------
// TEST filterTeams()

test('Should returned the teams params filtered', () => {
    const originalState = [
        {
            away: {},
            group_id: null,
            group_name: null,
            home: {},
            overall: {
                draw: 8,
                games_played: 30,
                goals_against: 20,
                goals_scored: 59,
                lost: 2,
                won: 20
            },
            points: 68,
            position: 1,
            recent_form: "DWWDL",
            result: "Promotion - Premiership (Championship Group)",
            status: "same",
            team_id: 53,
            team_name: "Celtic",
            total: {
                goal_difference: "+39",
                points: 68
            }
        },
        {
            away: {},
            group_id: null,
            group_name: null,
            home: {},
            overall: {
                draw: 4,
                games_played: 31,
                goals_against: 36,
                goals_scored: 61,
                lost: 9,
                won: 18
            },
            points: 58,
            position: 2,
            recent_form: "LLWWW",
            result: "Promotion - Premiership (Championship Group)",
            status: "same",
            team_id: 62,
            team_name: "Rangers",
            total: {
                goal_difference: "+25",
                points: 58
            }
        }
    ];
    const expected = [
        { 
            difference: "+39",
            drawn: 8,
            goal: 59,
            id: 53,
            lost: 2,
            played: 30,
            points: 68,
            position: 1,
            team_name: "Celtic",
            won: 20
        }, 
        {
            difference: "+25",
            drawn: 4,
            goal: 61,
            id: 62,
            lost: 9,
            played: 31,
            points: 58,
            position: 2,
            team_name: "Rangers",
            won: 18
        }
    ];
    const result = filterTeams(originalState);

    expect(result).toEqual(expected);
});