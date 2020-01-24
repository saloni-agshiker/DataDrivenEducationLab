from bs4 import BeautifulSoup
from canvasapi import Canvas
from textblob import TextBlob

# Initialize the Canvas API credentials
API_KEY = open("canvas_api_key.txt", "r").read()
API_URL = 'https://gatech.instructure.com'
AUTH_HEADER = {"Authorization": "Bearer {}".format(API_KEY)}

# Create Canvas object and get a discussion's message
canvas = Canvas(API_URL, API_KEY)
course = canvas.get_course(109608)
topics = course.get_discussion_topics()
html = topics[0].message

soup = BeautifulSoup(html, 'html.parser')
blob = TextBlob(soup.get_text())
print(blob)
print(blob.sentiment)
print()

for sentence in blob.sentences:
    print(sentence)
    print(sentence.sentiment)
    print()
