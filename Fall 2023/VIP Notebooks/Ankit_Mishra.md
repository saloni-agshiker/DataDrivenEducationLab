
# Notebook for Fall 2023

- Link to code to dashboard - https://github.gatech.edu/C21U/vip-nlp/tree/master/Dashboard/src/pages
- Link to entire react app - https://github.gatech.edu/C21U/vip-nlp/tree/master/Dashboard

# Week 1: Sept 6
### Works done
- Introduced everyone in our sub-team.
- We divided parts for the Journal Club presentation. I got question 2 which was to provide strength and weakness of the paper.
### Goals for next week
- Prepare my slide for the Journal Club presentation.

# Week 2: Sept 13
### Works done
- Completed my slides for Journal Club presentation, but I couldnot be there for presentation due to time conflict.
- During subteam meeting, we discussed about creating dashboard for a new course. The source for this would be canvas data. Similarly, the plan for this semester is to create new machine learnind models. Therefore, we webdev team had to come up with new ui sections to present data for the new course.
### Goals for next week
- Brainstorm ideas on what to do for new UI metrics.

# Week 3: Sept 20
### Works done
- Discussed about how we should implement adding a new course to dashboard. If we use our current approach to creating drop-down menu to view different courses, users will get access to all course information. There are two solutions to this:
    * Create a login process and and provide access to dashboard courses to only the course instructors.
    * Create different dashboards for each course separtely.
- Divided work for the subteam presentation. I am working on webdev current progress and webdev future goals.
### Self-reflection
- I found some helpful resources to update the dashboard to allow users access to only selected courses.
- Helpful Resource - https://www.youtube.com/watch?v=T2MhVxJxsL0&ab_channel=BrianDesign
### Goals for next week
- Prepare slides for subteam presentation which include web-dev team current progress and goals for the semester.

# Week 4: Sept 27
### Works done
- Prepared the slides related to web-dev. As a time-conflict student, I missed this presentation.
- Looked into adding password protection to dashboard to limit access to certain authorized viewers.

### Self-Reflection
- There are a lot of challenges for the login procedure because we will need to communicate with Georgia Tech to allow for website to use gerogia tech sign-in credentials for the dashboard to allow only course professor's to log-in to dashboard.
- It would be easier to make different dashboard for each course and share it with the related professor.

### Goals for next week
- Research piazza API to find useful metrics.

# Week 5: Oct 4
### Works done
- Met with Kaylia Mia to look at Piazza API and think of some possible metrics that would be helpful.
- Talked with Karthik to discuss how the web-dev team should progress this semester.

### Self-Reflection
- For piazza API, we could include a list of unanswered piazza post to remind instructors about posts that need to answered, we can provide the average response time to allow instructors to see how long it takes for students to get their questions answered.
- I am still unsure what the webdev team is supposed to do. Most data presented in dashboard should be coming from machine learing team's model but I dont know what model they plan to work on and what information can be gathered from those models.

### Goals for next week
- Talk to machine learning team to get more insight on how the dashboard should look like.

# Week 6: Oct 11
### Works done
- Researched ways to automate the process of uploading data into dashboard. This means that when data science team creates a more updated data for graphs and tables, we want our dashboard to automatically upload those graphs and tables with new data.
   * Two best options for python - FastAPI and Flask
   * Helpful links
      1. https://auth0.com/blog/developing-restful-apis-with-python-and-flask/
      2. https://flask.palletsprojects.com/en/3.0.x/
      3. https://www.youtube.com/watch?v=0zb2kohYZIM&ab_channel=EricRoby
### Self-Reflection
- The dashboard frontend does not need to be changed for now as the ML and data science team are working on improving the models for the same metrics as last semester.
- So, we will focus on backend and try to enhance it.
### Goals for next week
- Decide between Flask and FastAPI, and start working on it.

# Week 7: Oct 17
### Works done
- Started playing around with FastAPI.
- Created APIs with sample data and connected to the API from the react app to get those data and update graph.
### Self-Reflection
- I chose FastAPI because it is used more in production in real world because it is fast and easy to organize. 
- FastAPI is easy to use.
### Goals for next week
- Create slides for second sub-team presentation.
- Play with FastAPI a bit more.

# Week 8: Oct 25
### Works done
- Created slides for the presentation and presented it during class.
- Tested a feature in react app that will call the API every few minutes. With this, we can upload backend changes to the API from python and this will be updated when react app calls the API.
### Self-Reflection
- I cannot integrate this feature in our dashboard yet because ML team and Data Science team are still in research phase. The API can only be tested when they create final results.
- We may have to delegate this work to next semester members depending on when the ML team and Data Science are able to produce their results.
### Goals for next week
- Talk to Rohan about what the Web Dev team can do going forward.

# Week 9: Nov 1
### Works done
- Discussed with Rohan about the possible next steps for Web-Dev and we decided to conduct a TA interview to demo our dashboard and get feedback.
### Self-Reflection
- We will be waiting for the professors to find us a TA to interview.
### Goals for next week
- Schedule interview with TA.

# Week 10: Nov 8
### Works done
- Emailed and scheduled an interview with a TA in CS 6601 AI course to demo our web-app.
- Met with Kaylia to create questions for the interview and verified it with rest of the team.
### Mock interview Questions
- How useful would the resources provided by this tool be for adjusting your teaching methods and helping students?
- How well would this tool help you to understand the current progress and understanding of students?
- What are some tools that you think may be useful additions?
### Self-Reflection
- For the interview, our main agenda will be to finalize aspects that work in our dashboard and get ideas to replace aspects that are not helpful for the TA.
### Goals for next week
- Interview with TA and create details notes about the results of the interview.
- Present interview results to the team.

# Week 11: Nov 15
### Works done
- Conducted interview with a TA regarding the usability and practical use of our dashboard.
### Interview Results
- What works
   * Topic page showing sentiment regarding different aspect of course helpful
   * Average response time of instructors and student satisfaction of replies are helpful metrics.
- Suggestions
   * Average response time and response posts of all TAs could be shown separately.
   * Notification for unanswered posts after set timeout
   * Option to remove post without resolution (manual exclusion from data)
   * Unresolved posts should be prioritized based on importance
- Needs improvement
   * info in student section is interesting but unclear how to act on it
   * metric showing what does downturn of engagement indicate could help.
### Goals for next week
- Incorporate TA changes to dashboard
- Add the data produced by ML and data science team into the dashboard.

# Week 12: Nov 22
### Works done
- Presented interview results to the team.
- Added 3 new data created by ML and data science team to the dashboard. The new graphs are the Average Response Time graph, Frequency of questions vs statements graph, and number of posts per month graph.
### Self-Reflection
- It was not possible to incorporate most of the changes requested in the interview.
   * Firstly, we have data from 2020. We need access to real time data to create the unresolved posts table. Also, we cannot assign TAs to posts because of the same issue.
   * For other changes, ML team will need more time to create those models so it will be added in next semesters.
### Goals for next week
- Create sub-team presentation.
- Complete peer evaluations.

# Week 13: Nov 29
### Works done
- Created slides for the final presentation. I did the current progress and next semester goals for web dev team.
- Complete peer evaluations
### Goals for next week
- Complete VIP notebooks
- Push all code changes to the github and update documentation.
