import React from 'react';

import Leagues from '../leagues/leagues.js';
import Seasons from '../seasons/seasons.js';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="Header">
                <Leagues    leagues={this.props.leagues}
                            onChangeLeague={this.props.onChangeLeague}/>
                <Seasons    seasons={this.props.seasons}
                            onChangeSeason={this.props.onChangeSeason}/>
            </div>
        )
    }
}

export default Header;