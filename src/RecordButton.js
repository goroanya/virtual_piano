import React from "react";

class RecordButton extends React.Component {
    constructor(props) {
        super(props);

        this.changeRecordingState = props.changeRecordingState;
        this.state = {
            recordingIsOn: false
        }
    }

    changeState() {
        this.changeRecordingState();
        this.setState({recordingIsOn: !this.state.recordingIsOn})
    }

    render() {
        let btnColor = this.state.recordingIsOn ? "▣" : "◉";

        return (
            <div>
                <button color={btnColor} onClick={this.changeState.bind(this)}>
                    {btnColor}
                </button>
            </div>
        )
    }
}

export default RecordButton;