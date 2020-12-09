import React from "react";
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = this.props.playingIsOn ? 'btn btn-danger' : 'btn btn-success'
        return (
            <div>
                <Button disabled={this.props.playingIsOn || this.props.recordingIsOn || this.props.notesRecording.length == 0} variant={style} style={{width: 50, height: 47, margin: 7}} onClick={this.props.changePlayingState}>
                    <img width={20} src="play.svg"/>
                </Button>
            </div>
        )
    }
}

export default PlayButton;