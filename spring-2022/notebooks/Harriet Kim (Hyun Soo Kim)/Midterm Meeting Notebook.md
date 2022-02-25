# Meeting 1-26-22
## Computing Research Tools
- Key Performance Indicator(KPI) Canvas Tool
  - Anonymous tool to gather students' feedback about courses on a weekly basis at Georgia Tech
- Massive Open Online Courses(MOOCs)
## Data Sourrces
- edX: discussion forums data
- Canvas: extensive data for courses and Piazza discussion data
## Data Security
- Use GT OneDrive for data work but nowhere else
- Use aggregations if possible and ensure hard drive is secure when using Tableau
## Development
- Can use databse servers (e.g. PSQL, MongoDB)
- Can use cloud servers (e.g. AWS, Microsoft Azure)
- Can use any programming languages
- Use Georgia Tech's enterprise github for version control, make codes private
## To Do
- [x] IRB Training due 1/26
- [x] Self-grade performance assessment with rubric
- [x] Submit form to request access to data from C21U

# Subteam Meeting 1-27-22
- Went over current progress of the project
- Discussed targets for this semester
- Nidhi will interview AI TA to get idea to improve Piazza experience<br>

To Do (by 2/10)
- [x] Understand previous codes and look at Piazza API
- [x] Study SQL connection with Python
- [x] T-shrit rough design

# Meeting 2-2-22
## Project Management Methods
- Waterfall
  - Anonymous tool to gather students' feedback about courses on a weekly basis at Georgia Tech
- Agile
  - Iterative cycles with feedback at the end of each cycle
- Team Data Science Process(TDSP)
    - Agile, iterative methodology for data science projects

Our subteam is going to use Agile and keep tracking if we are on the right way

# Subteam Meeting 2-3-22
- Piazza sandbox environment shared
- Interviewed AI course TA
  - Piazza framework does not scale up for big classes, so it is hard to navigate
  - Duplicate posts is a huge problem
  - Cognitive presence to automatically detect whether a question is resolved or not might be helpful
- Can export data from Piazza by clicking "Statistics" and "Export Statistics" on the top bar
- Link for Piazza API: https://pypi.org/project/piazza-api/

# Meeting 2-9-22
## Educational & user experience (UX) research design
- How to formulate a research question
  - Begin at the end
  - Do not be too broad or too specific
  - Operationalize
  - Develop a table/graph
- UX Research
  - The systematic study of target users and their requirements, to add realistic contexts and insights to design processes
- The clearest view of a design problem can be received by a mix of both quantitative and qualitative research as well as a mix of attitudinal and behavioral approches.
- Six Steps in the Process of Research
    - Identify a research problem
    - Review the literature
    - Specify a purpose for research
    - Collect data
    - Analyze and interpret the data
    - Report and evaluate research

# Subteam Meeting 2-10-22
- The first subteam presentation is on Feb 16th
- There will be a meeting with PARQR team soon
- Data science team has decided metrices and will work on topic modeling
- Web development team will work on Piazza API and mapping to database

## To Do
- [x] Fill the slides for the first presentation by Feb 14th

# Meeting 2-16-22
## Subteam Presentation 1
- Just in Time Interventions Team
  - Goal: Build a web application that predicts student's final grade for any given course using a machine learning model
    - Task 1: establish database connection to the web application
    - Task 2: implement multi platform web design (runnable to mobile device)
- Discussion Forum Team
  - Goal: Creating a web application to help instructors save time on managing forums and increase cognitive engagement in their courses
    - Project Roadmap: deployment of web-app and testing in Piazza sandbox environment and user feedback from instructor team
    - Model Development: topic modeling to cluster similar posts/questions together
    - Educational Research: metacognition in online discussion forums (EdX, Piazza etc) and effect on learning outcomes
- Assessment Quality Team
  - Goal: Move current web app into GTCanvasSDK through new Github repo and implement dashboard functionality to help teachers improve questions
    - subset database differently based on class type
    - based on research papers, generate new research questions that replicate new angle of feature categorization
    - connect data science with LTI application; work on increasing synergy between two subteams in developing final product

# Subteam Meeting 2-17-22
- Feedback for the first subteam presentation
  - Overall good, keep track of the goal and content that we've presented
  - Communicate with other sub-subteam members to make the goal clear
- Data science team
  - will work on topic modeling to segregate QnA; decide which one to use between LDA and NMF
    - LDA (Latent Dirichlet Allocation): a probabilistic model capable of expressing uncertainty about the placement of topics across texts and the assignment of words to topics
    - NMF (Non-negative Matrix Factorization): a deterministic algorithm which arrives at a single representation of the corpus
  - will specify topics and complete the pipeline till prediction
- Web development team
  - will work on connecting local to Piazza API
  - will complete the rest of the pipeline


To Do (by 3/3)
- [x] Connect local to Piazza API

# Meeting 2-23-22
## Research in Online Learning
- Online learning
  - A more recent aspect of distance learning (which began in 1728) that occurs via the Internet. It can be conducted through both synchronous or asynchronous.
  - Massive Open Online Courses(MOOCs) was introduced in 2010s.
- Designing the Online Learning Experience (Cognitive, Emotional, Social, Behavioral)
  - Course Structure & Interface
  - Assessments & Feedback
  - Social Interactions
  - Learning Activities
  - Content Interactions
- Emergency Remote Teaching
  - Mass migration to online learning due to 2020 global pandemic
  - Different from Online Learning
## To Do
- [x] Peer Evaluation by Feb 25th
- [x] Midterm notebook by Feb 25th

# Subteam Meeting 2-24-22
- Data science team has done Topic Modeling (grouped questions together by topic)
- Web development team done connecting local to Piazza API and succssed with accessing data of Piazza posts
  - Concern: the Piazza API we used is private, so we have to check if it does not violate any data security policy
- Education research team will give the presentation on Metacognition
