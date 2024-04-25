# WEEK 1

First VIP Meeting: Introduce eachother, get new members on the Github and walk through all necessary files.

Deciding whether to use edDiscussion or Piazza data. We have previously done piazza data, but in noder for access for new metrics, hopefully we can
try to move to ed discussion data.
 
## TODO:
1. Finish reading journal club article and finish your part of the presentation in order to practice at next meeting.
2. Research more on each dataset and find the best one to use.


# WEEK 2
1. Finalize the dataset and run through metrics we hope to collect for the dashboard
2. Split the ds team into 2 teams of 2 and get eachothers contact information.

## Todo:
Planning to just go over Journal Club presentation during the meeting.
- Practice journal club slides
- Request Data for the project -> edx/Piazza. 


# WEEK 3

Ran through te he journ club presentation and made sure we were under the time limit. Again talked about the Data science and Webdev plans for the
semester to prepare for presentation 1. 



# WEEK 4 

No sub-team meeting this week. 
Nihaar sent our the presentation 1 slides and assigned each of us a couple slides.

##todo
Make sure to finish your part of the presentation and get ready to run thru it at the next subteam meeting. Start brainstorming metrics for 
future dashboards.
  
  
# WEEK 5

Sub-team meeting: 
- We did a practice runthrough to tof our presentation. Needed to cut 2-3 minutes off. Shortened a few slides down. Told everyone to download and havs 
  PostgreSQL ready because next meeting we are going to learn how to access data and learn was to clwan it.
- Started using GitHub kanban board to check off or add tasks needed to get done by each sub-group within the subteam

## todo: 
Talk to youngwook about metrics needed that is possible with the current dataset.

# WEEK 6
Helped show everyone how to access the data on postgres and how to conver the data once it is cleaned up to a csv file to use pandas on the dataframe.
Youngwook and I have previous files that converted data into json files. We brainstormed metrics to convert the current piazza data set  into useful
visuals and we came up with the following. With this, Ishika and Harikesh will hopeully clean up the csv file and send it to us for us to work
on converting it to backend compatible outputs.

Metrics: 
  <student tab>
    post over time
    post by students
    current class sentiment
    total posts this week
    average score
    top contributor
 
  <teacher tab>
    contributions by instructor
    average response time
    current unresolved posts
    today’s average reply time(mins)
    current unresolved posts
      
      
      
# WEEK 7

Sub-team meeting: 
- Realized we can't use edx data. This limits the complexity of the metrics we can use for different classes. The data is pretty similar to previous 
  years and the basic analysis should also stay the same.
- Talked to youngwook of a possible idea of creating a new model that measure the sentiment of the class to measure the engagement of a class.
    - This would require altering the previous model or creating a new model, so research into different libraries.

## todo: 
-research on a LDA model and talk to youngwook on possibly updating our previous sentiment model to get it to work again for out current dataset.
   
# WEEK 8
   Sub-team meeting: 
   - started researching on new models and landed on a cluster model. Looked up different libraries to implement this model and found the kmeans.
   -Shared this with the group and am going to start on implementing this with our current data set.
## todo
   -Try to clean data and implement a rough versoin of the clustering model.
   -Find a way to group the dataset so it is helpful on the teacher tab of the dashboard
My research links and basis to get started
   
https://www.analyticsvidhya.com/blog/2019/08/comprehensive-guide-k-means-clustering/
   
https://medium.com/data-folks-indonesia/step-by-step-to-understanding-k-means-clustering-and-implementation-with-sklearn-b55803f519d6
   
https://www.youtube.com/watch?v=YEwt6BJROug
   
# WEEK 9 / Working Day

Sub-team meeting: 
   Shared the cluster model I worked on last week. Talked about next stepts and Harikesh offered to give me ideas on various attributes to 
use to reorganize the clusters. Youngwook is working on the SVM model but I have to talk to him about working with me on the cluster model.
- Use the working day time to implement a most recent cluster attribute.
- Have to get results from the cluster model so I can create visuals for the presentation
    https://colab.research.google.com/drive/1uh7rkBg7csyuyE9egRAqMACAIbi4KX0r#scrollTo=CZSbrEAmaFwq

## todo
   - complete a simple cluster model with an output by next wednesday
   - If there is time, use a cleaner dataset so cluster output is cleaner
  
# WEEK 10
   Sub-team meeting/todo: 
   Practiced subteam presentation 2 and timed ourselves. Was able to present about a temporary cluster output.
   Next steps as stated in presentation, no todos for spring break
   - Interactive Visualization: Develop interactive visualization tools that allow teachers to explore the clusters visually and drill down into
   individual posts within each cluster for deeper analysis.

   - Optimize Hyperparameters: Tune hyperparameters of the clustering algorithm, such as the number of clusters (K), to find the optimal configuration
   that maximizes cluster quality and coherence.
   
   -Post-processing: After clustering, perform additional analysis or filtering on the clusters, such as removing outlier clusters or merging cluster 
   that are semantically similar but were split due to noise or data sparsity.
# WEEK 12
   Sub-team meeting:
   - continue on Kmeans model
        -improving accuracy and find a way to visualize it on the teacher dashboard
   - Presented the current clusters based on how often they were asked and how many similar questions are there to a topic

## todo
   -find a way to create a json file for this
   -clean the data a little so basic answers like introductions don't show uo on the model.
   
# WEEK 13
   sub-team meeting:
   - wasn't able to get much work done last week.
   - was able to rank clusters by which ones are the most popular and choose a semi-random question from each cluster
      -don't know exactly what the question we are going to present on the dashboard is yet
   
## todo
   focus on creating the json file so webdev can start implementing the model results
   
  
# WEEK 14
   Sub-team meeting:
   -Was able to get a json of the top 5 clusters
   
             Rank 1: Dear instructors,In the first table...
             Rank 2: Hey <NAME>, Just from a quick glance... 
             Rank 3: I have same question as above... 
             Rank 4: I'm running a basic kill move for right now... 
             Rank 5: If you are new to numpy (like me)... 
   -the 1st iteration of the json file had useless information in it such as
             Hey my name is <NAME>, it is nice to meet you ...
   -Ishika provided a cleaned csv file that I can try running 
   
## todo 
   - create the new json file with the cleaned data so webdev can finish the cluster part of the dashboard
   - finish my slides of the presentation with the new ranks from the model
   -talk to youngwook on how we are going to split up the slides
   
   
# WEEK 15
   Sub-team meeting:
   - wasn't able to attend this subteam meeting but provided the json file to the webdev team
   - finished the json file with no extra data and created ordered the rankings on what is the most common post from the total posts from the class
   -The notebook is uploaded to the spring 2024 directory in the repo
