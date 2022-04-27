# General Meeting Note

# 1/19 First Meeting

- Introduced among sub-team members.
- Weekly sub-team meeting is from 11am to 12pm on every Thursday.

# 1/26 Computing Research Tools

- Self graded Assessment rubric
- IRB Training Due
- Submit a data request as a new member using Canvas Qualtric Survey (might need link for certificate URL of IRB training)
- We use and analyze data from edX and Piazza (Tracking how students are behaving and checking how participation is triggered)

# 2/2 Project Management

- 1st sub team Presentation in 2 weeks on Feb 16th.
- Managing a data science project by starting small with clear objectives and building well-defined success metrics.
- Three approaches to manage data science project: Waterfall, Agile, Team Data Science Process (Our Discussion Forum team will use Agile Methodology.)
- Discussed with sub-team members that we are going to use the Trello board to keep track of our team progress.
- We firstly draw one big picture goal for all of our teams instead of each team having other goal. Then, decide our each team’s goal to conduct our main goal.

# 2/9 UX Research Project

- Keep focusing on the main project goal. (Not too broad or too specific)
- Find key factors in Discussion forum activities encouraging student engagement and performance online class, what kind of insight we want to provide to the instructor.
- 1st Presentation contains
    
    1. Identifying researching problem 
    
    2. Reviewing the literature 
    
    3. Specifying purpose for research — narrowing the purpose statement.
    

# 2/16 1st Presentation

- Presented our goals and navigating how we do the project and what is the next step
- Rough draft script for presentation:

Our research goal is to identify key factors and provide actionable insights to instructors. We have used cognitive presence as a key factor influencing student engagement and performance in online class. We also think metacognition presence can be another factor. Danial will talk about it later slide. The web-dev team will visualize data model and provide visible graphic to the instructor as soon as data-science team provides specific data. So, we expect that the instructors are easily approachable to data such as a distribution of question by topics and average sentiment score of students. 

We have multiple projects in data science team. From last semesters, we continue to work on cognitive presence and sentiment analysis. and there are new research topics which are topic modeling and metacognition.

Our another goal for topic modeling is to classify two discussion forum data belonging to a particular topic. and we are going to cluster repeated and similar questions from the cumulative semesters. So we expect to reduce the similar question volume.

- [x]  Complete the Peer Evaluation
- [x]  Complete and submit a Mid-term Notebook

# 2/23 Research in Online Learning

- LMS(interactive method, sound animation video) was the game changer in online learning.
- Good lesson from the history of online learning is to approach by asking how technology can be adapted to support human learning.
- What is the most critical issue(s) that needs to be immediately addressed
in online learning? - I think the most critical issue is isolation. When we take a class in-person, we could face to classmates and in-class activity and there was so many opportunities to join in clubs or activity. However, during the pandemic is continuing, I think a social activity of students has decreased.
- How your current project contributes to (design, development, assessment, improvement of) online learning? - Our team is designing a topic modeling system to analyze discussion forum data. With using the system, we will help the instructors to understand what students are discussing and which concepts they are confused at.
- [x]  Submit a mid-term Notebook due this Friday

# 3/2 Journal Club

- We are assigned the article paper named “Visualizing the learning patterns of topic-based social interaction in online discussion forums: an exploratory study.”
- Presented the overview and summary of the article and addressed what our team thinks about the paper.
- The second team presentation will be in 2 weeks
- Next weeks have no class. (Working day)
- [x]  Prepare for the 2nd presentation.

# 3/9 Working day

# 3/16 2nd Presentation

- Presentation Script:

Topic modeling’s result will be used by our web-dev team to visualize a cluster of words and their probability distribution of the key topics of discussion in the Piazza forum. and it will help TA/ professor answer similar questions from the pervious semester to ease their work. We made two topic modeling LDA and Bert with LDA. We tried Roberta model but it was giving us undesired results. So we dropped it.

As a reminder, LDA is a type of statistics modeling to discover the abstract topics by text-mining and analyzing each documents. We roughly visualized distributions of the topics. At the right up corner, we can see a cluster of words by topics. On the left table, it shows the top 5 words in each topics. If you see the left table, topic 0 has  variable value make as top 5 words, it is matching with words in the map. On the right table, it represents a dominant topic of each documents.

BERT is a deep learning algorithm related to natural language processing. So we concatenated LDA and BERT vectors with a weight hyper parameter to balance the relative importance of information from each sentence in documents. Unnecessary words and sentences are cut off by BERT. Therefore, We have built a clustering contextual topics and made a form of word cloud. On the left word cloud, it seems like representing statistics topic, and on the right representing algorithm topic . We are able to see the similar words in topic which cannot find on LDA. The coherence score is to measure how interpretable the topics are to humans. we got 0.51 of the coherence score for this topic model. We wanted to compare this score with LDA model, but we were not able to calculate the coherence score for LDA because of supporting module issue. As a result, we choose to use BERT with LDA for these reasons.

Malav will talk about our team’s next steps.

- Got a feedback from Dr. Lee, whether there is further research for cognitive presence.
    - For now, we are focusing on topic modeling data. After the topic modeling, Malav would visualize and  integrate the outcome of cognitive presence data along with the topic distribution.
- Dr. Gazi asked that can the future data be used with this model and how?
    - Yes, the new data can be used. We planned to directly receive the data from the Piazza and connect to the analysis system so that the instructors do not need to upload csv files.

# 3/30 Guest Presentation from GSU

- Our guest, Ms. Lindsey Fifield, has talked about chatbot in GSU POUNCE.
    - Background: students usually coming a lot but losing in summer.
    - The chatbot is conversational, Bi directional, AI enhanced, text based
    - using app: surveys / targeted human support / guided tutorials / reminders
- Outcomes by chatbot: making networking and priority communication coordinate personalize coordinate. Retention bot RCT outcomes reducing withdrawals for students, resolving holds, engaging with financial aid, early register.
    - increased interactive messages
    - explaining benefit
    - early messaging
- Academic outcomes
    - timely reminders
    - customized feedback on progress
    - open communication between students and instructors
    - promote academic supports
    - final grade improvement
    - course material engagement
    

# 4/6 Learning Analytics

- Educational Data Mining (EDM), Learning Analytics process (LA)
    - Students in educational environments produce data → new knowledge. currently applications are emotional learning analytics and DashBoards and visual learning analytics.
- Motivated OMSA. Using machine-learning algorithms (which are Logistic Regression, Random Forest, Gradient Boosting, and ADABoost Classification), predicted the model. As a conclusion, made progress in data processing and succeeded model training & performance testing with high accuracy.
- Comparing basic level and Master degree class, Problem interaction in Micromaster, seq_goto, and seq_next most important activities.
- Predicting cognitive presence in Discussion Forum data, ML framework for classifying cognitive presence, F1 score 92.5%

# 4/13 Working Day

No Meeting

# 4/20 The 3rd Sub-team Presentation

- Speaking Note:

In the last semester, our team completed Sentiment Analysis and Cognitive Presence. Our team is focusing on topic modeling for this semester. Topic modeling as a new branch is to help instructors get an insight in Piazza discussions. Metacognition project is also underway. 

We have Topic modeling combining BERT and LDA. A table in the middle shows each docs by topic. We see the number of output docs is 1212, but the number of original data is 1493. Because of the BERT algorithm, it cut off 281 posts which are mostly gratitude expression, greetings, or short reply, such as just Thank you, something like that. Also, the right graph shows that the highest coherence score is in the case with 6 topics.

We have two graphs that can easily capture information. A bar graph is classic, but for the bubble chart, d**epending on the ranking of topics, the size of the circle becomes larger and the color becomes darker.** We are going to show word clouds of top 2 topics so that the instructors will be able to see what the top topics are implying.

Next, Pratik will cover our metacognition.