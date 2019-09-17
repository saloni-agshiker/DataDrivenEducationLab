import pymongo
from bson import json_util
import psycopg2
import creds
from textblob import TextBlob


def mongo_client():
    """Connect to mongo client."""
    client = pymongo.MongoClient(
        creds.c21u_mongo['host'],
        int(creds.c21u_mongo['port']),
        username=creds.c21u_mongo['user'],
        password=creds.c21u_mongo['password'],
        authSource='admin',
        authMechanism='SCRAM-SHA-256',
    )
    return client


def mongo_database(db_name):
    """Connect to mongo database."""
    client = mongo_client()
    return client[db_name]


def process_edx_forum(db):
    for post in db.forum.find():
        blob = TextBlob(post['body'])
        for sentence in blob.sentences:
            if sentence.sentiment.polarity < -0.8:
                print(sentence)


def main():
    db = mongo_database(creds.c21u_mongo['database'])
    process_edx_forum(db)

if __name__ == '__main__':
    main()
