import React from 'react';

class Seasons extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            seasons: [],
            seasonsClass: 'display-none'
        }
    }

    componentWillReceiveProps(nextState) {
        let seasonsClass = 'display-none';

        if (nextState.seasons.length) {
            seasonsClass = '';
        }

        this.setState({
            seasonsClass: seasonsClass,
            seasons: nextState.seasons
        });
    }

    handleLeagueChange = evt => {
        this.props.onChangeSeason(parseInt(evt.target.value, 10));
    }

    render() {
        return (
            <div className={this.state.seasonsClass}>
                <select onChange={this.handleLeagueChange}>
                    <option key="0" value="0">--Season--</option>
                    {this.state.seasons.map(season => 
                        <option key={season.id} value={season.id}>{season.name}</option>
                    )}
                </select>
            </div>
        );
    }
}

export default Seasons;