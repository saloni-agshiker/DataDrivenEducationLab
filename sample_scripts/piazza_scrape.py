from piazza_api import Piazza
import json

EMAIL = ''
PASSWORD = ''


def process_course(p, course_dict):
    course_obj = p.network(course_dict['nid'])
    course_dict['posts'] = course_obj.iter_all_posts()
    course_dict['users'] = course_obj.get_all_users()
    return course_dict


def main():
    p = Piazza()
    p.user_login(email=EMAIL, password=PASSWORD)
    piazza = [
        process_course(p, course_dict) for course_dict in p.get_user_classes()
    ]
    with open('piazza.json', 'w') as f:
        json.dump(piazza, f, default=list)

if __name__ == '__main__':
    main()
