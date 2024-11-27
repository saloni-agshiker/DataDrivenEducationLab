# Week 1

This week we met all of the students and professors on the Data-Driven Education project. I am a time conflict student, however, I have worked with majority of the people on this project for the past three semesters. We were told about previous semesters of work and the overview of the project. Some goals were listed about the project. 

Assignments:
1. FERPA documentation signing
2. IRB training
3. Qualtrics sub-team survey

# Week 2
The qualtrics sub-team survey was due this week (August 27th).
Sub-team selections were finalized the morning before class. I am a data scientist on the discussion forums sub team.

Nihaar suggested a few times through out the week for our sub-team to meet. We have decided on 12pm on Mondays via teams. 

Assignments:
1. IRB training 

# Week 3
Completed: IRB training, 1st subteam meeting

Subteam meeting: 
Talked about goals for the semester, clearly outlined the expectations of the roles in the subteam. This semester we have a data scientist, 2 machine learning, and 1 statitician. The statitician and data scientist (Isabel Caleyo and I, respectively) work together. 

Sent out teams meeting agenda for Journal Club, letting everyone know what our method of assigning slides was and where to find everything. 

Assignment: Journal Club

# Week 4
Subteam Meeting: Journal Club due today for final review/practice. We didn't get to practice our presentation due to late notice, however, Nihaar and other older memebers shared helpful tips on how to present.

This week class was full of presentations from different subteams. 

Our presentation: 
https://gtvault.sharepoint.com/:p:/r/sites/DiscussionForumsSub-Team/_layouts/15/Doc.aspx?sourcedoc=%7B8A728359-8A2F-4165-87AD-0A837BC8485D%7D&file=Journal%20Club%20Presentation%20Template.pptx&action=edit&mobileredirect=true

I did the discussion slide. 

# Week 5
Subteam Meeting: Discussed what the structure of this semester is going to look like. We do not have a direct dataset like we have had in the past, so instead, we are going to create our own datasets. One thing we have had trouble with in past semesters is finding the separation of student and teacher posts. We always assumed what was posted by a teacher/TA and what was posted by a student. We wanted to change that this year. Isabel and I created schemas that separates files into a student file and a teacher/TA file. We had an attribute in each linking posts/responses to each other. We handed this schema off to Diya and Adaora (the machine learning team) for them to ceate dummy data. With this dummy data, Isabel and I will find useful metrics to gain some insights off of. 

Link to schema: 
https://docs.google.com/spreadsheets/d/1ZjYKfDjAcUG_5tu2DdwKhcY5ByV2H7bOlDaIZqTnfAQ/edit?usp=sharing

Link to attribute definitions: 
https://docs.google.com/document/d/1EzgSZPeBv7HEkXL3o8t8YzexwxWTh7jpJhvv82H0_Xs/edit?usp=sharing

Isabel and I sent the two above links to the ML team. 

Due: Subteam Presentation 1 slides!

# Week 6
Subteam Meeting: Discussed the schema that Isabel and I created and had Aditi (the TA) give her input. There were no criticisms, and the ML team agreed with our thought process. We also practiced our subteam presentation for timing. 

One critique that Aditi gave us was that the slides looked cluttered, so we fixed that. 

Subteam Presentation 1: https://docs.google.com/presentation/d/1abxmobcj09t4k6mI9hQpj-CeYJXaiJchwixsDX2xofk/edit?usp=sharing

Action Items: 
(for data science team) Come up with useful metrics.


# Week 7
Subteam Meeting: Not much has happened for the data scienc team. We are looking for models we may want to use and finding documentation on them so we can run these models when we are ready. ML team is still finding a way to create dummy data. 

Action Items: 
find models that can test our metrics. 

# Week 8
DUE: peer reviews 
Subteam Meeting: 
    Data Science: analyze dummy data as time-series data. try clustering        based on topic right now, will continue with that until we get real         data which should be better time-series wise

This week Isabel and I researched how to do a time-series since we are pretty unfamiliar with the topic. We did this independently and then planned on meeting Friday, October 11 for an hour or so to discuss what our plan is. 


# Week 9
Subteam Meeting: 
      Data science team discussed what we had learned and let them know           that we we will devise a plan this week so that we can begin our            subteam presentation.

This week was a reading week. Isabel and I devised a plan to get started with time series data. 

These are my notes: 
Previously, Isabel and I created a schema for the ML team. They populated about 30 entries into the tables. The code is in the discussion forums team file on github.

Now that we have this data, we are planning to analyze it as time-series data. We want to try clustering based on topic/subject and will continue with that until we get real data. So, essentially, doing this is practice for when we get real data.

Since this is something neither Isabel nor myself have done in the past, we wanted to take a minute and plan out our process. So to cluster our data based on the topics/subjects, we first want to preprocess the posts by tokenizing the comments/posts and removing stopwords (the, and, or, etc.). We would also have to reduce some of their words to their base form (posting becomes post). Additionally, we have to convert text into some numerical representation by weighing words by important and capturing semantic relationships between words. Second, to prepare our data for time-series analyzation, we can use a sliding window approach. We already have timestamps associated with each post. We can create time windows and aggregate posts within the windows and see how topics change over time. Next, there are two models that we could run to cluster by subject/topic. One is Latent Dirichlet Allocation, and the other is Non-Negative Matrix Factorization. Both are methods that identify/extract topics within posts. Finally, we can use cluster algorithms such as DBSCAN, K-Means, or Hierarchical Clustering. The first would be useful if there are outliers in the data. The second can cluster similar posts into groups based on the input vector. The third can build a hierarchy of clusters. After we complete all of this, we can analyze the main topics and trends. Another thing we looked into is Dynamic Time Warping. This combines clustering with  time-series so we can compare clusters across time windows.


Today's working day consisted of doing this research, and some links I used to conduct this research are below. 

https://medium.com/@metacosmos/prepare-time-series-data-for-time-series-forecasting-with-deep-learning-part-1-1a11bbf314e4Links to an external site.

Links to an external site.https://lakefs.io/blog/data-preprocessing-in-machine-learning/Links to an external site.

https://www.kaggle.com/code/panks03/clustering-with-topic-modeling-using-ldaLinks to an external site.

https://www.geeksforgeeks.org/dbscan-clustering-in-ml-density-based-clustering/Links to an external site.

https://www.geeksforgeeks.org/k-means-clustering-introduction/#Links to an external site.

The only challenges I say we are faced with is knowing where to start. This would be both of our first times doing this, so we wanted to flush out a plan before we started

We started coding this week. Time series was a challenge and under a time constraint we decided to find another actionable insight. The challenge was finding the date-time stamp in order to have a working analysis. Instead we did a post over time trend for presentation 2 and presented our challenges and future steps. 

# Week 10

Subteam Meeting: 
We presented as we would during presentation 2 so that we can make sure we are under the time limit, and for Aditi to give us feedback on what we should add or fix. She told the data science team that we need less wording and more graphics. She told us to use those same words when we present. 

Link to subteam presentation 2: 
https://docs.google.com/presentation/d/1lmAv2qnnGLpF_yCLprJ57NSn_fW6cfX54DUm1d_khWQ/edit?usp=sharing

# Week 11
Subteam Meeting: Subteam meeting was more for ML team. Data science was told to just find more information about time series if needed so we can get started as soon as we have the data set. 

Isabel and I begin to create a document that outlined the work we did this semester. 
Link to Doc: 
https://docs.google.com/document/d/1BwrgBs_eQ3eUkA0x8vh1e9bAC4gJwsT7T4n0BJBskLs/edit?usp=sharing

# Week 12
Subteam Meeting: We got the data, so now we are told to begin our work with time series. 

Isabel and I begin to start time series analysis. All of our code will be in the github by the end of the semester. We did a couple of small insights to begin with. We also did a seasonal, trend, and residual graph. 

# Week 13
Subteam meeting: Updated the team about what Isabel and I have completed. 

This week we completed our documentation for future teams. 

# Week 14
Subteam Meeting: we did not present this day to practice, but we worked on compiling all of our information for the presentation and showed our findings to Aditi. 

Link to presentation: 
https://docs.google.com/presentation/d/1s9r3A7ptF1E50pm9cW-bYLrE_AAWA9NH/edit#slide=id.p1


# Week 15

Cleaned up notebook for Final Assessment


