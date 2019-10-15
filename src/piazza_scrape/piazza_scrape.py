import sys
import json
from piazza_api import Piazza
from piazza_creds import *


ARGV_ERROR = """PLEASE PROVIDE COMMAND LINE ARGUMENTS:
list_courses
    Lists the courses you are enrolled in. Useful to input into
    piazza_creds.py
save_data FILENAME
    saves the forum data given credentials and courses in
    piazza_creds.py into FILENAME
"""


def login():
    p = Piazza()
    p.user_login(email=EMAIL, password=PASSWORD)
    return p


def process_course(p, course_dict):
    course_obj = p.network(course_dict['nid'])
    course_dict['posts'] = course_obj.iter_all_posts()
    course_dict['users'] = course_obj.get_all_users()
    return course_dict


def print_courses(p):
    print([course for course in p.get_user_classes()])


def save_data(p, filename):
    piazza = []
    for course in p.get_user_classes():
        if course['nid'] in NIDS:
            piazza.append(process_course(p, course))
    with open(filename, 'w') as f:
        json.dump(piazza, f, default=list, indent=4)


def main():
    p = login()
    if len(sys.argv) > 1 and sys.argv[1] == 'list_courses':
        print_courses(p)
    elif sys.argv[1] == 'save_data':
        if len(sys.argv) == 3:
            save_data(p, sys.argv[2])
        else:
            print("Please provide a filename.")
    else:
        print(ARGV_ERROR)


if __name__ == '__main__':
    main()
