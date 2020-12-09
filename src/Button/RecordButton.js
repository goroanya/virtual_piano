import React from "react";
import {Button} from "react-bootstrap";

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
        let imgUrl = this.state.recordingIsOn ? 'black-square.svg' : 'red-circle.png';

        return (
            <div>
                <Button disabled={this.props.playingIsOn} variant="secondary" style={{width: 50, height: 47, margin: 8}} onClick={this.changeState.bind(this)}>
                    <img width={20} src={imgUrl}/>
                </Button>
            </div>
        )
    }
}

export default RecordButton;