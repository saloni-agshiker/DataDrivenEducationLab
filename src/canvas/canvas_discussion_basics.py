import textstat
from bs4 import BeautifulSoup
from canvasapi import Canvas
from textblob import TextBlob
from pprint import pprint

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

# Adding more parameters!


def nlp_parameters(text):
    """Given some text return common NLP parameters."""
    blob = TextBlob(text)
    n_words = len(blob.words)
    n_u_words = len(set(blob.words))
    type_token_ratio = n_words/n_u_words
    return {
        "polarity": blob.sentiment.polarity,
        "subjectivity": blob.sentiment.subjectivity,
        "flesch_kincaid_grade": textstat.flesch_kincaid_grade(text),
        "flesch_reading_ease": textstat.flesch_reading_ease(text),
        "n_words": n_words,
        "n_u_words": n_u_words,
        "type_token_ratio": type_token_ratio
    }


for topic in topics:
    html = topic.message
    soup = BeautifulSoup(html, 'html.parser')
    text = soup.get_text()
    pprint(nlp_parameters(text))
