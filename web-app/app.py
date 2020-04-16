from flask import Flask, render_template, request, json
from canvasapi import Canvas
from bs4 import BeautifulSoup
from textblob import TextBlob
app = Flask(__name__)

API_KEY = '2096~ppaS3UNodRDzyJ6hkPVbzbJwixKpCwGq36Nc2PvuqviZfR74ZMl3fpRC9WHLfoIm'
API_URL = 'https://gatech.instructure.com'
AUTH_HEADER = {"Authorization": "Bearer {}".format(API_KEY)}

# Create Canvas object and get a discussion's message
canvas = Canvas(API_URL, API_KEY)
course = canvas.get_course(109608)
courseName = course.name
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

@app.route("/")
def main():
    return render_template('courses.html', course=courseName, topics=topicArr)

if __name__ == "__main__":
    app.run()
