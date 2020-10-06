## **Week of 9/7**
### **Face to Face Meeting on Wednesday**
* This week, we discussed project management strategies for data science
* This included learning about methods such as waterfall, which involves the flow through well-defined phases, agile, which uses iterations, and MS TDSR, which uses a more full fledged and comprehensive approach
* Ultimately, this posed an opportunity for reflection for our group, where we determined that we were following mostly agile development due to our use of a Trello board and our goal of making a prototype that we update over time
* This also further stressed the importance of keeping the Trello board up to date to stay organized

### **Sub-team meeting on Thursday**
* I pretty much worked solely within the data science team during the subteam meeting. 
* Being that we now have access to the edX data, we first boserved it at the surface level. These were our observations:
  * To anonymize the data, the word "PERSON" was used as a placeholder for phrases that needed to be omitted in posts/comments. These would need to be removed in order to properly use NLP on the data.
  * Being that the threads and comments were in separate directories, they will eventually need to be merged. This will potentially be done by referencing the 'id' and 'thread_id' columns of the data to merge the comments within the same thread.
    * This data will need to be cleaned up, however, as each id data was stored as a string with the leading characters being '\x36'
* Ultimately, we decided to divide up the tasks for cleaning and merging the data of the threads and comments for the edX discussion forums to be done for the following week
* We then shifted to discussing what data we wanted to find so that we can start providing things for the web-development thing. We ultimately decided that the goal was to try and look for these six ideas:
  1. Post density per unit time
  2. Subjectivity of posts
  3. Sentiment analysis of posts
  4. Posts which require TA/professor attention
  5. Enhanced keyword search
  6. Student engagement (% of students posting)
* We will attempt to find each of these over time to see which ones are most obtainable, and are best suited for the web application in development
* We scheduled a meeting for the data science team at 1:00 pm on Monday, 9/14 to further discuss this.

### **To-Do for next week**
* Clean up data in the 'id' and 'thread id' column for the data ***completed***
* Become further accustomed to python and pandas in the jupyter notebook ***completed***
* Data science team meeting at 1:00 pm on Monday, 9/14 ***completed***
