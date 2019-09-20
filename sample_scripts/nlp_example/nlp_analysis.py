import connect
from textblob import TextBlob

"""
This is an example script of how to do the main functions required for the NLP
project. See README.md for instructions.
"""


def start_instance():
    """Boots the ec2 instance."""
    ec2 = boto3.client('ec2', region_name='us-east-1')
    ec2.start_instances(InstanceIds=[creds.c21u_ec2['id']])
    waiter = ec2.get_waiter('instance_running')
    waiter.wait()


def mongo_client():
    """Connect to mongo client."""
    client = pymongo.MongoClient(
        **creds.c21u_mongo,
        authMechanism='SCRAM-SHA-256',
    )
    return client


def mongo_database(db_name):
    """Connect to mongo database."""
    client = mongo_client()
    return client[db_name]


def print_negative_sentiment(db, limit=-0.8):
    """Prints any sentences below the sentiment limit from edX forums."""
    for post in db.forum.find():
        blob = TextBlob(post['body'])
        for sentence in blob.sentences:
            if sentence.sentiment.polarity < limit:
                print(sentence)


def main():
    db = connect.get_db()
    print_negative_sentiment(db)

if __name__ == '__main__':
    main()
