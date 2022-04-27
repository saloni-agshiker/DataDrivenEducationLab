# Sub-Team Meeting Note

# 1/27 1st Meeting

- Discussed what we are going to do during a week.
- Trying to review what the sub-team did from the previous semester.
- [x]  Meeting on the next Monday with Malay and Pratik to discuss metrics and sorting out
- [x]  SQL/Python online course to study myself

# 2/3 2nd Meeting

- We have to get access to data for discussion forum of Piazza from AI course.
- For the result of interviewing with TA on AI course, some feedback with the forum are discussed
    - 1) duplicating posts make it hard to navigate problems. - already have an extension to solve duplication.
    - 2) seeing unresolved posts. — solved
    - 3) good idea to assign TA to unresolved posts — Based on Malav’s experience, depends on TA
- Students tend to ask same or similar question each semester (repeating), so if they can see the previous semester’s question, they could figure out and help them over deeper concepts. Forum can be used to discuss rather than assignment question. Limitation: hard to collect data from the prev semester.
- Start to work on modeling random posts in this semester. For later, if we have more information in next semester, the outcome can be preciser.
- [x]  Keep working the notebook
- [x]  Specifically try looking into topic models.

# 2/10 3rd Meeting

- Presentation 1: Idea of pipeline / plans / initial topic modeling
- Get the Google Drive access
- Should discuss to divide presentation portion with Malav
- [x]  Fill out my portion, and prepare for the first presentation

# 2/17 4th Meeting

- More focusing on topic modeling
- We need to think about LDA & NMF which technique more better fit to our project
- Will have a presentation for Metacognition
- [x]  Replicate the medium article on the Quora question similarity.
- [x]  Apply the LDA to our data set

# 2/24 5th Meeting

- Based on the result of LDA, I think I cannot see any similarities of words in terms of each topic. For example, top words for topic 0 are submission, late, normalize, grade, and make.
- Another problem is function names or code examples are broken. example: namerade, addnode, mathbfsigmak, and submissionsubmissionpy.
- Discussed our problems related how to specify topics and should complete the pipeline of topic modeling.
- [x]  Submit the mid-term Notebook
- [x]  Read the article given from the journal club

# 3/3 6th Meeting

- Discussed what each team members did last week.
- Using the Coherence Score to determine the optimal number of topics
- Word confusion issue: some words don’t correlate with other words in the same topic.
    - The same word is on the same count meaning can’t distinguish the context of words.
- The Huggingface topic modeling can be used to segregate QnA.
- We are going to work on new topic modeling using RoBERTa and LDA.
    - Pre-trained model, RoBERTa, will be used to obtain more accurate representations of words and sentences.
- [x]  Meeting with Pratik and Malav to discuss some difficulties.
- [x]  Make a new topic modeling using RoBERTa.

# 3/10 7th Meeting

- Focus on why and how we did this modeling.
- [x]  Prepare the 2nd presentation
- [x]  Meeting on Monday

# 3/17 8th Meeting

- After the 2nd presentation, Cognitive presence may be needed(?).
- Having two issues for the code of topic modeling with BERT+LDA.
    - To find the optimal number of topics, tried to plot a graph of coherence score in terms of the number of topics. The graph shows that there is no big difference, the score is a quite constance in the range between 0.6 and 0.5.
    - Preprocessing deletes unnecessary words and sentence, but it sometimes filtered out the whole sentence in the documents so that the documents are None. The modeling prediction code cannot deal with the none sentence.
- Pratik will give me a comment after review the code.
- [x]  Revise the code by Pratik’s comments
- [x]  Think about pipeline of sending data to the web-dev team with Malav.

# 3/31 9th Meeting

- Harriet will order T-shirts for our team when size survey is done.
- Create a bubble chart, based on Pratik’s feedback.
- Continue working to understand the code for the topic modeling .
- [x]  Create the topic model relevant charts (bubble chart)
- [x]  Write test cases for visualization.

# 4/7 10th Meeting

- Search how we can save our pre-trained model to our local repository and load when we need.
- Tried to make a chart of tracking topic over time.
    - But, there are problems. We don’t know yet how frequently we update data and graph, and we haven’t decided on data pipelining.
- [x]  Work with Malav how we save our pre-training model.
- [x]  Meeting with Malav to discuss data base pipelining.

# 4/14 11th Meeting

- Provide graphs for Nidhi when data pipelining is outlined.
- Prepare the last presentation for this semester.
    - What we have done this semester, and what we can expect to do for the next semester.
- Shortcomings:
    - At the beginning, I had no idea what skills are needed and which technique is helpful. But, now I realize that I should study more for python and data visualization. I think I could study how to decorate a chart and graph to emphasize the most important info. Overall, I feel like need more communication skills.