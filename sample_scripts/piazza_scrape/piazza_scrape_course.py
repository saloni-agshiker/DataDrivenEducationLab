from piazza_api import Piazza
import json

EMAIL = 'EMAIL'
PASSWORD = 'PASSWORD'
COURSES = ['COURSENAME']



def process_course(p, course_dict):
    course_obj = p.network(course_dict['nid'])
    course_dict['posts'] = course_obj.iter_all_posts()
    course_dict['users'] = course_obj.get_all_users()
    return course_dict


def main():
    p = Piazza()
    p.user_login(email=EMAIL, password=PASSWORD)
    #print ([course for course in p.get_user_classes()])
    piazza = []
    for course in p.get_user_classes():
        if course['nid'] in COURSES:
            piazza.append(process_course(p, course))
    with open('piazza.json', 'w') as f:
        json.dump(piazza, f, default=list, indent = 4)

if __name__ == '__main__':
    main()
