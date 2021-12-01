from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from forum_database import *

app = Flask(__name__)

# create graphs from data in database and place them into static/images
graph_data()

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug = True)