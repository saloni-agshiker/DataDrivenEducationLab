Xinran Yu xyu342@gatech.edu
Data-Driven Education VIP | Discussion Forum Subteam | Data Scientist
Subteam Members: Lindsey Blackmore, Morgan Powers, Yuntian Zhang, Erin Wrobel

# 01/15/2020
* Shawn assigned us to subteams. We met our team members during class.
* With the help from Dr. Lee and Emily, our team discussed our roles and subteam meeting times, went over achievements of previous semesters, and brainstormed potential goals for this semester.

# 01/22/2020
* Shawn presented all the technologies we have can utilize, including GitHub, Docker, databases, and Jupyter Notebook. We set up our environment.

# 01/24/2020
* 1st subteam meeting in Klaus 1443 from 3pm to 4pm.
* We decided that this semester we will focus on the built-in discussion forum on Canvas instead of Piazza due to FERPA reasons. Shawn added us to a sandbox course in which we are all instructors and showed us how to get the Canvas key through our personal account.
* We also determined that not many classes use the built-in discussion forum, so we don't have many existing data. We decided that we should familiarize ourselves with this discussion forum and generate some fake posts in the sandbox course.
* We brainstormed some potential analysis that might be useful to the instructors. For instance, we want to know how students interact with each other and if the posts are of positive sentiments.
* Shawn also provided us with a Python script that scrapes the discussion content from Canvas.
## To-do
* Play around with the Python script and make sure I actually have access to the Canvas API.
* Get familiar with the Canvas dicussion forum. Look into its capabilities and features.
* Generate fake posts in the sandbox class.
* Ask people if they have classes that use the discussion forum.

# 01/29/2020
* Shawn made a presentation on project management.
* We split into subteams and discussed about the upcoming presentation.
## To-do
* Transfer Shawn's script to Jupyter Notebook.
* Play around with the canvasapi module.

# 01/31/2020
* Wrote a Python script that uses the canvasapi module to get the existing posts generate new posts (uploaded to Github under folder vip-nlp/src/canvas/ named "canvas_discussion_get_and_post.py")
* 2nd subteam meeting in Klaus 1443 from 3pm to 4pm
* We discussed about and analyzed other existing products that are related to our projects.
* We brainstormed the structure of the web app (how front end and backend will look like).
* We briefly talked about the presentation next week.
## To-do
* Review accomplishments from last semester and work on the upcoming presentation

# 02/05/2020
* 1st subteam presentation in class
* Each team talked about their accomplishments from last semester and their goals for this semester

# 02/07/2020
* 3rd subteam meeting in Klaus 1443 from 3pm to 4pm.
* Determined that we will have 2 sub-subteams this semester: web-app team and data science team
* Met with Jonna and Yuntian and discussed the possibility of assessing students' coginitive presence using the same Piazza data from last semester. We want to assign each post and each comment a coding scheme. We decided that we need to transform the data from JSON format to CSV format for ease of use.
* Played around with the Piazza data in JSON format and tried to transform the JSON file to a CSV file using Python. I managed to make a CSV file with the following 4 columns: title of the question, question content, tags (categorization), and number of unique views. However, I did not manage to extract the comments of a thread due to the nested nature of the JSON file. The code was uploaded to Github under folder vip-nlp/src/piazza_scrape named "piazza_to_csv.py".

# 02/12/2020
* Vistors from Department of Education gave a presentation on Educational Data Privacy

# 02/14/2020
* 4th subteam meeting in Klaus 1443 from 3pm to 4pm.
* Morgan and Lindsey presented the mockup for the web
* Talked about how the discussion might be useful to a class
* Determined that it is safe to use OneDrive to share discussion data

# 02/19/2020
* Jonna gave a presentation on the educational research projects she has been involved in.
* Finished midterm peer-evaluation

# 02/21/2020
* Received sample discussion data from edX from Jonna and applied the coding scheme to the each post and comment
* 4th subteam meeting in Klaus 2405 from 3pm to 4pm.
* Talked about trello boards for the subteam and our specific tasks for this semester
* Met with Yuntian and Jonna after the subteam meeting. We discussed our coding results and reached an agreement on the meaning of each coding scheme
* Received the complete Forum Ferpa table from Jonna
## To-do
* Summarize the Ferpa table and do some simple visualizations about the distribution of the data, such as how many posts do we have for each course and how many comments do we have for each post on average
* Revist the second part of the sample edX data and reapply the coding scheme

# 02/26/2020
* In class, we had a journal club session led by Dr. Soleimani
* Completed midterm peer evaluation

# 03/04/2020
* Worked on the 2nd presentation in class

# 03/11/2020
* 2nd subteam presentation in class

# 03/15/2020 - 03/21/2020 Spring Break
* The data science team worked on coding additional 1301 online comments independently.
* The independently coded comments can be found in folder "NLP Subteam"/"Independent Coding".
* We put the comments we are not sure fo in the excel file "Coding Q&A" and let others give suggestions.
* I coded 150 comments from 1301 online sections.
* Currently, we have around 450 coded comments available for training and testing.

# 04/03/2020
* Did basic analysis on the coded data; uploaded the jupyter notebook, named coded_data_analysis.ipynb to OneDrive, under folder C21U Reasearch Activities/VIP Team Projects/NLP Subteam/CS1301 Data NLP Analysis

# 04/15/2020
* In-class final presentation
