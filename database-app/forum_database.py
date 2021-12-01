import sqlite3
from matplotlib import pyplot as plt
from matplotlib import style
style.use("fivethirtyeight")


# connect to database (in data.db)
conn = sqlite3.connect('data.db')
# create cursor
c = conn.cursor()

# number of posts in a given week
def get_post_frequency():
    # query week column from table
    c.execute("SELECT Week_No FROM FLAIR")
    items = c.fetchall()

    # counts number of posts made each week
    weeks = {}
    for item in items:
        if item[0] not in weeks:
            weeks[item[0]] = 1
        else:
            weeks[item[0]] += 1

    # sorts dictionary from earliest to most recent week
    return dict(sorted(weeks.items()))

# average polarity of posts in a given week
def get_average_polarity():
    # query database for weeks and polarity score
    c.execute("SELECT Week_No, Polarity_Score FROM FLAIR")
    items = c.fetchall()

    week_polarity = {}

    # gets "total polarity" from posts in a week
    for item in items:
        if item[0] not in week_polarity.keys():
            week_polarity[item[0]] = 0
        week_polarity[item[0]] += item[1]

    weeks = get_post_frequency()

    # determines the average polarity of posts in a week
    for week in week_polarity:
        week_polarity[week] = week_polarity[week]/weeks[week]

    return dict(sorted(week_polarity.items()))

    #prints out average polarity
    # print("Average Polarity: ")
    # for week in dict(sorted(week_polarity.items())):
    #     print("Week {}: {}".format(week, round(week_polarity[week], 2)))

# average subjectivity of posts in a given week
def get_average_subjectivity():
    # query database for weeks and subjectivity score
    c.execute("SELECT Week_No, Subjectivity_Score FROM FLAIR")
    items = c.fetchall()

    week_subjectivity = {}

    # gets "total subjectivity" from posts in a week
    for item in items:
        if item[0] not in week_subjectivity.keys():
            week_subjectivity[item[0]] = 0
        week_subjectivity[item[0]] += item[1]

    weeks = get_post_frequency()

    # determines the average subjectivity of posts in a week
    for week in week_subjectivity:
        week_subjectivity[week] = week_subjectivity[week]/weeks[week]

    return dict(sorted(week_subjectivity.items()))

    # prints out average subjectivity
    print("Average Subjectivity: ")
    for week in dict(sorted(week_subjectivity.items())):
        print("Week {}: {}".format(week, round(week_subjectivity[week], 2)))

# gathers data, plots, and saves graphs to specified directory
def graph_data():

    # connect to database (in data.db)
    conn = sqlite3.connect('data.db')
    # create cursor
    c = conn.cursor()

    post_freq = get_post_frequency()
    avg_polarity = get_average_polarity()
    avg_subjectivity = get_average_subjectivity()

    week_no = []
    num_posts = []
    polarity_scores = []
    subjectivity_scores = []

    for week in post_freq.keys():
        week_no.append(week)
        num_posts.append(post_freq[week])

    for week in avg_polarity.keys():
        polarity_scores.append(round(avg_polarity[week], 3))

    for week in avg_subjectivity.keys():
        subjectivity_scores.append(round(avg_subjectivity[week], 3))
    
    # print(week_no)
    # print(num_posts)
    # print(polarity_scores)

    # plot and save graph of average weekly polarity scores
    plt.plot(week_no, polarity_scores, '-')
    plt.title("Average Post Polarity per Week")
    plt.xlabel("Average Polarity")
    plt.ylabel("Week Number")
    plt.savefig('static/images/avg_weekly_polarity.png', bbox_inches='tight')

    # clear current plot
    plt.clf()

    # plot and save graph of weekly post frequency
    plt.plot(week_no, num_posts, '-')
    plt.title("Post Frequency per Week")
    plt.xlabel("Number of Posts")
    plt.ylabel("Week Number")
    plt.savefig('static/images/post_frequency.png', bbox_inches='tight')

    # clear current plot
    plt.clf()

    # plot and save graph of weekly average subjectivity
    plt.plot(week_no, subjectivity_scores, '-')
    plt.title("Average Post Subjectivity per Week")
    plt.xlabel("Average Subjectivity")
    plt.ylabel("Week Number")
    plt.savefig('static/images/avg_weekly_subjectivity.png', bbox_inches='tight')

    # close connection
    conn.close()