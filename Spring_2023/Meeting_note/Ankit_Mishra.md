
# Notebook for Spring 2023

Link to code to dashboard - https://github.gatech.edu/C21U/vip-nlp/tree/master/Dashboard/src/pages
Link to entire react app - https://github.gatech.edu/C21U/vip-nlp/tree/master/Dashboard

# Week 1: 01/25/2023
### Works done
- Introduced everyone in our sub-team and as a returning member, I talked about past work of web-dev team.
- We divided parts for the Journal Club presentation. I got question 3 which was to suggest further work to validate the paper.
### Goals for next week
- Onboard Youngwook into the web-dev team.
- Prepare my slide for the Journal Club presentation.
# Week 2: 02/01/2023
### Works done
- Completed my slides for Journal Club presentation, but I couldnot be there for presentation due to time conflict.
- During subteam meeting, we discussed about creating dashboard for two different courses this semester and discussed some of the approaches to it. Like:
  1. Creating two different dashboards. (easy way)
  2. Creating a drop-down menu that allows user to choose a course and the dashboard shows information for that course. (hard way)
### Goals for next week
- Onboard Youngwook by providing him materials from last semester and walking him through it.
# Week 3: 02/08/2023
### Works done
- Updated dashboard to now allow users to see information about 2 courses.
- Met with Youngwook and explained him the past work in web-dev team by going through documentation, the dashboard and the code for the dashboard.
- Provided Youngwook youtube link to learn react and also explained a bit of the dashboard code to get him started.
- The subteam meeting was headed by Jisan today. I was asked to get started on the presentation for web-dev slides. I was also assigned to meet with Madeline about conducting interviews.
### Self-reflection
- I found some helpful resources to update the dashboard to allow users to look up information on 2 different courses. I created a drop-down bar on each page of the dashboard and the user can select the course in the drop down menu which will take them to required course.
- Helpful Resource - https://www.youtube.com/watch?v=T2MhVxJxsL0&ab_channel=BrianDesign
- I think I was able to help Youngwook be familiar with the code base as well.
### Goals for next week
- Prepare slides for subteam presentation which include web-dev team current progress and goals for the semester.
- Meet the team 20 minutes before class to practice for the presentation.
- Ask Madeline about the surveys/ interviews.
# Week 4: 02/15/2023
### Works done
- Prepared the slides related to web-dev and presented it during class. The presentation went well.
- Answered Youngwook's question about the code. He is now able to run the dashboard and make changes to it so we can start progressing on the dashboard.
- During sub-team meeting, Madeline assigned web-dev team to interview professors to gather more user requirements to modify some of the information we display in dashboard. If possible, include metric related to social and teaching presence.
### Self-Reflection
- I and Youngwook had a meeting with Madeline about the data in our dashboard. From my perspective, it seemed that most of the tables and graphs in our dashboard is simply from Piazza API. We are only using very little of the results produced from ABSA and topic-modeling done by Data Science team. So, we decided to conduct further interviews with professor/ TA to get their perspective on substituting information in current dashboard with data science team related content. This could help the dashboard in highlighting the cognitive, social and teaching presence in online community even better.
### Goals for next week
- Send emails to professors in large online classes that use discussion boards to schedule interviews.
- Interview professors if they are available.
# Week 5: 02/22/2023
### Works done
- Send out emails to professors looking for interviews but have not heard back from them. 
- Changed the dashboard to create a different ways to allow for multiple course-work. Instead of creating a dropdown menu that allowed switching between different courses, we added an option to select course in homepage. To change to another course, we now have to return to homepage and select another course.
- We web-dev team talked to Dr. Lee about progress and plans.
- Submitted peer evaluations and notebook.
### Self - Reflection
- I personally worked on changing the dashboard. I removed the original way of accessing multiple courses through drop-down menu because that would allow every professor to look at every other course information. But in the new way, we need to select a course at homepage and are only allowed to go to different course by navigating back to the home page. This will allow us to set password restrictions in the future on homepage so that only authorized users can select particular course.
### Goals for next week
- Send emails to TAs recommended by Madeline for interviews as a backup for the professors
- Making the dashboard reactive to fit different screen sizes.
# Week 6: 03/01/2023
### Works done
- Dashboard has been made reactive for the graphs and table to adjust to screen size changes.
- Sent interview emails to TAs because the professors have not responded for more than a week now.
- The Data Science team is working on increasing the accuracy of the current models.
### Self - Relection
- This week I worked on making the dashboard reactive. For example, if you reduce the size of the tabs, the graphs and tables will decrease in size to accomodate the change in screen size. Similarly, if screen width is decreased, the graphs will align one on top of the other instead of being aligned side by side and so on. 
- The problem however is that the heading text for the containers are not reactive yet. I tried out few approaches like setting font-size of be a certain percentage of the screen but that did not work. I need to look a bit into this. 
- However, the current priority is to get the dashboard updated with real time data and to interview TAs/ professors to get feedback on our current dashboard.
### Goals for next week
- Prepare questions for interviews.
- Look at the future steps for web-dev team and brainstorm ways to make dashboard ourselves in case we cannot interview any TAs.
# Week 7: 03/08/2023
### Works done 
- We had a change in our team project manager. Jisan will now head the team.
- Had an individual meeting with Jisan regarding the dashboard front-end progress and future task.
- Divided slides for the second sub-team presentation.
### Self - Reflection
- I had a meeting with Jisan regarding the dashboard. We have a problem that we cannot get real-time access to the piazza api due to which we can not make the teacher's page of our dashboard update in real time. We decided to ask about this if we get a chance to interview a TA and to get feedback on alternative data that we could display in our dashboard. Similarly, the dashboard has all other functionalities completed except for adding the real-data into it and I informed Jisan about the data I need from the Data Science team to update those information into the dashboard.
### Goals for next week
- Prepare the slides for the subteam presentation.
- Provide Jisan a list of the data that I will require for the dashboard.
# Week 8: 03/15/2023
### Works done
- Completed the sub-team meeting. I could not take part in the subteam meeting due to time conflict. However, I made the slides for the web-dev team for the presentation. I also met with Youngwook and described him the slides and how to present them.
- I provided Jisan with the data that will be required for the dashboard. He updated the Data Science Team regarding that.
- We created a subteam goal chart to create a timeline for the rest of the semester.
### Self - Reflection
- Worked on the sub-team presentation slides and explained it to Youngwook.
- Finally got back from one of the TAs agreeing to interview. The interview is scheduled in 2 weeks.
- Create interview questions and posted them in teams channel. Got feedback from team members and made required additions.
### Goals for Next Week
- Interview with the TA and present finding to team members.
# Week 9: 03/22/2023
### ------------------------------------------------------------------------
### SPRING BREAK
### ------------------------------------------------------------------------
# Week 10: 03/29/2023
### Works done
- Interviewed with the TA to get feedback on dashboard.
- Divided the work among Data Science Team to deliver required data for the dashboard.
### Self - Reflection
- I interviewed with a TA and asked about what worked in the dashboard and what would she want to see in the dashboard that would actually help her. I got great feedbacks from her.
#### Helpful feedbacks from interviews.
- Top contributor is not needed because it does not help instructors. Instead, it would help to have a class sentiment over time graph that complements the posts over time graph so that instructors can know if the increase or decrease of posts is due to positive or negative reasons.
- For the unresolved post, it would be better if we have a link to the particular post in the table so that TAs can directly go to that post from the dashboard. Also, it would help to have the option to reserve a post so that others know that this post is being answered by someone else.
- It would be helpful to know reasons regarding the sentiment. For example, we show percentages of positive, neutral, and negative sentiment for tests. Is it possible to know what actually are the reasons behind those sentiments? So, if there is 60% negative sentiment on tests, can we show if the reason behind this if due to high frequency of tests, the difficulty of tests, time constraints for tests, etc.
### Goals for Next Week
- Meet with the team and discuss if we could incorporate any changes suggested by the TA.
- Make required changes to the dashboard.
# Week 10: 04/05/2023
### Works done
- Presented the interview findings to the subteam.
- Incoporated required changes into the dashboard.
- I got data from Data Science team for sentiment analysis and I added the data to Topics page.
### Self - Reflection
- As per the TA suggestions, I removed top contributor table from dashoard and added the sentiment over time graph. We could not make other changes requested because we have no models that can produce those data at this moment.
- I added the data I got from Data Science team to the dashboard and now the topic page is updated with real data.
### Goals for Next Week
- Get other json files with real data from Data Science team and add that to the dashboard.
# Week 10: 04/12/2023
### Works done
- Data Science team managed to produce data required for the student page of the dashboard as well.
- I added those data to the dashboard. Our dashboard now has real data for student and topics page for both the courses.
### Self - Reflection
- I added the json file given to me by the Data Science team to the dashboard. We have student page and topics page working on real data. However, we could not update the teachers page because the data we have is from a piazza api of 2020 semester. We dont have real time access to this api and the teachers page requires real time data like current unresolved posts.
- Aside from teachers page, the dashboard prototype is done for now.
### Goals for Next Week
- Prepare slides for the presentation.
- Add the code to github for the dashboard.
- Complete notebook and peer evaluations.
# Week 10: 04/19/2023
### Works done
- Completed the final presentation. I created a recording for my part due to a time conflict.
- Added newest dashboard code to github.
- Completed peer evaluations and notebook.

### ------------------------------------------------------------------------
### END OF SEMESTER.
### ------------------------------------------------------------------------






