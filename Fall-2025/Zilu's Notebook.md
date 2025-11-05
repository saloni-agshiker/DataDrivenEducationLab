# Discussion Forum Zilu's Notebook - 25 Fall

## Week 1
Introduction to the course, everyone took turns to introduce themselves.

Signed FERPA form and filled out the sub-team survey.

## Week 2
### Tasks done:
1. I was assigned PM and backend developer role.
2. We decided the weekly sub-team meeting on Thursdays 11am.
3. Filled out the sub-team goals and research interest for the semester.

### TODO:
1. Thinking about the timeline and milestones for our sub-team.

### Reflection:
Since we are doing sentiment analysis, we need to figure out what will be a good goal for machine learning to achieve. We should start something brand new.

## Week 3
### Tasks done:
1. Created the Jira in order to track tasks and milestones.
2. Journal Club Reading - read paper **Transforming online learning research: Leveraging GPT large language models for automated content analysis of cognitive presence**; did some background research about the authors.
3. Journal Club slides - assigned slides to work on for each team member.
4. Dry-run - practice to make sure we are under 10 min.

### TODO:
1. Create Jira tasks and epics (subject to change in the future).
2. Make sure everyone has access to data

### Reflection:
The paper shows a great example on how to use GPT for labeling and how to apply cognitive presence to text content analysis. This provides insights on our project in connecting cognitive presence and sentiment analysis. We do need to research a little bit more on how to connect sentiments to phases.
- resources: https://arxiv.org/abs/1701.05581; https://www.sciencedirect.com/science/article/pii/S2666920X2100031X

## Week 4
Talked about goals for the semester and what we want to finish by the first presentation:
- finish sentiment analysis with BERT
- purpose of sentiment analysis: see if emotion

Resources:
- https://www.springbord.com/blog/data-labelling-for-sentiment-analysis-techniques-and-tools/
- https://educationaltechnologyjournal.springeropen.com/articles/10.1186/s41239-022-00353-7

### Tasks done:
1. In-class Journal Club presentation
2. Asked for additional grade data

### TODO:
1. Start preparing for presentation 1
2. Deciding how the labeling should be done

### Reflection:
It might be better to get a baseline model done on sentiment analysis so that we can have a clearer vision on what would be a better next step.

## Week 5
### Tasks done:
1. We( Ethan, Saloni, and I) labeled the first 100 data, and calculated the cohen kappa score. It is a little bit low both with 5-category and 3-category
2. Prepared the slides and did dry-run for presentation 1
3. Talked with Harikesh on the possible next step for machine learning

### TODO:
1. Label the rest of the data
2. Decide what to do with ML in detail

### Reflection:
The labeling is giving me an unexpected result, I am thinking of using the average and threshold for the final labeling.

The lecture on UX and research in Education given by Dr. Soylu is interesting. It reminds me that it is important to do some user research and testings when we are building our dashboard later.

## Week 6
### Tasks done:
1. Presented in-person for presentation 1 (slides are in the *slides* folder)
2. After trying out, decided to use average ratings on labeling
3. Hosted the stand-up and checked out individual's progress
4. Updated the Jira tasks

### TODO:
1. Saloni, Ethan, and Clara will be labeling the data, will provide any help if needed
2. Provide any assistant needed for Harikesh to work on ml side 

### Reflection:
Everyone was doing a great job on presenting their work. Different from other groups that might inherit the works done in previous semesters, we are working on something that is rather new or continuout from semesters ago. As a result, we should be more careful on how to document our work so that people in the later semesters can understand our part easily.

## Week 7
During lecture, we talked about AI and GenAI in current education system. There are many advantages of such technology, including personalization and scalability, providing support to students and promote engagement. However, there are still many limitations in both the nature of AI and the ethical issues.

We also talked about XAI and why it is important.
### Tasks done:
1. Took a look at the labels. Trying to determine to next step for sentiment analysis
2. Looked up time series for MOOC with grades: <https://arxiv.org/pdf/2408.13960>
3. Tested out the labeling agreement between 3 raters
    - Python packages used in analysis: numpy, statsmodels, pandas

### TODO:
1. Determin whether we should use Majority Vote, Mean of Labels, or Weighted Average for labels
    - Wait for Ethan revising the labeling
2. Support Harikesh for machine learning model
    - Look into technique for improving the model (possibly early stopping)

### Reflection:
Inspired from our lecture, I think we should also focus on whether we are able to explain our result from sentiment analysis and time series analysis. For example, as we have talked about the R^2 and feature slection for time series analysis, we have to make decisions on what features are logistically related to students' success in the course/\.

## Week 8
During class, we learned about different ways of making visualizations. <https://github.com/ajgallard/vip> has helpful codes that we can take a look.

### Tasks done:
1. Calculated the majority vote and average vote for the labeled 999 data.
2. Booked the study room for next week's working day.
3. Finished the midterm peer evaluation.

### TODO:
1. Prepare topics that I want to focus on for the working day.
2. Make sure we finish up the sprint 2 tasks.

### Reflection:
I took a look at the BERT and Time Series folder in the repo that was shared to in-class to get some ideas on what we want to display to enhance the expanability of our research.



## Week 9
We had the working day at Clough study room, below is a copy of my reflection:

> I planned to achieve the following tasks:
> 
> Check with each team member about their progress, how they allocate time for working on our project, and whether they have any questions.
> Work with the data science team on building the sentiment analysis model based on the labeled data we have.
> Talk with the machine learning team to identify the help needed and the next step.
> What I accomplished:
> 
> Created slides templates for the next presentation, decided the dry-run time to be Tuesday evening.
> Worked with Ethan, Saloni, and Clara together on writing the code for sentiment analysis. We looked at the instructions on this site: https://medium.com/@alexrodriguesj/sentiment-analysis-with-bert-a-comprehensive-guide-6d4d091eb6bb#6318, and coded together using Google Colab. I provided some assistance to them on how to pre-process data in order to adjust our dataset to the example, as well as some help on debugging.
> I also talked with Harikesh about his machine learning progress. He said that he is taking a step back to re-examine the data and features. I talked with him about some potential next steps, including using the sentiment analysis result from our data science team as one of the features in the model.
> Challenges:
> 
> The data science part is on the right track, but I think there are some challenges with the machine learning models. After cleaning the dataset, the useful datapoints are under a thousand, which is far from enough for a model to be trained accurately. Even though data science is also facing this problem, the impact is not as big.
> I have to really figure out a way to make sure we can finish and combine our results by the end of this semester, since we are a little bit behind schedule. We should also focus on the explainability of our project with respect to our goal.
> (I collaborated with all of my team members.)
> Resources:
> https://medium.com/@alexrodriguesj/sentiment-analysis-with-bert-a-comprehensive-guide-6d4d091eb6bb#6318
> 
> https://arxiv.org/html/2408.13960v2 


### Tasks done:
1. Moved the weekly meeting to Tuesday evening before presentation in order to do a dry-run.

### TODO:
1. Finish slides by Monday EOD.
2. Practice for presentation

### Reflection:
Since Harikesh decided to change the model he uses, I need to take a look at the model and try to have some basic understanding of ridge regression 

- Resources about ridge regression: https://www.researchgate.net/publication/381642511_An_investigation_on_the_application_of_Ridge_regression_model_in_the_optimization_of_virtual_practice_teaching_innovation_path_of_Civics_and_Politics_courses_in_colleges_and_universities


## Week 10
We had the in person presentation 2. While we were way over-time during the dry-run, we were able to finish presentation within the time limit. Everyone did a great job.

The other team also had impressive progress, it was insightful to learn about their progress and methods used.

### Tasks done:
1. Finished presentation 2, uploaded code for labeling processing
2. Clara wasn't able to make it to weekly meeting, so I updated with her later

### TODO:
1. Do some more research on ridge regression and sentiment analysis.

### Reflection:
I should leave some more detailed ReadME files so that new members joining the project will have an easier time to on-board. I have experienced issues where new onboard members are hard to inherit previous works, I should try to avoid that in the future.


## Week 11
In class we learned about Design-based research, I really love the sentence that design "should be enacted using extended, iterative teaching experiments in classrooms".

### Tasks done:
1. During subteam weekly meeting, we had a detailed discussion on everyone's progress, making sure we are on the same stage and 
2. Looked at a video about ridge regression vs lasso regression: https://www.youtube.com/watch?v=EB-TjKLltRI&t=29s 

### TODO:
1. Think about the design of our dashboard, what to include so that it is customer-centric
2. Update README file, try to finish it by week 13.

### Reflection:
Before we start our project and research, we should always polish our design, clarify what we want to achieve and how do we do that. Every step should have a clear purpose so that we won't get lost during iterative deployment.

## Week 12