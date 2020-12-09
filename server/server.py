import json

from flask import Flask, send_file, request

import jammer

app = Flask(__name__, static_url_path='')


@app.route('/download/<path:fn>')
def send_melody(fn):
    data = request.args.get('notes')
    melody = json.loads(data.replace('_', '#'))
    melody = [m for m in melody if m['action'] == 'down']
    path = jammer.create_melody(melody)
    return send_file(path)


@app.route('/note/<note>')
def send_note(note):
    path = jammer.get_note_file_path(note.replace('_', '#'))
    return send_file(path)


app.run(port=5000)
