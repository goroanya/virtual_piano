import os
from datetime import datetime

from pydub import AudioSegment


MELODY_FOLDER = 'melody'
if not os.path.exists(MELODY_FOLDER):
    os.mkdir(MELODY_FOLDER)


def get_note_file_path(note):
    print(f'samples/{note}.wav')
    return f'samples/{note}.wav'


def create_melody(melody):
    duration = melody[-1]['time'] + 2000
    audio = AudioSegment.silent(duration=duration)
    for m in melody:
        note_audio = AudioSegment.from_wav(get_note_file_path(m['note']))
        audio = audio.overlay(note_audio, position=m['time'])

    melody_name = datetime.now().strftime('%H-%M-%S_%d-%m-%Y')
    melody_path = f'{MELODY_FOLDER}/{melody_name}.mp3'
    audio.export(melody_path, format='mp3')
    return melody_path
