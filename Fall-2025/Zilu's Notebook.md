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
