import React, {Fragment} from "react";
import isAccidentalNote from "./utils/isAccidentalNote";
import {getKeyboardShortcutsForNote} from "./utils/getKeyboardShortcutsForNote";
import InstrumentAudio from "./Keyboard/InstrumentAudio";
import getNotesBetween from "./utils/getNotesBetween";
import RecordButton from "./Button/RecordButton";
import PlayButton from "./Button/PlayButton";
import DownloadButton from "./Button/DownloadButton";

const isRegularKey = event => {
    return !event.ctrlKey && !event.metaKey && !event.shiftKey;
};


class Instrument extends React.Component {
    constructor({
                    instrumentName,
                    startNote,
                    endNote,
                    renderPianoKey,
                    keyboardMap
                }) {
        super();
        this.notes = getNotesBetween(startNote, endNote);
        this.instrumentName = instrumentName;
        this.renderPianoKey = renderPianoKey;
        this.keyboardMap = keyboardMap;

        this.state = {
            startDate: new Date(),
            notesPlaying: [],
            notesRecording: [],
            recordingIsOn: false,
            playingIsOn: false
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.changePlayingState = this.changePlayingState.bind(this);
        this.changeRecordingState = this.changeRecordingState.bind(this);
        this.onPlayNoteStart = this.onPlayNoteStart.bind(this);
        this.onPlayNoteEnd = this.onPlayNoteEnd.bind(this);
    }

    changePlayingState() {
        if (this.state.notesRecording.length > 0)
            this.setState(state => ({...state, playingIsOn: !state.playingIsOn}));

        this.state.notesRecording.map(data => {
            setTimeout(() => {
                if (data.action === 'down') {
                    this.handleKeyDown({key: data.key})
                } else {
                    this.handleKeyUp({key: data.key})
                }
            }, data.time)
        })
        if (this.state.notesRecording.length > 0)
            setTimeout(() => {
                this.setState(state => ({...state, playingIsOn: !state.playingIsOn}));
            }, this.state.notesRecording[this.state.notesRecording.length - 1].time)
    }

    changeRecordingState() {
        if (!this.state.recordingIsOn) {
            this.setState({
                ...this.state, notesRecording: [],
                recordingIsOn: !this.state.recordingIsOn,
                startDate: new Date()
            })
        } else {
            this.setState({
                ...this.state,
                recordingIsOn: !this.state.recordingIsOn,
                startDate: new Date()
            })
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    getNoteFromKeyboardKey(keyboardKey) {
        return this.keyboardMap[keyboardKey.toUpperCase()];
    };

    saveHistory(data) {
        if (this.state.recordingIsOn) {
            const curDate = new Date();
            data = {...data, time: curDate - this.state.startDate}
            this.state.notesRecording = [...this.state.notesRecording, data]
        }
    }

    handleKeyDown(e) {
        if (isRegularKey(e) && !e.repeat) {
            const note = this.getNoteFromKeyboardKey(e.key);

            if (note) {
                this.saveHistory({key: e.key, note, action: 'down'})
                this.setState({...this.state, notesPlaying: [...this.state.notesPlaying, note]});
            }
        }
    };

    handleKeyUp(e) {
        if (isRegularKey(e) && !e.repeat) {
            this.saveHistory({key: e.key, action: 'up'})

            const note = this.getNoteFromKeyboardKey(e.key);
            if (note) {
                this.setState({
                    ...this.state,
                    notesPlaying: this.state.notesPlaying.filter(
                        notePlaying => notePlaying !== note
                    )
                });
            }
        }
    };

    noteToKey(note) {
        const reverseMapping = o => Object.keys(o).reduce((r, k) =>
            Object.assign(r, {[o[k]]: (r[o[k]] || []).concat(k)}), {})
        const reverseKeyboardMap = reverseMapping(this.keyboardMap);
        return reverseKeyboardMap[note][0].toLowerCase();
    }

    onPlayNoteStart(e) {
        const key = e.target.innerText.toLowerCase();
        this.handleKeyDown({key})
    };

    onPlayNoteEnd(e) {
        const key = e.target.innerText.toLowerCase();
        this.handleKeyUp({key})
    };

    render() {
        return <Fragment>
            <div>
                <RecordButton
                    changeRecordingState={this.changeRecordingState}
                    playingIsOn={this.state.playingIsOn}
                />
                <PlayButton
                    changePlayingState={this.changePlayingState}
                    playingIsOn={this.state.playingIsOn}
                    recordingIsOn={this.state.recordingIsOn}
                    notesRecording={this.state.notesRecording}
                />
                <DownloadButton
                    notesRecording={this.state.notesRecording}
                    recordingIsOn={this.state.recordingIsOn}
                />
            </div>
            {this.notes.map(note => {
                return (
                    <Fragment key={note}>
                        {this.renderPianoKey({
                            note,
                            isAccidentalNote: isAccidentalNote(note),
                            isNotePlaying: this.state.notesPlaying.includes(note),
                            startPlayingNote: this.onPlayNoteStart,
                            stopPlayingNote: this.onPlayNoteEnd,
                            keyboardShortcut: getKeyboardShortcutsForNote(this.keyboardMap, note)
                        })}
                    </Fragment>
                );
            })}

            <InstrumentAudio
                instrumentName={this.instrumentName}
                notes={this.state.notesPlaying}
            />
        </Fragment>
    }
}

export default Instrument;
