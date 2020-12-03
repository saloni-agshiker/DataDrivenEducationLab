from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('landing/landing_page.html')

@app.route('/discussion_topics')
def discsussion_topics():
    return render_template('discussion_topics.html')
