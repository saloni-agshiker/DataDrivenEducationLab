import pymongo
import creds
from textblob import TextBlob


def mongo_client():
    """Connect to mongo client."""
    client = pymongo.MongoClient(
        host=creds.c21u_mongo['host'],
        port=int(creds.c21u_mongo['port']),
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


def print_negative_sentiment(db, limit=-0.8):
    for post in db.forum.find():
        blob = TextBlob(post['body'])
        for sentence in blob.sentences:
            if sentence.sentiment.polarity < limit:
                print(sentence)


def main():
    db = mongo_database(creds.c21u_mongo['database'])
    print_negative_sentiment(db)

if __name__ == '__main__':
    main()
