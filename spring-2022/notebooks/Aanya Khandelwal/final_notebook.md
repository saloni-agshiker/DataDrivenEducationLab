
# Class: 2rd March 2022
## Journal Club 
- <b>Quality Assessment sub-team: Development and Evaluation of Online Quizzes to Enhance Learning Performance
    - Researchers are looking into how presenting key information for lectures, such as the amount of time it takes to answer each question on quizzes, affects online quiz evaluation. This aids in determining the complexity of questions based on the course syllabus, given information, and quiz question type. It was fascinating to discover that there are connections between the students' connections and the topics they discussed in class. Perhaps we can use this concept to figure out how student connection enhances the quality of a lesson.
 - <b> Just in time intervention sub-team: Early Dropout Prediction in MOOCs through Supervised Learning and Hyperparameter Optimization
    - The study employs a variety of state-of-the-art supervised machine learning techniques to address the key issue in MOOCs, which is low completion rates. This allows smart city specialists to forecast student dropout in a MOOC at an early stage, allowing for more effective intervention and support tactics.
- <b> Discussion forum team: Visualizing the learning patterns of topic-based social interaction in online discussion forums: an exploratory study 
    - By visualizing messages in an online discussion forum, the researchers provide a novel technique to operationalizing the links between social interaction and contextual issues. It increases the efficiency of the learning and teaching process by providing an informative assessment design, a collaborative learning process, and unexpected learning opportunities.

# Subteam Meeting: 3rd March 2022
- The data science team decided on the following topics for topic modeling: User id, User role, Post number, Folder, Subject coding, Topic, Text, User id, Created on
- Daniel gives a presentation on Metacognition - Metacognition is defined as "knowledge and understanding of one's own thought processes."
- Metacognitive Characteristics in Self-Regulated Learning - Metacognition could be the difference between simply participating in an event and truly understanding it.
- asynchronous online course, and genuinely absorbing knowledge and learning from it, thus I believe it's worth further investigation / incorporation into our present system - How can we make the most of the metacognition data in our project?

# Subteam Meeting: 10th March 2022
- On March 7 and 9, members of the backend developer team met and began creating Python scripts to access Piazza data. We looked at how to get Piazza data using Python Shell previously, however the process vanished when we closed the Shell. This time, we constructed a script based on the information we received to facilitate access to the required class and post at any moment. We were also able to maintain a visually appealing and stable API as a result of this.
- Feedback from TAs on mockups; to keep it basic - Perhaps we can keep the UI simple but have it show more info when users click certain buttons, because it would be preferable for instructors to have enough data.

# Class: 16th March 2022
## Sub-team Presentation
- Education research: preliminary metacognition research completed; preliminary trials with data from our forums to be conducted.
- Web development: utilizing a python script, connecting to the Piazza api, creating an api to transmit responses to the front-end, and performing integration testing
- Data science: developed the initial version of the topic model, which will be integrated with the backend and improved.
- UX research: basic wireframe ready for teacher feedback, going to get feedback, creating high-fidelity dashboard design

# Sub-team Meeting: 17th March 2022
- Advise on unit testing from Pratik
- Clarify format in which to give data-science team the data
<b>TODO:
- Write unit tests and integration test cases for the entire pipeline
-  Work on helping Gautam with front-end

# Class: 30th March 2022
## Guest Presentation by Lindsey Fifield on GSU Chatbot Academic Nudging Project 

- For the past ten years, the minority rate at GSU has increased (– for example African American, Pell, Hispanic). - Many of the students who did not show up for the first day of school at GSU were non-white, low-income, first-generation students.
- POUNCE Chatbot: Conversational, bi-directional, AI-enhanced text-based chatbot that sends out reminders, guided tutorials, surveys, and targeted human, data-driven personal communication.
- Student satisfaction: 80% of students gave POUNCE 4 or 5 stars, and 94% of GSU students said they would use it again.
- Academic outcomes: timely reminders, tailored feedback on progress, open communication between students and instructors, and the promotion of academic supports
- 16 percent improvement in final grade to get a B or above,
Continued students' homework rate completion, exam submission, and reading completion increased by 23GPA.

# Subteam Meeting 31st March 2022
- On March 30, members of the backend programming team met to convert Piazza data to a.csv file and establish a database to store it. We did it by importing Pandas DataFrame, a two-dimensional data structure with rows and columns, into our Python script.
- Nidhi shared Head TA feedback.

<b>TODO: 
- Reorganize backend code
- Write unit test cases
- Work with Gautam on front-end
# Class: 6th April 2022
## Research on learning analytics
- Educational Data Mining (EDM) combines computer-assisted learning, data mining/machine learning, and educational statistics. It is focused with the development of strategies for examining the various forms of data that are generated in educational settings.
- Learning analytics (LA) is the measurement, gathering, analysis, and reporting of data about learners and their surroundings with the goal of better understanding and optimizing learning and the environments in which it takes place.
## Prediction of OMSA Applicant Success
- Created a library to extract information about the applicant's 21st Century Skills from PDF documents 
- Reviewed LORs to extract information about the applicant's 21st Century Skills - Analyzed the collected features to provide the applicant's score to reflect their 21st Century Skills
- Reduced the dimensional complexity of raw application data from more than 9,000 online graduate degree program applicants
- Identified essential input variables for predictive modeling from the whole list of variables - Provided a suitable foundation for using multiple machine learning algorithms
## Using Clickstream and forum data to analye MOOC 
- In order to predict cognitive present in discussion forum data, a machine learning framework was used to identify cognitive presence phases.
- The final model learned to predict both the non-cognitive phase and the four phases of CP with an F1 score of 92.5 percent on the test data 
- The final model performed well in learning to predict both the non-cognitive phase and the four phases of CP with an F1 score of 92.5 percent.
- As we repeated training sessions, prediction errors fell dramatically.
# Sub-team Meeting: 7th April 22 
- The Data Science team developed graphs; they are currently working on pipelining data from the data.db file to the saved model and sending graphics to Nidhi.
- Another TA from CS4510 was interviewed by the web-development team to ask assigning questions.
- working on figma mockups - attempting to obtain a real-time screen and mockups - reflecting the results of the data science team while building mockups, converting whiteboard mockups to figma
<b>TODO
- Meet with Pratik and Harriet to discuss unit and integration testing 
- Assist with front-end development

# Sub-team Meeting: 14th April 2022
<b>TODO:
- Finish up presentation slides Monday
- Complete notebook
- Complete peer evaluation
- Pick up t-shirts

# Class: 20th April 2022
## Sub-team Presentation
- Just in Time Interventions In order to find outliers in an educational context, the team used Matplotlib and Tableau to model data.
- completed feature engineering by experimenting with different combinations of features depending on relevance score - viewed datasets with and without outliers
- Tableau to graph final output data for each course - collected data from the previous semester has been normalized
- The Discussion Forum Team set up a Piazza -> Python -> SQLite3 pipeline 
- performed unit testing - worked on front-end mockup to code conversion 
- interviewed a CS 4510 Head TA - created mockups for the dashboard 
- completed topic modeling with BERT + LDA 
- completed data pipelining: the goal was to automate the pipeline and provide results to the web dev team on real-time data.
- Documentation created by the GTCanvasSDK quality assurance team
- established a collaborative effort between web development and data science 
- created a prototype for a keyword analysis tool 
- considerably expanded categorization scheme 
- understood the necessity of focusing question analysis on type 
- will be beneficial to gather more input from professors


# Sub-team Meeting 21st April 2022
- Reflected on the semester and discussed what went well and what may be improved for next semester.
- <b> TODO:
- Send Pratik feedback
- Collect shirts
- Finish-up documentation
