const AudioPlayer = () => {
    const Player = {
        playNote(note) {
            if (note) {
                const audio = new Audio('http://127.0.0.1:5000/note/' + note.replace('#', '_'))
                return audio.play()
            }
        }
    };

    return Player;
};

export default AudioPlayer;
