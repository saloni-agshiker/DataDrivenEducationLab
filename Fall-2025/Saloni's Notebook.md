## Saloni Agshiker's Fall 2025 Notebook

# DDE: Discussion Forms Subteam

## Week 1: Aug 20, 2025

### Class Meeting Notes:
- First VIP meeting of the semester: met the advisors and board, introduced the students, learned about the different subteams and what they accomplished in past semesters.

### To Do:
- [x] Sign FERPA document
- [x] Complete Subteam Survey due 8/26


## Week 2: Aug 27, 2025

### Class Meeting Notes:
- Got assigned to sub-teams and met with our individual sub-team members. We decided the best time to hold our weekly sub-team meetings and discussed areas of research we are interested in pursuing.
- Everyone was added to the shared GitHub and we started exploring the work from past semesters.
- First sub-team meeting: next Thursday, 9/4 at 11AM

### To Do:
- [x] Start thinking about areas of research for this semester.


## Week 3: Sept 3, 2025

### Class Meeting Notes:
- We learned about Research & Documentation by Dr. Lee. She provided details about the types of research we could pursue, the agenda for our first sub-team meeting, and what each of our 3 presentations would entail. Our sub-team also got assigned a reading for the Journal Club next week.
- [x] Journal Club presentation: next Wednesday, 9/10

### Sub-Team Meeting Notes: Sept 4, 2025
- We assigned roles for the Journal Club presentation and planned when we will meet to practice it.

### To Do:
- [x] Read the assigned paper for Journal club (due Sunday 9/7)
- [x] Complete the assigned slides for Journal club (due Monday 9/8)
- [x] Practice presenting slides with entire team (meeting on Tuesday 9/9)


## Week 4: Sept 10, 2025

### Class Meeting Notes:
- Our Discussion Forums subteam presented our slideshow on the Journal Club article we read and we listened to other subteam presentations, which were very insightful.

### Sub-Team Meeting Notes: Sept 11, 2025
- We discussed our goals to achieve before the first sub-team presentation. Since we did not have enough time to implement the BERT model for sentiment analysis last semester, we chose to start this semester by completing that task. Our goal is to analyze student emotion in discussion posts to gain insight about their mood/perspective on the course as well as struggles and cognitive presence indicators. Before the first sub-team presentation in two weeks, we aim to label all of the data in preparation for sentiment analysis.

### To Do:
- [x] Research on how to perform data labeling (due Thursday 9/18)


## Week 5: Sept 17, 2025

### Class Meeting Notes:
- Dr. Yilmaz Soylu presented on how to design a seamless UI/UX personalized to your user base, providing useful tips as we design our dashboard around our instructors' needs.

### Sub-Team Meeting Notes: Sept 18, 2025
- The data science team decided our approach for sentiment analysis: given the size of our dataset (40K+ comments), BERT looks like the best model for sentiment analysis. We will first label a subset of the dataset (about 1000 comments) based on five categories (very positive, positive, neutral, negative, very negative) to train the model with. We are planning to meet on Saturday, 9/20 to label 100 comments together to determine our inter-rater reliability and decide a clear criteria for annotation, and will then individually label 300 comments each.
- We also planned for our first sub-team presentation next week, determining what each person will speak on.

### To Do:
- [x] Meet to label dataset on Saturday 9/20
- [x] Label 300 comments individually (by Tuesday 9/23)
- [x] Complete assigned slides for first sub-team presentation & practice for presentation (by Tuesday 9/23)


## Week 6: Sept 24, 2025

### Class Meeting Notes:
- We gave our first subteam presentation on past work conducted in this team, as well as our goals and timeline for the semester. We also listened to the other subteams' presentations.
- Link to our first subteam presentation: https://gtvault.sharepoint.com/:p:/s/VIPData-DrivenEducationTeam-DiscussionForums/EYNHZxDpTddNv-pbFNa472MB14ROhxyAPakvwnWc3hTyrg?e=gW0VJK

### Sub-Team Meeting Notes: Sept 25, 2025
- The data science team made a plan on how to finish labeling the dataset. We had a separate meeting on Saturday 9/20 to label 100 comments, but realized our inter-rater reliability was quite low and having 5 categories made it more difficult to score (because there isn't much difference between 'positive' and 'very positive'). Therefore, we decided to reduce to 3 categories (negative, neutral, positive), each person will rate all 1000 comments, and then calculate the average score for each.
- We also spoke about how our ML team could collaborate with the data science team -- and it looks like our work on cognitive presence may be useful to the ML team and we can merge our statistics/insights together into one cohesive dashboard at the end of the semester.

### To Do:
- [x] Label 1000 comments individually (by Thursday 10/2)


## Week 7: October 1, 2025

### Class Meeting Notes:
- We listened to a presentation on Explainable AI and learned about methods like LIME and Shap values that researchers are exploring to understand the factors that affect an AI machine's decision-making process.

### Sub-Team Meeting Notes: October 2, 2025
- The data science team completed our labeling of the first 1000 comments of the EdDiscussion data individually. Zilu started performing statistical analysis of our scores, computing the average and majority values. Our Cohen's Kappa value (represents inter-rater reliability) was significantly higher (around 0.69 compared to 0.25) since we labeled a larger portion of the dataset manually and reduced our rating categories. Once Zilu completes her analysis, we will begin building our sentiment analysis model using BERT and feeding the training data into it.

### To Do:
- [x] Research how to build sentiment analysis model using BERT (by Thursday 10/9)


## Week 8: October 8, 2025

### Class Meeting Notes:
- We listened to a presentation by Mr. Adrian Gallard on Digital Learning Data Analysis and Visualization Practices. He covered various text processing models like WordNinja to separate conjoined words, SetFit for text classification, and BERT for various NLP uses. His presentation was very helpful as it provided a good introduction to BERT before I research more into it.

### Sub-Team Meeting Notes: October 9, 2025
- We gave our weekly updates: next steps for the data science team are to complete analysis of the labelled data (Zilu will perform this analysis calculating Cohen's Kappa and IRR before the next sub-team meeting) and then to build our sentiment analysis model using BERT. We made a plan for the working day next week: we will meet at the library on campus during class time to start training BERT.

### To Do:
- [x] Complete the mid-term Peer Evaluations (by Friday, 10/10)


## Week 9: October 15, 2025

### Working Day Notes:
- My sub-team met today in-person from 11-11:50 at Culc 445 to work together. I worked with Ethan, Zilu, and Clara to build the BERT model and train it on our labelled dataset. To build BERT, we followed a comprehensive guide posted on Medium (link: https://medium.com/@alexrodriguesj/sentiment-analysis-with-bert-a-comprehensive-guide-6d4d091eb6bb#6318) and coded in Google Colab. Of our 1000 labelled data, we decided to use 70% for training, 15% for validation, and 15% for testing purposes. We ran into a slight bug in the code where the number of categories BERT expected did not match what we inputted, but we were able to fix it by changing our code. By the end of our meeting, we finished training BERT. The next step is to test BERT and determine how accurate it is and if any fine-tuning is necessary.
- Link to our BERT model: https://colab.research.google.com/drive/1t_046rpA0XoHjswIXealJnzmva0XxWx5?usp=sharing

### Sub-Team Meeting: Moved to next Tuesday, 10/21

### To Do:
- [x] Complete assigned slides for second sub-team presentation & practice for presentation (by Tuesday 10/21)


## Week 10: October 22, 2025

### Class Meeting Notes:
- We gave our second subteam presentation on the progress we have achieved so far in the semester. We also listened to the other subteams' presentations.
- Link to our second subteam presentation: https://gtvault.sharepoint.com/:p:/s/VIPData-DrivenEducationTeam-DiscussionForums/EXkgbQKYwuBJmoGFjZ4Z0OQBgeT7IkgbfvcCad9ZhHKpdQ?e=ywnQWQ&nav=eyJzSWQiOjI1NiwiY0lkIjowfQ

### Sub-Team Meeting Notes: October 23, 2025
- We gave our weekly updates: the data science team finished building the first version of our BERT sentiment analysis model. Although it is able to classify comments well, we are running into a couple issues: we need to reduce the training time from one hour and increase accuracy. We will schedule a meeting during the week to work on these issues.

### To Do:
- [x] Fine-tune BERT model (by Thursday 10/30)


## Week 11: October 29, 2025

### Class Meeting Notes:
- Dr. Eric Sembrat provided an insightful presentation about designing for software engineering products.

### Sub-Team Meeting Notes: October 30, 2025
- We gave our weekly updates: on the data science team, Ethan created a slightly different version of our BERT model, called Distilled BERT, because its classifications are more accurate and it runs faster for our smaller dataset. Ethan ran this model on our cleaned dataset and it performed well. For next steps, Ethan will run the Distilled BERT on the original dataset. Then, I will compare results from the original and cleaned datasets and calculate accuracy scores, using measures like a confusion matrix which calculates true positive, true negative, false positive, and false negative.
- Link for more info about confusion matrix: https://www.geeksforgeeks.org/machine-learning/confusion-matrix-machine-learning/

### To Do:
- [x] Calculate accuracy measures and cross-comparisons for Distilled BERT results (by Thursday 11/6)


## Week 12: November 5, 2025

### Class Meeting Notes:
- Dr. Yilmaz Soylu provided a presentation on the ethical use of AI, touching specifically on ways to mitigate algorithmic bias. The presentation was quite relevant as our subteam is building AI models for sentiment analysis and cognitive presence, so we must factor in these ethical considerations.

### Sub-Team Meeting Notes: November 6, 2025
- We gave our weekly updates: Ethan ran the Distilled BERT on our original dataset and I learned about confusion matrices (using the link Zilu provided in our last sub-team meeting) to calculate analytics (accuracy, precision, F1 scores) on our models. Building the confusion matrix requires running our model on our testing dataset, so I am now working with Zilu to write the code for that. If our accuracy, precision, etc scores are high enough, the next step is to aggregate the classifications from the model to make conclusions about student sentiment in the course. Otherwise, we will have to determine why scores are low and refine the model.

### To Do:
- [x] Work with Zilu to build confusion matrix and extract sentiment-related insights from our model (by Thursday 11/13)
