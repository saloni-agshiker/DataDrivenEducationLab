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

1st Presentation

Topic Modeling is unsupervised ML technique that is scanning a set of documents, detecting words and phrase patterns, clustering word groups, and classifying document by topic. We expected that Teaching team is aware of what students mainly talk about and what question comes frequently in the discussion forum. But, we have faced the limitation that is the top topic has too wide range and general words. We have two word clouds for the top topics. Those word clouds are irrelevant to the course contents. So we think it needs some labels to guide the model.

 To alter the limitation, we have adopted a guided topic modeling. It is the topic modeling approach by setting several seed_topics. We will develop this model by providing seed words for each topic, so each topic word is related to specific contents. For example, we have four topics as predefined topics in the images. we have tree topic, version topic, grading system topic and confusion matrix. So, if one question contains a lot of tree and node text,  the document would have higher score on the first topic than on other topics. We can notice it is the first topic question. Eventually we expect to reduce of running time by utilizing pipeline and improvement of accuracy for classification by topic.

We will turn into Rohan to talk about metacognition research

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

- [ ]  Try to make a model for guided LDA
