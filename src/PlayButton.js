import React from "react";

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.playingIsOn)
        const btnText = this.props.playingIsOn ? '𝅘𝅥𝅮' : '▶'
        return (
            <div>
                <button style={{width: 30}} onClick={this.props.changePlayingState}>
                    {btnText}
                </button>
            </div>
        )
    }
}

export default PlayButton;