# Meeting 3-2-22
## Journal Club Activity
- Just in time intervention team
    - Journal title: Early Dropout Prediction in MOOCs through Supervised Learning and Hyperparameter Optimization
    - To solve the key issue in MOOCs, which is low completion rates, the study employs a plethora of state-of-the-art supervised machine learning algorithms. This enables predicting student dropout in a MOOC for smart city professionals at an early stage, thus enhances effective intervention strategies and support actions.
- Discussion forum team
    - Journal title: Visualizing the learning patterns of topic-based social interaction in online discussion forums: an exploratory study 
    - The study presents a novel approach to operationalizing the connections between social interaction and contextual topics by visualizing posts in an online discussion forum. It improves the efficiency of the learning and teaching process by providing ormative assessment design, a collaborative learning process, and unexpected learning.
- Quality assessment team
    - Journal title: Development and Evaluation of Online Quizzes to Enhance Learning Performance
    - The researchers study how providing important information for lectures such as time taken for each question on quizzes develops evaluation of online quizzes. This helps determining the difficulty of question regarding course syllabus, presented material, and the type of question used in the quizzes.
- Thoughts: It was interesting that there are relationships between the connection between the students and the topic discussed by them in the classroom. Maybe we can use this idea to figure out how connection between students improves the quality of a class.

# Subteam Meeting 3-3-22
- Data science team finalized topics for topic modeling
    - Post number, Folder, Subject coding, Topic, Text, User id, User role, Date created, If writer is anonymous
- Presentation about Metacognition by Daniel
    - Definition: awareness and understanding of one's own thought processes
    - Features of Metacognition in Self Regulated Learning 
        - Goal Setting, Self Monitoring, Applying Strategies, Self Assessment
    - Metacognition could be the key difference between simply participating in an asynchronous online course, and truly absorbing knowledge and learning from it, so I think it’s worth further research / integration into our current framework
- Thoughts: How can we take the most of the information regarding metacognition in our project?

# Subteam Meeting 3-10-22
- Backend developer team members met on 3/7 and 3/9, and we started writing Python script for accessing Piazza data. Previously, we checked how to get Piazza data by using Python Shell, the process disappeared when we close the Shell. This time, based on the information we got, we created a script to guide access to desired class and post any time. This also allowed us to keep a visualized and stable API.
- Feedback from TAs about mockups; to keep it minimalistic
- Thoughts: Maybe we can keep the UI simple but make it show more data when users click some buttons, because it would be better to have enough data for instructors.

# Meeting 3-16-22
## Subteam Presentation 2
- Web development
    - connected with the Piazza api using python script
    - going to create api to send responses to front-end and perform integration testing
- UX research
    - basic wireframe ready to get feedback on from instructors
    - going to get feedback, create high-fidelity design for dashboard
- Data science
    - created first version of topic model
    - going to integrate with the backend and improve topic model
- Education research
    - done with preliminary background study on metacognition
    - going to perform initial experiments with our forums data

- Thoughts: We might need some further research regarding cognitive presence.
    

# Subteam Meeting 3-17-22
- KBAI feedback - try to get the most important 1 thing
- Will work on figma based on TA feedback

To Do (by 3/31)
- [x] Start writing unit tests and integration test cases
- [x] Create a survey for T-shirt sizes

# Meeting 3-30-22
## Guest Presentation: GSU Chatbot Academic Nudging Project by Ms. Lindsey Fifield
- problems
    - GSU minority rate has been increased for last 10 yrs (e.g. African American, Pell, Hispanic)
    - Many students who didn’t show up to the first day of school at GSU were non-white, low income, first generation students
- solution: Chatbot(POUNCE)
    - Conversational, Bi-directional, AI enhanced, Text based
    - Provides reminders, guided tutorials, surveys, and targeted human
    - Data-driven personal communication
- result
    - Student satisfaction: 80% gave POUNCE 4 or 5 stars, 94% recommended GSU students to use it again
    - Academic outcomes: timely reminders, customized feedback on progress, open communication btw students and instructions, promote academic supports
    - Final grade improvement: 16% to earn B or higher, .23GPA increased for continuing students homework rate completion, exam submission, reading completion increased
- Thoughts: Is it possible to actually manage a lot of personal questions from the students?

# Subteam Meeting 3-31-22
- Backend developer team members met on 3/30 and changed Piazza data into .csv file and created a database to store it. We done it by importing Pandas DataFrame in our Python script, which is a 2 dimensional data structure with rows and colums.
- Nidhi shared feedback from HTA for KBAI

To Do (by 4/14)
- [x] Structure backend code and test cases
- [x] Help with front-end (optional)

Thoughts: Should we use React or HTML/CSS for front-end part?

# Meeting 4-6-22
## Learning Analytics Research
- Educational Data Mining (EDM) is an intersection between computer based education, data mining/machine learning, and educational statistics. It is concerned with developing methods for exploring the unique types of data that come from educational environments.
- Learning Analytics (LA) can be defined as the measurement, collection, analysis, and reporting of data about learners and their contexts, for purposes of understanding and optimizing learning and the environments in which it occurs.
## OMSA Applicant Success Prediction Project
- procedure
    - Created a library to capture the 21st Century Skills from PDF documents
    - Reviewed LORs to extract information related to the 21stCentury Skills of the applicants
    - Analyzed the extracted features to provide applicant’s score to reflect their 21stCentury Skills
- conclusion
    - Reduced the dimensional complexity of the raw application data from 9,000+ online graduate degree program applicants
    - Identified key input variables among the entire list of variables for predictive modeling
    - Provided a promising basis for applying various machine learning algorithms
## Analyzing MOOC Environment Using Clickstream & Forum Data
- methodology
    - Used machine learning framework for classifying cognitive presence phases to predict congitive presence in discussion forum data
- result
    - Achieved a F1 score value of 92.5% on the test data
    - Final model generally performed well in learning to predict both the non-cognitive phase and four phases of CP
    - Prediction errors decreased drastically over time as we repeated training sessions

# Subteam Meeting 4-7-22
- Data Science team
    - created graphs
    - working on pipelining the data from data.db file to the saved model and providing the graphs to Nidhi
- Front-end team
    - interviewd another TA from CS4510 to ask assigning questions
    - working on figma mockups
    - trying to get a real-time screen and mockups
    - reflect data science team's result when designing mockups, translate whiteboard mockups to figma

To Do (by 4/21)
- [x] Meet up with Pratik and Aanya to discuss about unit testing and integration testing
- [x] Help with front-end (optional)

Thoughts: I need to learn how unit test is like in Python, because I only have experience with JUnit which is the unit test for Java.

# Subteam Meeting 4-14-22
To Do
- [x] Complete presentation slide and writeup by Monday
- [x] Complete unit test and integration test by 4/21

# Meeting 4-20-22
## Subteam Presentation 3
### Just in Time Interventions Team
- Web development
    - did data modeling utilizing Matplotlib and Tableau, in order to identify outliers within educational context
    - visualized datasets with and without the outliers
    - performed feature engineering by experimenting different combinations of features based on importance score
- Data Science
    - Tableau to graph final output data for each course
    - accumulated data has been normalized from last semester

### Discussion Forum Team
- Web development
    - set up Piazza -> Python -> SQLite3 pipeline
    - did unit testing
    - working on front-end mockup to code conversion
- UX research
    - interviewed a CS 4510 HTA
    - created mockups for daskboard
- Data science
    - done topic modeling with BERT + LDA
    - done data pipelining: aiming to automate the pipeline and provide results to the web dev team on real-time data

### Assessment Quality Team
- Web development
    - documentation made for GTCanvasSDK
    - initiated joint effort between web dev and data science
    - prototype for keyword analysis tool implemented
- Data Science
    - expanded classification scheme greatly
    - realized the importance of focusing question analysis based on type
    - will be valuable to get more input from professors

Thoughts: The mobile application that Just in Time Interventions Team made insighted me that maybe our team can make an app to help instructors and students as well.

# Subteam Meeting 4-21-22
- Looked back on this semester and talked about what we did well and what should be improved next semester
- Final Thoughts: This VIP was a very useful and valuable experience in that I implemented a web page using real data. Interviewing real clients and thinking about helpful features for them was worth more than just studying computing skills. It was also a good experience to collaborate with team members and finishing given tasks in time through constant meetings and discussions. Although it was my first time of this kind of team project, I tried my best to learn the systems and skills, and I would like to continue to make useful results by leading other team members next semester.
