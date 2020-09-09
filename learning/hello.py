from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/discussion_topics')
def discsussion_topics():
    return render_template('discussion_topics.html')
