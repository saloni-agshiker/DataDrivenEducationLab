__Clara's Fall 2025 VIP Notebook__

# Data-Driven Education- Discussion Forums sub-team

# Week 1: 8/20
## General Body Meeting:
- Participated in around-the-room introductions with the Data-Driven Education faculty and instructors, returning students, and new students
- Watched a presentation overview of Data Driven Education’s mission and it's four subteams – including their overarching goals, past accomplishments, and current objectives
- Took notes on the four subtteams and began creating personal ranking of the teams I'd most like to participate in
## TODO:
- Complete Qualtrics Sub-Team Survey
- Submit FERPA Acknowledgment Form via DocuSign
# Week 2: 8/27
## General Body Meeting
- Met with my newly assigned sub-team, Discussion Forums, and scheduled weekly sub-team meeting using Lettuce Meet (Thursdays from 11-Noon)
- Discussed individual strengths and desired contributions to DF as per our given roles. Heard from returning members on specifics of last semester's work and direction for this semester's project.
- Gained access to DF GitHub
## TODO:
- Complete IRB Training and submit certificate URL to Canvas
- Explore the GitHub to familiarize myself with team objectives, resources, and structure
# Week 3: 9/3
## General Body Meeting
- Listened to presentation on overarching research themes and factors in scientific thinking
- Discussed different approaches to data usage and analyzation
- Greater emphasis on formulating DF's goals for the semester, which include creating a dashboard that provides instructors with visual graphics to improve their instruction based on analyzing the sentiment analysis and cognitive presence behind students' online discussion forum postings.
## Sub-Team Meeting:
- Divided work for Journal Club presentation among DF team
- Initiated first steps of completing presentation
## TODO:
- Continue reading into Journal Club research article: https://www.sciencedirect.com/science/article/pii/S1096751625000107?via%3Dihub 
- Complete Journal Club presentation responsibilities- Results & author takeaways- and be prepared to present during Wednesday’s class
# Week 4: 9/10
## General Body Meeting
- Presented DF group Journal Club PPT: https://gtvault.sharepoint.com/:p:/s/VIPData-DrivenEducationTeam-DiscussionForums/EZ7b-JWQVURDpUW0Ynh1VWoBkynz8Hj1ZOztc2D9McWx1A?e=0EePoz 
- Listened to other 3 groups- AI, Just-in-time, assessment quality- present their Journal Club PPTs
## Sub-Team Meeting:
- Reviewed new DF sub-team goals set in Week 2-3: discussed their viability & compared to last semester's work
- Decided to continue working on implementing BERT model for sentiment analysis of discussion forum posts to gain insight on student behavior/performance
## TODO:
- Submit Data Request form- Edx and Discussion Forum data in Python
- Look at the data (once given access) and formulate plan for how to contribute to sub-team goals as a data scientist
# Week 5: 9/17
## General Body Meeting
- Listened to presentation from Dr. Yilmaz Soylu on best practices in designing a UI/UX that matches your user base, which will help us when designing our instructor dashboard. 
## Sub-Team Meeting:
- DS team began labeling dataset (~1000 discussion comments) based on five categories to train the model with
- Planned first sub-team presentation and assigned roles.
## TODO:
- Complete assigned slides- Literature Review- before presentation dry run on 9/23
See articles:
-  “From Concept to Classroom: Developing Instructor Dashboards through Human-Centered Design.”  doi:10.1016/j.caeo.2024.100234
-  “Analyzing Learning Sentiments on a MOOC Discussion Forum Through Epistemic Network Analysis.” doi:10.19173/irrodl.v26i1.7965. ​
# Week 6: 9/24
## General Body Meeting
- Gave first DF sub-team presentation: https://gtvault.sharepoint.com/:p:/s/VIPData-DrivenEducationTeam-DiscussionForums/EYNHZxDpTddNv-pbFNa472MB14ROhxyAPakvwnWc3hTyrg?e=gW0VJK
- Listened to other 3 groups- AI, Just-in-time, assessment quality- present their sub-team presentation PPTs
## Sub-Team Meeting:
- DS team made a plan on how to finish labeling the dataset. We realized our inter-rater reliability was very low and having 5 categories made it more difficult to score (because there isn't much difference between 'positive' and 'very positive'). Instead, we decided to reduce to 3 categories (negative, neutral, positive), each person (Ethan, Saloni, and I) will rate all 1000 comments, and then calculate the average score for each.
## TODO:
- Label 1000 comments by Thursday 10/2 based on 3-category scale
# Week 7: 10/1
## General Body Meeting
- Listened to a presentation on Explainable AI and learned about methods that researchers are exploring to understand the factors that impact an AI machine's decision-making process.
## Sub-Team Meeting:
- DS team completed individual labeling, but there were discrepancies between Saloni & I and Ethans labels, so he is reevaluating the potential accidental mis-labling. Afterwards, Zhilu will finalize analysis of our labels. She had already done preliminary analysis, computing the average and majority values. Our Cohen's Kappa value was significantly higher (around 0.69 compared to 0.25) since we labeled a larger portion of the dataset manually and reduced our rating categories.
## TODO:
- Do individual research on BERT model training and ML in general
# Week 8: 10/8
## General Body Meeting
- Listened to a presentation by Adrian Gallard on "Digital Learning Data Analysis and Visualization Practices". He covered various text processing models like WordNinja, SetFit. and BERT. 
## Sub-Team Meeting:
- next steps for the data science team are to complete analysis of the labeled data. Zilu will perform this analysis calculating Cohen's Kappa and IRR before the next sub-team meeting. We made a plan for the working day next wednesday in-person in CULC to work with BERT.
## TODO:
- Complete mid-term peer evaluations by Friday 10/10
# Week 9: 10/15
## General Body Meeting: Working Day
- Data science team reviewed Zhilu's analysis of our individual discussion forum comment ratings' inter-user reliability scoring. Because the scores were satisfactory, we began training the BERT model on 70% of our labeled data, intending to save 15% for validation and 15% for testing.
- Based our model of off an article by Alex Rodrigues (linked below), which provided a guide on using BERT for sentiment analysis.
## Sub-Team Meeting:
- Moved to next tuesday (10/21) so sub-team can do dry-run of our presentation
## TODO:
- Complete literature review slides before sub-team presentation dry-run on Tuesday 10/21
- Articles for lit. review:
      - Rodrigues, Alex. “Sentiment Analysis with BERT: A Comprehensive Guide.” Medium, 4 June 2024,         medium.com/@alexrodriguesj/sentiment-analysis-with-bert-a-comprehensive-guide-6d4d091eb6bb#6318. ​
      - He, Guizhen, and Jianing Zhang. “An Investigation on the Application of Ridge Regression Model in the Optimization of Virtual Practice Teaching Innovation Path of Civics and Politics Courses in Colleges and Universities.” Applied Mathematics and Nonlinear Sciences, vol. 9, no. 1, 2024, pp. 1-15. DOI:10.2478/amns-2024-1638. ​
# Week 10: 10/22
## General Body Meeting
- Presented our Discussion Forum sub-team presentation #2: https://gtvault.sharepoint.com/:p:/s/VIPData-DrivenEducationTeam-DiscussionForums/EXkgbQKYwuBJmoGFjZ4Z0OQBgeT7IkgbfvcCad9ZhHKpdQ?e=0CMhN4
- Listened to Just-in-time Intervention, Assessment Quality, and AI sub-teams deliver their respective presentations
## Sub-Team Meeting:
- Machine learning provided updates on their end: working on refining model to identify key factors influencing student grades. I will begin working with Harikesh to translate his findings into visualizations
- Data science provided our updates: initial BERT model is completed; it can classify comments well but training time needs to be decreased.
## TODO:
- Research best practices for designing instructor-facing dashboards in preperation for collaboration with ML team
# Week 11: 10/29
## General Body Meeting
- Out sick, unable to attend lecture
## Sub-Team Meeting:
- Data science team is transitioning from BERT to DistilBERT, and Ethan ran it on the cleaned dataset with ideal performance. Next steps are to run it on the OG dataset
## TODO:
- Meet with Harikesh to discuss translating his work into meaningful visualizations for our instructor dashboard
# Week 12: 11/5
## General Body Meeting
- Listened to a presentation by Dr. Yilmaz Soylu the topic of AI ethics, delving into best practices to prevent algorithmic bias
## Sub-Team Meeting:
- Harikesh and I updated our team on next steps for combining DS and ML's work for the react dashboard; heard feedback from Zilu on current ideas
## TODO:
- Finalize drafted visualizations and suggestions for our instructor react dashboard based on discussion with Harikesh- correlation between sentiment, topic, activity rates, and student performance- and send to Zilu for review
# Week 13: 11/12
## General Body Meeting
- Listened to presentation by special guest, Dr. Stephen Harmon (executive director of C21U), who led a discussion on the evolution of educational technologies. He prompted the class to reflect on how technology has shaped our experiences in education.
## Sub-Team Meeting:
- Pushed sub-team meeting to following Tuesday (11/18) to do dry-run of our presentation
- DS and ML teams are going to combine their data by running the DistilBERT model on Harikesh's CS 1301 comments. The updated CSV will be the basis of my final dashboard drafts for Zilu
## TODO:
- Complete literature review slides for sub-team presentation #3 by our dry-run on tuesday 11/18
- Article for lit review: AlZoubi, D., and E. Baran. “A Closer Look at Instructor Use and Sensemaking Processes of Analytics Dashboards: Past, Present, and Future”. Journal of Learning Analytics, vol. 11, no. 2, Apr. 2024, pp. 1-22, https://learning-analytics.info/index.php/JLA/article/view/7961
# Week 14: 11/19
## General Body Meeting
- Presented our Discussion Forum sub-team presentation #3: https://gtvault.sharepoint.com/:p:/s/VIPData-DrivenEducationTeam-DiscussionForums/EdNonKMkgmVPki-cRf7S4EABTysrEmCNUZwFquMbBphQqw?e=nQK3oc
-  Listened to Just-in-time Intervention, Assessment Quality, and AI sub-teams deliver their respective final presentations
## Sub-Team Meeting:
- No sub-team meeting. Happy end of semester!
## TODO:
- Finish updating VIP Notebook before Final deadline (Monday 11/24)
- Submit final peer evaluations before deadline (Wednesday 11/26)
