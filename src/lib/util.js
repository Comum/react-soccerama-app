module.exports = {
    getHeaderOptionValue: getHeaderOptionValue
};

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