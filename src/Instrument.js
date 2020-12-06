import React, {Fragment, useState, useEffect} from "react";
import isAccidentalNote from "./utils/isAccidentalNote";
import {getKeyboardShortcutsForNote} from "./utils/getKeyboardShortcutsForNote";
import InstrumentAudio from "./Keyboard/InstrumentAudio";
import getNotesBetween from "./utils/getNotesBetween";
import RecordButton from "./RecordButton";
import PlayButton from "./PlayButton";

const isRegularKey = event => {
    return !event.ctrlKey && !event.metaKey && !event.shiftKey;
};

const Instrument = ({
                        instrumentName,
                        startNote,
                        endNote,
                        renderPianoKey,
                        keyboardMap
                    }) => {
    const notes = getNotesBetween(startNote, endNote);

    const [state, setState] = useState({
        startDate: new Date(),
        notesPlaying: [],
        notesRecording: [],
        recordingIsOn: false,
        playingIsOn: false
    });

    const changePlayingState = () => {
        state.playingIsOn = !state.playingIsOn;

        if (state.playingIsOn) {
            state.notesRecording.map(data => {
                setTimeout(() => {
                    if (data.action === 'down') {
                        handleKeyDown({key: data.key})
                    } else {
                        handleKeyUp({key: data.key})
                    }
                }, data.time)
            })
        }
    }

    const changeRecordingState = () => {
        state.recordingIsOn = !state.recordingIsOn;
        if (state.recordingIsOn) {
            state.notesRecording = []
        }
        state.startDate = new Date();
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }, []);

    const getNoteFromKeyboardKey = keyboardKey => {
        return keyboardMap[keyboardKey.toUpperCase()];
    };

    const handleKeyDown = e => {
        if (isRegularKey(e) && !e.repeat) {
            if (state.recordingIsOn) {
                const curDate = new Date();
                const data = {
                    key: e.key,
                    action: 'down',
                    time: curDate - state.startDate
                }
                state.notesRecording = [...state.notesRecording, data]
            }

            const note = getNoteFromKeyboardKey(e.key);
            if (note) {
                setState({...state, notesPlaying: [...state.notesPlaying, note]});
            }
        }
    };

    const handleKeyUp = e => {
        if (isRegularKey(e) && !e.repeat) {
            if (state.recordingIsOn) {
                const curDate = new Date();
                const data = {
                    key: e.key,
                    action: 'up',
                    time: curDate - state.startDate
                }
                state.notesRecording = [...state.notesRecording, data]
            }

            const note = getNoteFromKeyboardKey(e.key);
            if (note) {
                setState({
                    ...state,
                    notesPlaying: state.notesPlaying.filter(
                        notePlaying => notePlaying !== note
                    )
                });
            }
        }
    };

    const onPlayNoteStart = note => {
        setState({...state, notesPlaying: [...state.notesPlaying, note]});
    };

    const onPlayNoteEnd = note => {
        setState({
            ...state,
            notesPlaying: state.notesPlaying.filter(
                notePlaying => notePlaying !== note
            )
        });
    };

    //rendering piano keys
    return (
        <Fragment>
            <div>
                <RecordButton
                    changeRecordingState={changeRecordingState}
                />
                <PlayButton
                    changePlayingState={changePlayingState}
                />
            </div>
            {notes.map(note => {
                return (
                    <Fragment key={note}>
                        {renderPianoKey({
                            note,
                            isAccidentalNote: isAccidentalNote(note),
                            isNotePlaying: state.notesPlaying.includes(note),
                            startPlayingNote: () => onPlayNoteStart(note),
                            stopPlayingNote: () => onPlayNoteEnd(note),
                            keyboardShortcut: getKeyboardShortcutsForNote(keyboardMap, note)
                        })}
                    </Fragment>
                );
            })}

            <InstrumentAudio
                instrumentName={instrumentName}
                notes={state.notesPlaying}
            />
        </Fragment>
    )
        ;
};

export default Instrument;
