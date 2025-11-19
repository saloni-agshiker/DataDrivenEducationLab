## Harikesh Tambareni's Fall 2025 Notebook

# Data Driven Education: Discussion Forms

## Week 1: Aug 20, 2025

### Lecture Notes: 
-Introduced myself to the class and learned about the other students in the class
-Had the opportunity to learn more about all of the subteams, although I planned on rejoining the discussion forums subteam
-Got to reconnect and better understand the missions of this research
### To-do:
-Sign FERPA 
-Choose a subteam through the survey

## Week 2: Aug 27, 2025

### Lecture Notes: 
-Connected with the discussion forums subteam
-Decided what time works best for all members for the weekly subteam meeting
-Making sure GitHub access was restored and learning more about the work that was done last sem
## To-do:
-Complete IRB training
-Start thinking about what the scope of the machine learning engineer role entails

## Week 3: Sept 3, 2025

### Lecture Notes:
-Listened to Dr. Lee on how good research and documentation are created
-Gained a grasp on the presentations required and how to use data well
-Started discussing the logistics of the journal article review

### Sub-Team Meeting Notes:
-Divided up the required content
-Scheduled run-through timing

### To-do: 
-Read the journal club article
-Complete 3 slides on discussion questions
-Be ready for a practice run-through

## Week 4: Sept 10, 2025

### Lecture Notes: 
-During class, we were able to listen to other studies important to the data-driven education field
-We also presented a paper on "Leveraging GPT large language models for automated content analysis of cognitive presence"

### Sub-Team Meeting Notes:
-See how the data science team was building on the previous work done in this VIP
-Learning how to get the data and what types of data are available
-Thinking of how to implement previous VIP work to the current data

### To-do:
-Get access to the data through data access form
-Learn more about the differences between MLE and DS
-Start breaking down ML techniques to see how to learn from the data we have

## Week 5: Sept 17, 2025

### Lecture Notes: 
-Tuning in to the lecture for UX & Research in Educational Technology by Dr. Yilmaz Soylu
-Trying to capture information and see how this UX knowledge can be implemented for our final dashboard at the end of this semester

### Sub-Team Meeting Notes:
-Was not able to tune into the full sub-team meeting
-Caught up with Zilu over Teams personally and learned more about the progress for DS and then how we are going to work forward on the Subteam presentation 1

### To-do:
-Started taking my ML learnings from last week and started thinking about implementation
-Complete slides for the Subteam presentation - Goals, Progress, and Plan of ML team
-Create an outlined plan on the ML research question after playing around with the data that I have access to
-Practice during dry run for Subteam presentation 1 on Monday

## Week 6: Sept 24, 2025

### Lecture Notes:
-Listening to the 4 teams presenting their subteam presentation 1
-Presenting our work on the Subteam presentation 1 for the discussion forums

### Sub-Team Meeting Notes:
-Explained the project for ML team in depth, using a bi-modal model to find student behaviors that lead to grade success
-Informed the team of the plan of attack on my side
-Listening in on how the DS team plans on working on the CP of discussion posts by labeling the posts manually

### To-do:
-Starting to put together the queries for the 3 tables
-Clean the data set
-Create a first pass of the semantic modality part of my ML model

## Week 7: Oct 1, 2025

### Lecture Notes:
-Learning about education and AI from Dr. Lee
-For example, learning about the research trends and opportunities for education technologies

### Sub-Team Meeting Notes:
-Hearing about the discussion for the completion of labeling data science's data
-Seeing the labeling metrics from Zilu
-Letting the team know of my work as the ML team, I ran the queries between 3 tables to clean and create 1 joined table
-Do basic EDA including average grades, number of students with grades, number of posts within the students that have grades
-Created univariate correlation analysis to understand the variables better without creating a complicated model yet
-I started running R squared tests on Ridge, Lasso, and KNN models using 15-20 features from time series data (LSTM) and semantic data (transformers model).
-The model was severely flawed because the R squared was negative.
-Discussed overall data and got tips from Zilu on models, features, and future improvements.

### To-do:
-Turn in VIP notebook and peer assignment
-Bring down the number of features and try to take a higher-level approach on the behaviors so we can fine tune the model to show correlations

Preprocessing code:

def load_and_prepare_data():
    threads_df = pd.read_csv('Forum thread ferpa(in).csv', encoding='utf-8')
    comments_df = pd.read_csv('Forum comment ferpa(in).csv', encoding='utf-8')
    grades_df = pd.read_csv('edX data set_student grade(edX data).csv', encoding='cp1252')
    date_format = '%m/%d/%Y %H:%M'
    threads_df['created_at'] = pd.to_datetime(threads_df['created_at'], format=date_format, errors='coerce')
    threads_df['last_activity_at'] = pd.to_datetime(threads_df['last_activity_at'], format=date_format, errors='coerce')
    threads_df['updated_at'] = pd.to_datetime(threads_df['updated_at'], format=date_format, errors='coerce')
    comments_df['created_at'] = pd.to_datetime(comments_df['created_at'], format=date_format, errors='coerce')
    comments_df['updated_at'] = pd.to_datetime(comments_df['updated_at'], format=date_format, errors='coerce')
    grades_df = grades_df.dropna(subset=['percent_grade'])
    print(f"Loaded {len(threads_df)} threads, {len(comments_df)} comments, {len(grades_df)} students with grades")
    return threads_df, comments_df, grades_df

## Week 8: Oct 8th, 2025

### Lecture Notes:
-Was not available to make it to class (excused - Harvard MBA event)

### Sub-Team Meeting Notes:
-Created the plan for the working day next week for each team and location that we will meet
-Gave the current updates on what I planned to accomplish for the upcoming working day

### To-do:
-Improve the model and re-examine all of the present features and find places to improve R^2
-Study my previous work from Spring for the KNN model heatmap using posts and replies by students

## Week 9: Oct 15th, 2025

### Working Day Notes:
-Main goal was to solve for the R^2 being meaningless with this dataset because there was too much noise
-Analyzed all of the features and realized which ones aren't key to this experiment and are messing with the model
-Created a much more accurate Ridge model and did research into the model to prevent overfitting and pushed for the negative coefficient factoring with Ridge models

### Sub-Team Meeting Notes (Moved to 10/21):
-Performed a dry run of our Subteam presentation 2 before the Wednesday 11/22 class

### To-do (After working day):
-Complete my slides showing Original Plan, EDA, Ridge Model, and Next Steps for the ML Team

## Week 10: Oct 22st, 2025

### Lecture Notes:
-Listened to the other subteams' Presentation 2
-Presented Discussion Forums Presentation 2

### Sub-Team Meeting Notes:
-Talked about what will happen next for both MS and DS teams after the Subteam meeting 3

### To-do:
-I need to see how I can continue the R^2 and target for .30 as my metric
-Both checking new models and seeing any optimization in my variables is the next step
-Discussing with Clara about how to viz ML model for the dashboard

## Week 11: Oct 29th, 2025

### Lecture Notes:
-Was not available to make it to class (unexcused)

### Sub-Team Meeting Notes:
-Team knew about my progress on the Ridge model and I explained what my next testing steps were to optimize
-Also discussed after I finalize my model, I can focus more on 

### To-do:
-Test Ridge and Lasso with new variables
-Test with the PCA algorithm on top of the Ridge algorithm to see if we can optimize the current model
-Test with Gradient boosting to see if a more fluid algorithm can help with noisy data

## Week 12: Nov 5th, 2025

### Lecture Notes:
-Was not available to make it to class (unexcused)

### Sub-Team Meeting Notes:
-Shared that I landed on a final algorithm and the model is complete
-Discussed how to work with Clara and DS to have my data that I am using from the two CS1301 classes for viz + BERT

### To-do:
-Met with Clara to break down the ML model for student behaviors so she has context to create some sketches of potential viz
-Send Clara two datasets so she can create viz for ML model that Zilu can use to create the dashboard: 1) all the user ids with grades attached and the coefficient scoring for each feature 2) all the users and the actual posts they made with grades


## Week 13: Nov 12th, 2025

### Lecture Notes:
-Attended the lecture for Future Directions for Data-Driven Education by Dr. Harmon

### Sub-Team Meeting Notes:
-Guide Zilu and Clara with the dashboard and how to go forward with the viz

### To-do:
-Create file for dataset with all discussion posts with grade data attached and cleaned (the dataset my ML model is using) to the DS team to use their BERT model
-Create ML team's subteam presentation 3 section
-Create 9 new viz to understand the final results of the model
-Clean up code to remove all of the testing that I was doing to find the best model and solidify results

## Week 14: Nov 19th, 2025

### Lecture Notes:
-Hearing about dynamic and static data
-Seeing multiple teams' dashboards and seeing how they are organizing data for real insights
-Listening to the 4 teams presenting their subteam presentation 3
-Presenting our work on the Subteam presentation 3 for the discussion forums

### Sub-Team Meeting Notes:
-Ran a mock subteam presentation run-through

### To-do:
-Turn in the final team peer eval
