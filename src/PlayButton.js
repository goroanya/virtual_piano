import React from "react";

class PlayButton extends React.Component {
    constructor(props) {
        super(props);

        this.changePlayingState = props.changePlayingState;
        this.state = {
            playingIsOn: false
        }
    }

    changeState() {
        this.changePlayingState();
        this.setState({playingIsOn: !this.state.playingIsOn})
    }

    render() {
        return (
            <div>
                <button color={'#ff0'} onClick={this.changeState.bind(this)}>
                    ▶
                </button>
            </div>
        )
    }
}

export default PlayButton;