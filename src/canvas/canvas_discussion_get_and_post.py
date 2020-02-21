from bs4 import BeautifulSoup
from canvasapi import Canvas
from textblob import TextBlob
import plotly.graph_objects as go

# Initialize the Canvas API credentials
# Put your credentials in a file called canvas_api_key.txt
API_KEY = open("canvas_api_key.txt", "r").read()
API_URL = 'https://gatech.instructure.com'
AUTH_HEADER = {"Authorization": "Bearer {}".format(API_KEY)}

# Create Canvas object and get a discussion's message
canvas = Canvas(API_URL, API_KEY)
course = canvas.get_course(109608) #109068 is the sandbox course

'''GETTING EXISTING DISCUSSION DATA'''
topics = course.get_discussion_topics()

topic_list = []
for i in topics:
    topic_list.append(str(i))

message_list = []
sentiment_list = []
for i in topics:
    html = i.message
    soup = BeautifulSoup(html, 'html.parser')
    pure_text = soup.get_text()
    message_list.append(pure_text)
    blob = TextBlob(pure_text)
    sentiment_list.append(blob.sentiment)

#[({topic}, {message}, {sentiment}), ...]
info_list = list(zip(topic_list, message_list, sentiment_list))
sentiment_nums = [i.polarity for i in sentiment_list]
fig1 = go.Figure(data = [go.Histogram(x = sentiment_nums)])
fig1.show()

'''GENERATING NEW POSTS'''
# automate the process of posting on canvas (once we get discussion data from somewhere)
# put in data you want to post in messages and titles
messages = ['bc it rained all day! i like rains! ', "i failed my exam 1. homework 1 is due tonight but i haven't started yet. this class is so hard. "]
titles = ['today was a good day', 'today was a bad day']
bundle = list(zip(titles, messages))
for i, j in bundle:
    disccusion_topic_obj = course.create_discussion_topic(title = i, message = j)





