import json
from connectors import connect

"""
Script to upload piazza scraped documents.
For Shawn only for now.
"""

FILES = [
    'data/ISYE6501_Fall_18.json',
    'data/ISYE6501_Spring_19.json'
]


def strip_pii(user):
    return {
        'role': user['role'],
        'admin': user['admin'],
        'id': user['id']
    }


def process_course(course):
    course['users'] = [strip_pii(user) for user in course['users']]
    return course


def process_courses(filename):
    with open(filename, 'r') as f:
        return json.load(f)


def main():
    courses = []
    for filename in FILES:
        courses += process_courses(filename)
    courses = map(process_course, courses)
    db = connect.mongo_database('edx')
    db['piazza'].insert_many(courses)


if __name__ == '__main__':
    main()
