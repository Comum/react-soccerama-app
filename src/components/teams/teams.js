import React from 'react';

import { getHeaderOptionValue } from '../../lib/util.js';

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            teams: props.teams,
            columns: this.getHeaders()
        }
    }

    componentWillReceiveProps(nextState) {
        this.setState({
            teams: nextState.teams
        });
    }

    getHeaders() {
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

    onHeaderClick (i) {
        const headerState = this.state.columns[i].searchState;
        const comparingTerm = getHeaderOptionValue(i);
        let newHeaderState = '';
        let newHeaderColumn;
        let newHeaderColumns = [];
        let newTeamOrder = [];
        let orderInverter = 1;

        switch(headerState) {
            case 'default':
                newHeaderState = 'topBorder';
                break;
            case 'topBorder':
                newHeaderState = 'bottomBorder';
                orderInverter = -1;
                break;
            default:
                newHeaderState = 'default';
        }

        newHeaderColumn = {
            name: this.state.columns[i].name,
            searchState: newHeaderState
        }

        newHeaderColumns = [
            ...this.state.columns.slice(0, i),
            newHeaderColumn,
            ...this.state.columns.slice(i + 1)
        ];

        newTeamOrder = this.state.teams.sort((a, b) => {
            let diff = 0;

            if (a[comparingTerm] < b[comparingTerm]) {
                diff = -1;
            }
            if(a[comparingTerm] > b[comparingTerm]) {
                diff = 1;
            }

            return diff * orderInverter;
        });

        this.setState({
            columns: newHeaderColumns,
            teams: newTeamOrder
        });
    }

    render() {
        console.log(this.state.teams);

        return (
            <div className="Teams">
                <ul className="Teams--header">
                    {this.state.columns.map((field, index) => (
                        <li key={index}
                            className={`Teams--header--field Teams--header--${field.searchState}`}
                            onClick={this.onHeaderClick.bind(this, index)}
                            >
                            {field.name}
                        </li>
                    ))}
                </ul>
                <ul className="Teams--body">
                    {this.state.teams.map(team => (
                        <li key={team.id} className="Teams--body--fieldRow">
                            <ul className="Teams--body--content">
                                <li className="Teams--body--contentField">{team.position}</li>
                                <li className="Teams--body--contentField">{team.team_name}</li>
                                <li className="Teams--body--contentField">{team.played}</li>
                                <li className="Teams--body--contentField">{team.won}</li>
                                <li className="Teams--body--contentField">{team.drawn}</li>
                                <li className="Teams--body--contentField">{team.lost}</li>
                                <li className="Teams--body--contentField">{team.goal}</li>
                                <li className="Teams--body--contentField">{team.difference}</li>
                                <li className="Teams--body--contentField">{team.points}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Teams;