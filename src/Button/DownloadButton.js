import React from "react";
import {Button} from "react-bootstrap";

class DownloadButton extends React.Component {
    constructor(props) {
        super(props);

        this.melody_url = this.melody_url.bind(this);
        this.download = this.download.bind(this);
    }

    melody_url() {
        const notes = this.props.notesRecording;
        let url = 'http://127.0.0.1:5000/download/melody.mp3?notes=' + JSON.stringify(notes)
        while (url.includes('#')) {
            url = url.replace('#', '_')
        }
        return url;
    }

    download() {
        window.open(this.melody_url(), "_blank")
    }

    render() {
        const disabled = this.props.notesRecording.length === 0 || this.props.recordingIsOn;
        console.log(this.melody_url())
        return (
            <div>
                <Button disabled={disabled} variant="warning" style={{width: 50, height: 47, margin: 8}} onClick={this.download}>
                    <img width={20} src="download.svg"/>
                </Button>
            </div>
        )
    }
}

export default DownloadButton;