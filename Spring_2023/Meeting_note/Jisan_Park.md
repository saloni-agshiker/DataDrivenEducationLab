# VIP Spr23 Data Driven Edu

# 1/27 1st Meeting

**Agenda**

1. prep Journal club presentaion, divide parts 

After meeting,

The article’s strenth and weakness - my question

This article proposes an extension to the existing Community of Inquiry Framework. The authors suggest that considering trusting, mean-making and deepening understanding may help to resolve some challenges of online learning and support learner’s progress. This article is providing a theoretical guide for tutors and learners to boost an educational progress. However, the authors didn’t mention any formal data, and they introduced experiences as a logical reason. I think the empirical evidence makes it difficult to generalize their claims. So, it would be better to describe scaled numerical data.

# 2/3 2nd Meeting

**Agenda**

1. What can be the new factor in our research? How we help instructors with dashboard? Do we enhance the prev models? What can be new research model? 
2. Web-dev and Data Science team progress

**Update**

1. New Idea: ChatGPT, after it came up, a lot of students use it as a new AI search engine. It could make a chaos or the heaven depending on how we use it. Some students use it to do homework like copy and paste answer without comprehensive step. Can we detect and prevent it?
2. Topic modeling was not accurate because it is unsupervised. Therefore, I think we need to improve it. There are a few ways to increase it. First one is enhancing old one by developing pre-processing parts- unsure how much it can be increased. Second is to start with the supervised topic modeling. This model lets us to serve reference topics or seeded topic and words. This is more like Topic classification.

# 2/10 3rd Team Meeting

**Agenda** :

- 1st presentation is comming up
- New research appeared: Metacognitive visualization, New topic modeling: supervised or guided topic modeling
- Web-dev team progress, data science team progress

**Discussion and Updates**

1. Data-sets: Do the datasets that you need for the topic modeling also involve EdX and Piazza, Dr. Lee can expand your access to additional datasets. Is this something you think we should try to do?
Piazza data from ML class, edX data from CS1301
We should consider to make two dashboard for both courses. possible to make both
2. Here is Dr. Lee's previous message about the additional datasets: "I will be able to generate more recent discussion forums data from the same CS1301 course but there will be no coding for cognitive presence available. Another possibility is that we provide your sub-team metacognitive coding results (which is similar to cognitive coding) and you can do data visualization or incorporate this into the dashboard." The metacognitive coding results may be a good option for Rohan to work on because he is a younger CS student. Would you be able to bring this up to the subteam?
Rohan will ask the metacognitve result data to Dr.Lee 
3. Generate research questions -- potentially have part of the meeting in groups so that the Web-dev team and the Data Science team are working together to generate more research questions.
”Based on the community of inquiry framework, what are some useful metrics for student engagement and performance in an asynchronous online classroom? 
How can we design a web app that can provide actionable insights to the instructor?”
4. Check in on Youngwook's comfort level as the backend web-developer. If he needs any additional resources, Dr. Lee can connect him to previous backend web-developers. This is also a job that is typically done by two members.
5. Divide up the slides from the presentation so we are familiar with who will say which parts.
6. Plan on coming to class about 20 minutes early so we can practice our presentation.
7. A note for you, Harriet, and Ankit: would it be possible for you to get started on the parts of the presentation that are based on last year's progress? I think you are most familiar since you are returning members.
8. Ask Ankit and Youngwook if they would be interested in conducting interviews/survey with Madeline.

If possible, please complete presentation slides before monday 11pm.

# 2/17 4th Meeting

**Agenda**

1. Dividing and assigning works into each person in team
2. Make a timeline for each team to check the progress

**Update**

1. Data science team is working on 
    1. Guided Topic modeling 
        1. [https://maartengr.github.io/BERTopic/getting_started/guided/guided.html](https://maartengr.github.io/BERTopic/getting_started/guided/guided.html) - Harriet will try on this.
        2. [https://www.kaggle.com/code/nvpsani/topic-modelling-using-guided-lda](https://www.kaggle.com/code/nvpsani/topic-modelling-using-guided-lda) - Jisan will try on this.
        3. Emily will work on making potential seeded topic and words
    2. ABSA
        1. Increase Accuracy, but not priority
    3.  Metacognitive Presence - Visualization result data 
        1. Rohan is working on metacognitive research.
        2. maybe need some helps
2. Madeline and web-dev team will conduct a interview to research the actionable insight. 
**Todo**

- [x]  Try to make a model for guided LDA

# 2/24 5th Meeting

**Update**

1. I tried to implement the Guided-LDA but the library is closed so we couldn’t download this library.
2. Harriet tried other guided topic modeling, it works well. It shows a little higher accurate result.

**To-do**

- [x]  Meeting with Emily and Rohan to give guidance for guided topic modeling and Metacognition respectively.

# 3/3 6th Meeting

**Agenda**

1. We should make a document for our goal for this semester (we made docs for our goal)
    1. We uploaded to our github.

**Update**

1. I asked to Emily to make a potential topic list for both courses, and she made it well.
2. I needed to make a revise for the detailed topic lists. 

**Todo**

- [x]  Discuss with Harriet and Emily, and build guided topic lists
- [x]  Meeting with Emily to explain for NLP concepts and how topic modeling works.

# 3/10 7th Meeting

**Agenda**

1. Why do we make a dashboard for teaching team? How does it look like?
2. We are going to share our own deliverables every weeks as well as question, challenges from progress.
3. The 2nd Presentation

**Update**

1. If we can’t get real-time access to Piazza data, we replace some part of dashboard.
2. Had a meeting with Dr. Lee
    1. I made clear with Dr. Lee that what is our ultimate goal and what can be done by the end of this semester.
    2. It is hard to get data access in real-time, but if we complete dashboard, we might present how the dashboard can help to teaching team efficiently.
    3. Ed discussion is new uprising platform, and GT system decides to use this platform. Many classes are using this discussion forum now, so it is worth to explore.

**Deliverables**

- [x]  Meeting with Web-dev team
- [x]  Meeting with DS team
- [x]  Meeting with Dr. Lee
- DS team
- [x]  Select new topic modeling to focus on btw seeded TM and others. - Emily, Harriet
- [x]  Find the applicable graph for visualization of metacognition, Prepare demo version of graph before the second presentation. - Rohan
- Web-Dev Team
- [x]  Make questions for interview with TAs and conduct interview or survey - Ankit and Young
- [x]  Ankit - Convert CSV file to JSON file for ABSA output data
- [x]  Young - help Ankit to make interview questions.

**To-do**

- [x]  Complete presentation slides by Tuesday. If possible, Monday.
- [x]  Help Rohan to decide visualized graph for metacognitive presence

# 3/17 8th Meeting

**Announcement**

1. Next week Spring break, No class and meeting

**Agenda**

1. Next sprint for 4 weeks except Spring break
2. Web-dev team: Interview questions
3. Data Science team: Extract data from our data set to fill the dashboard

**Progress**

1. Web-dev team has completed the dashboard data, so waiting for the data from Data Science Team.
2. Data Science Team 

**Deliverables**

- [x]  Make a sprint for next 4 weeks
- [x]  Data science team: Meeting with team members, so that make a sprint detail, Fill out our goal chart for draft sprint.
- [x]  Web-dev team: Meeting with team members, so that make a sprint detail, fill out our goal chart for draft sprint.
- [x]  Web-dev team: Create interview questions in detail.

# 3/31 9th Meeting

**Announcement**

1. 3 weeks left until the final presentation - Apr 19th

**Agenda**

1. Share each team member’s task
2. Share Interview Questions

**Progress**

1. Data Science Team -  distributed tasks to prepare data
    1. <student tab>
    post over time: CS6601(B)
    post by students: CS1301, CS6601(B)
    current class sentiment: CS1301, CS6601(Harriet)
    total posts this week: UNAVAILABLE
    average score: CS1301, CS6601(Youngwook)
    customized scores(CP code, frequency): CS1301(Youngwook)
    top contributor: CS1301, CS6601(B)
    2. <teacher tab>
    contributions by instructor: CS1301, CS6601(B)
    average response time: CS6601(A)
    current unresolved posts: UNAVAILABLE
    today’s average reply time(mins): UNAVAILABLE
    current unresolved posts: UNAVAILABLE
    3. <topics tab> - Harriet (ABSA)
2. Web-dev Team - conducting interview, interview questions
    1. **What do you think about the current dashboard?** (Would try to split to some sub-questions and ask specific question like what features do you think less helpful)
    2. **Is the information presented in the dashboard helpful for you as a TA to understand the progress of your course?**
    3. **Do you think it would be helpful to know about topics that are discussed a lot among students? What information would be helpful regarding these topics?**
    4. **What other information do you think would be helpful for you to get a good overview of the course and the students? {Sentiment analysis explanation will be given}**

**Deliverables**

1. Data Science Team
    - [x]  Harriet - Work on ABSA. Try to Increase the accuracy of ABSA model.
    - [x]  Rohan - Prepare data for “average response time.” (A)
    - [x]  Emily -  Prepare data for part (B)
2. Web-dev Team
    - [x]  Ankit - Send interview questions to team channel by tonight.
    - [x]  Young - Help Data science team to prepare data result.
- [x]  Jisan - Help Harriet for pre-processing part, meeting with Young, feedback for interview questions

# 4/7 10th Meeting

**Announcement**

1. 2 weeks left until the final presentation - Apr 19th

**Agenda**

1. Share each team member’s task
2. Share Interview Questions

**Progress**

1. Data Science Team -  distributed tasks to prepare data
2. Web-dev Team - conducting interview, 

**Deliverables**

1. Data Science Team
    - [x]  Harriet - Try to find the another aspects for ABSA
    - [x]  Rohan - Prepare data for “average response time.” (A)
    - [x]  Emily -  Keep work on the data extracting
2. Web-dev Team
    - [x]  Ankit - Revise some interview questions, have a meeting with TA.
    - [x]  Young - Research for Ed discussion API
- [x]  Jisan - Help DS team to prepare data and give feedback of interview.

# 4/14 11th Meeting

**Announcement**

1. Final presentation - Apr 19th

**Agenda**

1. Share each team member’s task
2. Interview Feedback for a dashboard 
    1. Top Contributor graph is not helpful item. it wouldn’t give any information about students
    2. In Post over time graph, it would be helpful with sentiment score over time.
    3. If there are unsolved Posts, we had planned to assign TAs to the posts. but it is challenging point, so we could change it to it is pending with TA assign 

**Progress**

1. Data Science Team -  distributed tasks to prepare data
2. Web-dev Team - conducting interview

Note - Top Contributor → Sentiment over time

**Deliverables**

1. Data Science Team
    - [x]  Harriet - Make a Sentiment over time data and graph
    - [x]  Rohan - Prepare Metacognitive Graph and complete visualized graph for average response time data.
    - [x]  Emily -   Deliver the data from the csv file to Web-dev team with json format.
2. Web-dev Team
    - [x]  Ankit - Implement a feature that user can assign TA to any posts and give guidances how the json format looks like.
    - [x]  Young - Try to get Ed Discussion API, implement connection to get Ed discussion data.
- [x]  Jisan - Help team members.
