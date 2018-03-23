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

