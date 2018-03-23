import React from 'react';

class PlayerModal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            playerInfo: props.playerInfo
        }
    }

    componentWillReceiveProps(nextState) {
        this.setState({
            playerInfo: nextState.playerInfo
        })
    }

    render() {
        return (
            <div className="Modal">
                <button className="Modal--closeButton" onClick={this.props.closeModal}>x</button>
                    
                <h2 className="Modal--center m-t-16">{this.state.playerInfo.fullname}</h2>
                <img className="Modal--center" src={this.state.playerInfo.image_path} alt="player_image"/>
                <ul className="Modal--content">
                    <li>
                        Nationality: {this.state.playerInfo.nationality}
                    </li>
                    <li>
                        Weight: {this.state.playerInfo.weight}
                    </li>
                </ul>
            </div>
        )
    }
}

export default PlayerModal;