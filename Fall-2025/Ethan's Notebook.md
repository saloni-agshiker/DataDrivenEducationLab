__Ethan's Fall 2025 VIP-DDE-DF Notebook__
# Week 1
## General Body Meeting:
- Partook in a circle introduction among Data-Driven Education instructors, returning members, and new members
- Listened to an overview of DDE’s four subteams – specifically, their overarching goals, past accomplishments, and current objectives
- Planning to continue working as a member of the Discussion Forums subteam - this semester's goals are TBD
## TODO:
- Complete Qualtrics Sub-Team Survey
- Submit FERPA Acknowledgment Form via DocuSign
# Week 2
## General Body Meeting
- Scheduled weekly Discussion Forums sub-team meeting using Lettuce Meet (Thursdays from 11-Noon)
- Discussed individual strengths and desired contributions to DF as per our given roles
- Regained access to DF GitHub
## TODO:
- Resubmit the URL for the IRB Training certificate
- Peruse the GitHub to reorient my understanding of team objectives, resources, and structure
# Week 3
## General Body Meeting
- Reviewed overarching research themes and factors in scientific thinking
- Gained some insight into different approaches to data
- Greater emphasis on formulating DF's goals for the semester, which include creating a dashboard that provides instructors with visual graphics to improve their instruction based on analyzing the sentiment analysis and cognitive presence behind students' online discussion forums.
## Sub-Team Meeting:
- Divided work for Journal Club presentation among DF team
- Initiated first steps of actiont to completing presentation
## TODO:
- Continue reading into Journal Club research article: [Here](https://www.sciencedirect.com/science/article/pii/S1096751625000107?via%3Dihub)
- Complete Journal Club presentation and be prepared to present during Wednesday’s class
# Week 4
## General Body Meeting
- Journal Club presentations
- DF Presentation: [Here](https://gtvault.sharepoint.com/:p:/s/VIPData-DrivenEducationTeam-DiscussionForums/EZ7b-JWQVURDpUW0Ynh1VWoBkynz8Hj1ZOztc2D9McWx1A?e=0EePoz)
## Sub-Team Meeting:
- Decided individual repsonsibilities to complete ahead of Sub-Team Presentation 1
## TODO:
- Work with Saloni and Zilu to create catalogs/labels for the edX dataset
# Week 5
## General Body Meeting
- Listened to a presentation on UX and UI by Dr. Yilmaz Soylu
## Sub-Team Meeting:
- Decided to label first 1k data points for sentiment analysis
- This will be used to determine feasibility of sentiment analysis and give us something to work with for Presentation 1
## TODO:
- Label the data on Saturday morning
- Work on slides for Presentation 1
# Week 6
## General Body Meeting
- Sub-team presentation 1
- DF Presentation: [Here](https://github.gatech.edu/C21U/vip-nlp/blob/b76b22b9b1666cb0ac112c386cbb7a0a373de786/Fall-2025/slides/Discussion%20Forum%20Presentation%201.pdf)
## Sub-Team Meeting:
- Determined that 5 sentiment categories was too narrow, so we are using only 3 now
- Each data science team member will be labelling 1k data points by themselves and then we will perform an average on the ratings
- This will prevent us from having to deal with bias in inter-readability.
## TODO:
- Finish labelling the data
- Perform first steps of data analysis on the labelled data
# Week 7
## General Body Meeting
- Listened to presentations on AI-powered learning and explainable AI by Dr. Lee and Dr. Grigoryan.
## Sub-Team Meeting:
- Initiated plans on data analysis of three reviewer's inter-readability scores
## TODO:
- Revise some of my data point ratings since Claude unproperly rated some comments; initially thought that manually labelling the first 200 data points would be enough for Claude to train off of and understand my marks for creating sentiment analysis ratings, but it tended to hallucinate.
# Week 8
## General Body Meeting
- Listened to presentation on data analysis techniques by Mr. Adrian Gallard.
## Sub-Team Meeting:
- Revised my ratings of the first 1k data points prior to the meeting
- Proposed initial plans for DS team to create BERT model
## TODO:
- Begin to work on creating the BERT model
- Take necessary actions to fully understand how to prepare for creating the BERT model
- Interpret average results of first 1k data points.
# Week 9
## Working Day
- The DF team and I planned out our first steps to completing Presentation 2, including setting up a meeting time for a dry run ahead next Tuesday ahead of the presentation. After that, we split up into the DS and ML subteams. As part of the DS team, we set up a Google Colab, read an article on performing sentiment analysis with BERT, and fine-tuned the given model for our dataset to create a 70 traning/15 validation/15 testing percentage. Article found [here](https://medium.com/@alexrodriguesj/sentiment-analysis-with-bert-a-comprehensive-guide-6d4d091eb6bb#6318). I collaborated with Saloni, Zilu, and Clara during this process. One primary issue we ran into the model didn't initially train from our data, but we figured out the issue was that the label mapping was off by 1 index. We are hoping to continue working on BERT and create some sentiment analysis insight by Presentation 2.
## Sub-Team Meeting:
- Performed a dry run of Presentation 2 ahead of Wednesday's class
## TODO:
- Finish slides for Presentation 2
- Complete initial training of BERT model
# Week 10
## General Body Meeting
- Presented Presentation 2
## Sub-Team Meeting:
- Discussed next steps for DS and ML teams ahead of Presentation 3
- DS plans to fine-tune BERT model by using cleaned dataset, adding accuracy scores like F1, and scaling to unlabelled data.
## TODO:
- Use BERT model on clean dataset
- Start adding accuracy metrics
