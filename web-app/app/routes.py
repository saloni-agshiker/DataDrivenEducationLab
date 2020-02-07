from app import app
from flask import Flask, request, jsonify
from canvasapi import Canvas

API_KEY = '2096~ppaS3UNodRDzyJ6hkPVbzbJwixKpCwGq36Nc2PvuqviZfR74ZMl3fpRC9WHLfoIm'
API_URL = 'https://gatech.instructure.com'
AUTH_HEADER = {"Authorization": "Bearer {}".format(API_KEY)}

# Create Canvas object and get a discussion's message
canvas = Canvas(API_URL, API_KEY)
course = canvas.get_course(109608)
topics = course.get_discussion_topics()
html = topics[0].message

soup = BeautifulSoup(html, 'html.parser')
blob = TextBlob(soup.get_text())

@app.route('/')
@app.route('/sentiment')
def sentiment():
    return blob.sentiment
