from app import app
from flask import Flask, request, jsonify, render_template
from canvasapi import Canvas
from bs4 import BeautifulSoup
from textblob import TextBlob

@app.route('/')
@app.route('/sentiment')
def sentiment():
    API_KEY = '2096~ppaS3UNodRDzyJ6hkPVbzbJwixKpCwGq36Nc2PvuqviZfR74ZMl3fpRC9WHLfoIm'
    API_URL = 'https://gatech.instructure.com'
    AUTH_HEADER = {"Authorization": "Bearer {}".format(API_KEY)}

    # Create Canvas object and get a discussion's message
    canvas = Canvas(API_URL, API_KEY)
    course = canvas.get_course(109608)
    topics = course.get_discussion_topics()

    topicArr = []
    for topic in topics:
        sentenceDict = {}
        html = topic.message
        soup = BeautifulSoup(html, 'html.parser')
        blob = TextBlob(soup.get_text())

        for sentence in blob.sentences:
            sentenceDict[sentence] = sentence.sentiment
        topicArr.append(sentenceDict)

    return render_template('discussion_sentiment.html', topics = topicArr)
