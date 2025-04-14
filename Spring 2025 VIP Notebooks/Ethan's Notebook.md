__Ethan's Spring 2025 VIP-DDE-DF Notebook__
# Week 1
## General Body Meeting:
- Partook in a circle introduction among Data-Driven Education instructors, returning members, and new members
- Listened to an overview of DDE’s four subteams – specifically, their overarching goals, past accomplishments, and current objectives
## TODO:
- Complete Qualtrics Sub-Team Survey
- Submit FERPA Acknowledgment Form via DocuSign
# Week 2
## General Body Meeting
- Scheduled weekly Discussion Forums sub-team meeting using Lettuce Meet
- Discussed individual strengths and desired contributions to DF
- Gained access to DF GitHub and set up Microsoft Teams
- Start a notebook to document weekly activities as a team member of DF
## TODO:
- Complete the IRB Training
- Peruse the GitHub to gain a better understanding of team objectives, resources, and structure
# Week 3
## General Body Meeting
- Snow Day - meeting conducted online via Zoom
- Reviewed overarching research themes and factors in scientific thinking
- Gained some insight into different approaches to data
## Sub-Team Meeting:
- Drafted first version of team structure and goals
- As a data engineer, I currently have plans to work closely with my data scientist teammate Saloni since we will both be working with the discussion forums data
- Submitted request to C21U for access to edX data
- Planned to revamp educational dashboard as one of DF’s primary goals
## TODO:
- Read into Journal Club research article: https://www.sciencedirect.com/science/article/pii/S2666920X2100031X
- Complete Journal Club presentation and be prepared to present during Wednesday’s class
- Research other tools and resources that will be needed to build a dashboard
# Week 4
## General Body Meeting
- Journal Club: presented our synopsis of research on automated analysis of cognitive presence in online discussion forums
- Journal Club Presentation Link: https://docs.google.com/presentation/d/1hLA1SvFfgXJ0a2T8p69YJ5cbIZVgoVLKpcKsdBzZT0w/edit?usp=sharing
- Listened to other subteams’ presentations
## Sub-Team Meeting
- Fine-tuned plans for creating a dashboard that foregoes using previous database app from four years ago and starting from scratch instead
- This is because we want to use the new edX dataset, which most likely will be incompatible with the previous database app that contains several hardcoded values
## TODO
- Polish my individual goal for this project and continue learning on potential resources
- Research potential use of Hugging Face and LDA to deploy NLP model
# Week 5
## General Body Meeting
- Listened to Dr. Grigoryan’s presentation about the real-world applications of explainable artificial intelligence 
## Sub-Team Meeting
- Presented my insight on implementing a BERT/DistilBERT model
- Can streamline text classification model through Transformers library on HF
- One caveat is that the DF datasets are relatively small (~9k entries)
- Still open to using LDA as long as we clean the datasets
- Collaborated on a working timeline for the data science team
## TODO
- Prepare my slides on data metrics for the upcoming sub-team presentation
- Begin to clean the dataset using Pandas
- Basic guideline for using NLTK tools: https://www.geeksforgeeks.org/introduction-to-nltk-tokenization-stemming-lemmatization-pos-tagging/
# Week 6
## General Body Meeting
- Presented Sub-Team Presentation 1 via Microsoft Teams
- Sub-Team Presentation 1 Link: https://docs.google.com/presentation/d/1JxvFgwIIzVG8skGg-7P63wErp5LZP8HYaAonREsespo/edit?usp=sharing
- Listened to other sub-teams’ presentations
## Sub-Team Meeting
- Prepared to start the build phase of our project
- Focused on meeting deadlines set by Zilu in Jira with flexibility
## TODO
- Polish notebook before midterm evaluations
- Submit peer evaluations
# Week 7
## General Body Meeting
- Listened to a presentation on online learning by Dr. Yilmaz Soylu
- Received some input from Dr. Soylu about how to manage some current struggles with preprocessing the datasets
## Sub-Team Meeting
- Combined and thoroughly cleaned the thread and comment edX datasets, now ready to be used in LDA
- Available in GitHub Repo as 'cleaned_edX_dataset.csv'
## TODO
- Research how to implement LDA models: https://medium.com/@corymaklin/latent-dirichlet-allocation-dfcea0b1fddc#:~:text=We%20start%20off%20by%20splitting,(the%20probabilities%20should%20converge). AND https://www.geeksforgeeks.org/topic-modeling-using-latent-dirichlet-allocation-lda/
- Start working on the LDA model
- 
TODO
Start research on how to implement BERT model for text classification
Continue to figure out how to analyze and interpret results from LDA

# Week 8
## General Body Meeting
- Listened to a presentation on educational research software development by Dr. Sembrat
## Sub-Team Meeting
- Filtered dataset into individual csv files based on course_id
- Wrote an abstract on DF’s semester accomplishments and goals to be submitted for undergraduate research symposium
## TODO
- Start research on how to implement BERT model for text classification
- Continue to figure out how to analyze and interpret results from LDA

# Week 9
## General Body Meeting – Working Day
- My goals for the session were to further my understanding of how to leverage the results from the LDA model and to establish a connection between our current progress with creating the BERT classification model. I primarily used this time to reassess the data science team’s progress and how it will affect our plans, and then some research into topic labeling and pyLDAvis. I believe we are still in-line with our initial deadline of finishing the LDA model by 3/14, with finishing touches to be made during Spring Break potentially. I combined multiple pieces of data into one data point in order to try to fix our LDA model which requires one document. Moving forward, I would like to work with pyLDAvis to create a visual representation of our LDA model’s findings. One current challenge we are facing is that the LDA model interprets each comment individually rather than as one large course thread. I worked with Saloni and Zilu on this issue, and we discovered that we cannot use TF-IDF in combination with our LDA model since TF-IDF requires multiple documents, but LDA works more effectively with one combined data point. We have pivoted to potentially predefining our own topic categories rather than having LDA initially discover our categories, and so we will reverse engineer and start from classifying through BERT. We are also looking into Naive Bayes as a potential model to implement, which I will do more research into moving forward.
- I will be referencing this link to understand how to work with pyLDAvis: https://medium.com/towards-data-science/evaluate-topic-model-in-python-latent-dirichlet-allocation-lda-7d57484bb5d0
- I found a similar project idea that implements clustering from LDA into BERT: https://medium.com/analytics-vidhya/bert-for-topic-modeling-bert-vs-lda-8076e72c602b
## Sub-Team Meeting:
- Conducted a rehearsal before Presentation 2 on Wednesday
## TODO
- Finish data cleaning slides for Presentation 2

# Week 10
## General  Body Meeting
- Presented Presentation 2
- Link: https://docs.google.com/presentation/d/1YFboFAtlwY3jeUBAiQvnIGs855sQKDe
WyiuF4BeMneY/edit#slide=id.g32d593a5437_2_53
# Week 11
## General Body Meeting
- Listened to a presentation on data analysis and visualization by Mr. Adrian Gallard.
## Sub-Team Meeting
- Began taking steps to learn how to implement BERT
## TODO
- Look at Mr. Gallard’s implementation of BERT and determine how we could potentially apply his ideas
- Learn how BERT works independently

# Week 12
## General Body Meeting
- Listened to a presentation on ethics in data-driven education by Dr. Warren Goetzel
## Sub-Team Meeting
- Ran Mr. Gallard’s code on Google Colab but realized that I need to perform a foundational level of research on BERT before trying to decipher his code
- Separately, Saloni and I are collaborating on creating our presentation for Georgia Tech’s 2025 UROP Symposium
## TODO
- Spend more research on learning how to implement BERT and BERTopic
- Use this website for learning BERT + sub-BERTs: https://maartengr.github.io/BERTopic/index.html#fine-tune-topic-representations
- Decipher Mr. Gallard’s shared implementation

# Week 13
## General Body Meeting
- Listened to a presentation on the future outlook of C21U and Data-Driven Education
- Was particularly interested in the development of Socratic Mind
## Sub-Team Meeting
- Not enough time to deploy a fleshed-out version of BERT, so we will further our implementation of LDA
- Developed a word cloud for CS 1301 dataset as an element of data visualization
- Started the foundation of implementing pyLDAvis for more data visualization on unsupervised topic modeling
- Using this pyLDAvis data visualization output as inspiration: https://app.myeducator.com/reader/web/1702d/topicmodel/n34se/
## TODO
- Complete slides for Presentation 3
- Merge implementation of our Data Science subteam’s LDA with ML subteam’s synthetic dataset, then incorporate into a one-page dashboard
- Week 14
# General Body Meeting
- Presented final Presentation 3
- Link: https://docs.google.com/presentation/d/1T_oG1iDVmdbqy6Mp3QwiKcNeTWthUFWl0pkkBr-w-iw/edit?usp=sharing
## Sub-Team Meeting
Implemented LDA on synthetic dataset created by ML team on a dummy CS 1301 forum, compared results’ LDA weights and intertopic distribution between the synthetic and real datasets, and displayed this analysis in a mockup dashboard

