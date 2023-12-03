# WEEK 1:
  - First VIP meeting
  - Discussed previous work and findings
  - Chose what subteam and role we would be interested in 
  - IRB training certification: 
    https://www.citiprogram.org/verify/?w83b2454e-d8b3-45db-b54d-b202d84fe802-57950125

  My Role in Discussion Forums Team: 
  - find useful models to extract what we are looking for in the data
  - clean data and make it usable for machine learning subteam


# WEEK 2:
  - Met other members of the subteam and found a meeting time outside of class (Friday 11:30AM)
  - Responsibilities of my role (Data-Scientist)

  My Role: 
  - find useful models to extract what we are looking for in the data
  - clean data and make it usable for machine learning subteam
  
  Before next meeting:
    Data Science- request data
    1. create the scope of our research
    2. review the research material given


# WEEK 3:
    - filled out data request survey
    - we wanted Piazza data, so we requested Canvas data
    - Assigned reading: theory paper for journal club presentation
    - start thinking about what models we want to use to extract data
    
  
# WEEK 4:
    - Journal Club presentations
    https://docs.google.com/presentation/d/11K1Bnv5VEpBn9w_1DQf2Cpq6SEvW-4XxyxQU3J2WU20/edit#slide=id.p
    
    - Responsibilites of each sub team 
    https://docs.google.com/document/d/1wMVlhaKbIb2wBjWkTOe2c9fEgoy5UEyjYwyEOXLb6OY/edit
    
# WEEK 5:
    - in class: MOOC & Learning Analytics Research 
    - given NLP Resources for following week presentation:
        1. https://huggingface.co/learn/nlp-course/chapter1/3?fw=pt
        2. https://github.com/nlp-with-transformers/notebooks
        3. https://medium.com/nlplanet/awesome-nlp-18-high-quality-resources-for-studying-nlp-1b4f7fd87322
        
  
# WEEK 6:
  - data received: https://gtvault.sharepoint.com/:b:/s/DiscussionForumsSub-Team/EXhVSRb3WGpJldcR11LaBXcBbgbZtjav3YFLKKgCj-gsbg?e=a6iAcT
  - sub team presentations 1: https://docs.google.com/presentation/d/1LuSllxa17pIwapNtdVo1pfUNGrUGP4RzxKDomLwsASs/edit#slide=id.g28289c18069_0_97

# WEEK 7:
  TO DO: peer evaluation & notebook assessment
  - in class lecture: Digital Learning Data Analysis & Visualization Practices
  - Meeting with outside source to learn SQL and machine learning techniques
  - downloaded PostgreSQL to clean up data
  
  TO DO: 
    - Clean duplicate rows in data & make usable for machine learning team.
    - Find useful data in the database
    
    
# WEEK 8:
  Attempted to clean the rows of the data file on Postgre SQL; encountered a problem.
  
  Code: 
  select * from piazza.cs6601_np_anonymized where not folders is null;
  select * from piazza.cs6601_np_anonymized where not submission_html_removed is null;
  select * from piazza.cs6601_np_anonymized where not submission_html_removed is null;
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '_';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '__';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '___';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '___';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '____';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '_____';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '_____';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '______';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '_______';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '________';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '_________';
  select * from piazza.cs6601_np_anonymized where not submission_html_removed like '__________';

  I began with this in order to visualize each command and what would be deleted if the command was run.
  After this, I began to change the "SELECT" statements into "DELETE" statements, and there was an error.
  I could not make changes to the file since I am not the owner. 
  
  The best idea was to use python and pandas. 
  
  
# WEEK 9 (WORK WEEK):

  After last week's problem, I read through some other documentation, saying Mac users should actually download Postico instead of Postgre.
  I attempted this and still ran into the same issue. 
  I am reading documentation from past classes in order to reinstall python libraries and editors. This way I can
  read the file using python and manipulate the file using pandas. 
  However, I am not fully sure on how to import a file on python given credentials instead of a file name downloaded in a directory on my computer. 
  I have contacted the instructors of the course via ClassZoom and email. 
  
----------------------------------------------------------2ND NOTEBOOK ASSESSMENT---------------------------------------------------------------------------

  
# WEEK 10
  
  This week we presented our second presentation. 
  https://docs.google.com/presentation/d/1Qb2M6N07jszJaICKEcWr2kdgqmGdj1Uw/edit?usp=sharing&ouid=102705935548115878182&rtpof=true&sd=true
 
  Summary of presentation: 
  Accomplished: 
  - Learn necessary SQL queries needed to alter dataset 
  - Accessed data and cleaned unnecessary rows
  Next Goals:
  - Import data into notebook
  - Start converting the data into metrics from the dashboard and start vizualizations
  - Review pandas and python 


  Cleaned about 6000 rows of data from a data set of 13,000 rows.
  
  Challenges:
  - being able to use the knowledge we have to access our data 
      - did not have CSV file so we could not access the data directly
  - want to download the file from sql and use jupyter notebooks to work with the file with pandas and python


  Team Meeting (NOV 3): 
  Deliverables: find useful metrics for web development team 
  
  
# WEEK 11
  In-Class:
  We were given a lecture by Mr. Freeman & Mr. Yang on Canvas SDK & Web App Development Practices.
  
  Work on Project:
  - Read many python and pandas documentation in order to connect MySQL to the host and create queries with python.
      - import pyMySQL

  Challenges:
  - still running into error of accessing document directly
  - asked Rohan (Project Manager) what some next steps could be 
    - solution: he ran the query (below) that we used to clean the data on the raw CSV file and downloaded that and sent 
      to the team in order to make data accessing easier 

SELECT * FROM piazza.cs6601_np_anonymized WHERE 
folders IS NOT NULL AND subject IS NOT null AND 
submission_html_removed IS NOT null AND 
(folders = 'announcement' OR folders like 'a%') AND 
LENGTH(submission_html_removed) > 60 AND 
submission_html_removed != ' ' AND subject != ‘Student Introductions’ AND subject not like ‘Slack channels%’;

Team Meeting:
- Discussed what metrics the data science team has thought of for the web development team
  - number of student posts vs number of teacher posts
  - average response rate between student and instructor
  - how many posts the instructor has endorsed 
- Discussed next steps
  - coding the metrics 
  - creating visual representations for the metrics


# WEEK 12
In-Class: No Lecture. Work Day!

Work for Project: 
This week I decided to just look through the data and some handouts* to find the best possible way to create useful metrics. 
I believe there will be a significant amount of lost data after coding. The data is not organized in a useful way. ALL students 
and teacher posts are grouped together and most have no identification of which group they belong to. There is a colum in the
CSV file labled 'part_of_post' that describes the kind of post being made (question, followup, answer, etc.). 

I decided that the "followup" posts can be from either student or instructor. I decided this after studying the data set. 
Other labeled posts had an "_s" or an "_i."

After studying the comments relative to each post, I decided that these labels meant they were by students or by instructors. 

*Used handouts to review Pandas. 

Meeting:
Meeting was cancelled and no deliverables were required this week. 
Everyone was just working on what they were previously working on and making progress. 


# WEEK 13
In-Class: Lecture by Dr. Harmon on "Future Directions for Data-Driven Education"

Work for Project:
Began coding the metrics. I am not sure how to upload the code file, so I am pasting the code below. 

// BEGINNING OF CODE

  import pandas as pd
  from google.colab import files
  uploaded = files.upload()

  import pandas as pd
  from datetime import datetime, timedelta
  import json

  from google.colab import drive
  drive.mount("/content/drive")

  df = pd.read_csv("drive/My Drive/cs6601_np_anonymized.csv")
  df["Created At"] = pd.to_datetime(df["created_at"])
  df["Month"] = df["Created At"].dt.strftime('%Y-%m')
  df["Week"] = df["Created At"].dt.strftime('%Y-%U')
  df["Year"] = df["Created At"].dt.strftime('%Y')
  df["Month1"] = df["Created At"].dt.strftime('-%m')
  totalTimeDifference = timedelta(0)
  count = 0

  groupByPostMonthWeek = df.groupby(["post_number", "Month", "Week"])
  weeklyData = []
  index = 0

  for (name, month, week), group in groupByPostMonthWeek:
    student_index = group[(group["part_of_post"] == "started_off_question")].index
    if len(student_index) == 0:
      continue
    student_index = student_index[0]


    ta_index = group[(group["part_of_post"] == "reply_to_followup")].index
    if len(ta_index) == 0:
      continue
    ta_index = ta_index[0]

    time_diff = group.loc[ta_index, "Created At"] - group.loc[student_index,
                                                              "Created At"]

    if time_diff < timedelta(0):
      continue

    totalTimeDifference += time_diff
    count += 1

    if ta_index == group.index[-1]:
      index += 1
      String = "Week " + str(index)
      average_time_diff = totalTimeDifference / count
      average_time_diff_hours = int(average_time_diff.total_seconds()/3600)
      print(f"The average time difference for week {week} in {month} is")+
      print(f"{average_time_diff_hours} hours.")
      mydict = {}
      mydict["Week"] = String
      mydict["Time"] = average_time_diff_hours
      weeklyData.append(mydict)

  data_dict = {"Average Response Time per Week": weeklyData}

  jsonWrite = json.dumps(data_dict)

  with open("weekly_data.json", "w") as file:
    file.write(jsonWrite)

    files.download('weekly_data.json')

  df = pd.read_csv("drive/My Drive/cs6601_np_anonymized.csv")
  filtered_data = df[df['part_of_post'] == 'started_of_question']

  '''counting STUDENT posts'''
  count_started_off_question = df[df['part_of_post'].str.contains('started_off_question')]['part_of_post'].count()
  count_updated_note = df[df['part_of_post'].str.contains('updated_note')]['part_of_post'].count()
  count_updated_question = df[df['part_of_post'].str.contains('updated_question')]['part_of_post'].count()
  count_answer_s = df[df['part_of_post'].str.contains('started_off_s_answer')]['part_of_post'].count()
  count3 = df[df['part_of_post'].str.contains('updated_s_answer')]['part_of_post'].count()
  total_student_posts = count_updated_note + count_started_off_question + count_updated_question + count_answer_s + count3
  print(f"The total number of posts by students: {total_student_posts}")

  '''counting TA posts'''
  count_replyToFollowUp = df[df['part_of_post'].str.contains('reply_to_followup')]['part_of_post'].count()
  count_answer_i = df[df['part_of_post'].str.contains('started_off_i_answer')]['part_of_post'].count()
  count4 = df[df['part_of_post'].str.contains('updated_i_answer')]['part_of_post'].count()
  total_TA = count_replyToFollowUp + count_answer_i + count4
  print(f"The total number of posts by TAs: {total_TA}")

  '''undetermined'''
  followup = df[df['part_of_post'].str.contains('followup')]['part_of_post'].count()
  print(f"Count of followup posts = {followup}. It is undetermined whether students or instructors made these posts.")

  df = pd.read_csv("drive/My Drive/cs6601_np_anonymized.csv")
  filtered_data = df[df['endorsed_by_instructor'] == "TRUE"]
  count_true_values = df['endorsed_by_instructor'].astype(str).str.lower().eq('true').sum()
  print(f"Number of posts endorsed by instructor: {count_true_values}")

  with open("weekly_data.json", "r") as file:
    data_dict = json.load(file)

  jsonWrite = json.dumps(data_dict, indent = 2)
  print(jsonWrite)

  df = pd.read_csv("drive/My Drive/cs6601_np_anonymized.csv")
  df["created_at"] = pd.to_datetime(df["created_at"])
  df["Month"] = df["created_at"].dt.strftime('%Y-%m')
  df["Week"] = df["created_at"].dt.strftime('%Y-%U')
  df["Year"] = df["created_at"].dt.strftime('%Y')
  df["Month1"] = df["created_at"].dt.strftime('%m')

  dfNoDuplicates = df.drop_duplicates(subset = ['post_number'])
  postsMonth = dfNoDuplicates.groupby(created_at.dt.to_period('M'))
  for month, posts in postsMonth:
    for post in posts['post_number']:
      '''print(f"Post #{post} was created in {month}")'''

  posts_per_month = df.groupby(['Month']).size().reset_index(name='post_count')

  print(posts_per_month)

  json_data = posts_per_month.to_dict(orient = 'records')
  jsonWrite = json.dumps(json_data)

  with open("postsPerMonth.json", "w") as file:
    file.write(jsonWrite, indent = 2)
    files.download("postsPerMonth.json")

// END OF CODE


* Working on this code was split between **WEEK 13** and **WEEK 14**
* Attaching pictures and challenges to **WEEK 14**


Work Day Deliverables for the Subteam:
"DS team - complete the list of json files needed for dashboard"

Turn useful code into JSON files.

In-Class Meeting:
I was not able to attend due to traveling. No additional deliverables on top of what was given on the work day were given.

# WEEK 14 

// finds average response rate between teacher and student
<img width="397" alt="Screenshot 2023-12-03 at 4 00 51 PM" src="https://github.gatech.edu/storage/user/73536/files/d0975e1b-6eb3-4de4-880a-bf0bbe377255">

// counts posts made by students and posts made by teachers
// also calculates the the followup posts 
<img width="566" alt="Screenshot 2023-12-03 at 4 07 46 PM" src="https://github.gatech.edu/storage/user/73536/files/9e8ab200-9fbc-4899-8258-3f2dbb38b5bc">

// creates JSON file with average response rate per week
<img width="221" alt="Screenshot 2023-12-03 at 4 08 38 PM" src="https://github.gatech.edu/storage/user/73536/files/897618a8-cb34-4b1f-84d1-cc515b7e3607">

// calculates posts per month
<img width="334" alt="Screenshot 2023-12-03 at 4 09 25 PM" src="https://github.gatech.edu/storage/user/73536/files/0461f875-738c-4de7-8adb-6b1f2fb13465">


Some challenges associated with coding:


# WEEK 15

In-Class:

Peer Evals:

Sub-Team Presentation 3:

