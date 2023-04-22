# Jan 23 - Jan 27
## Subteam Meeting on Jan 27:
## Conversation
- Did team introduction
- Delivered the final report from the last semester
- Divided roles for the Journal Club presentation

## Current Status
- Just onboarded and got to know the subteam members
- Answering questions from the new members

## Self-Assessment with the progress
- Explained well on what we have done in the last semester to the new members
- Not sure if we are going to upgrade the code from the last semester or try new model. Should research more options to consider with.

## Next Step
- Research on new models that we are going to work on this semester (another Topic Modeling model or any other Data Science models)

# Jan 30 - Feb 3
## Subteam Meeting on Feb 3:
## Conversation
- Reflections for the journal club presentation on this Wednesday
    - Summarizing the paper and answering the given questions were fine and kept the time limit
    - It would have been better if we had everyone before the presentation for the dry-run
- Make sure to have access to data

## Current Status
- Found some resources about Topic modeling using Guided LDA
    - https://aclanthology.org/W14-1804.pdf
    - https://www.kaggle.com/code/nvpsani/topic-modelling-using-guided-lda/notebook
- Figured out that we might need additional datasetes to improve Sentiment Analysis accuracy

## Self-Assessment with the progress
- We seem to be in the right track of finding a model to improve the accuracy of our Topic Modeling

## Next Step
- Should search more examples and documents for the Guided LDA and see if we can actually use it for our data from EdX and Piazza

# Feb 6 - Feb 10
## Subteam Meeting on Feb 10:
## Conversation
- Dr. Lee will provide EdX dataset for CS1301 class
- First presentation will be on 2/15
    - Finish slides for the first presentation by Monday at 11 p.m. so that we can get reviewed before the presentation
    - My part is introducing our work for Aspect-Based Sentiment Analysis from last semester and explain our overall semester goal for Data Science team
    - Dry run 30 mins before the presentation
- VIP notebooks on github


## Current Status
- Decided on our model; GuidedLDA and BERTopic; both of these are for Topic Modeling. We expect the result to be more accurate by setting some seed words per topic
    1. GuidedLDA(a.k.a. SeededLDA)
        - https://guidedlda.readthedocs.io/en/latest/
    2. BERTopic
        - https://github.com/MaartenGr/BERTopic
- BERTopic is probably going to be my part to implement

## Self-Assessment with the progress
- Good work so far for finding the model
- Maybe finding more models rather than those related to Topic Modeling will be helpful

## Next Step
- Look at the sample codes for BERTopic to figure out how we can apply our dataset into the model

# Feb 13 - Feb 17
## Subteam Meeting on Feb 17:
## Conversation
- Nice job with the first presentation
- Peer-evaluations coming up next week
- Emily will make the seeded topics for both CS1301 and CS6601 classes to support both GuidedLDA and Guided BERTopic
- Jisan is having trouble with importing the GuidedLDA library on Google Colab

## Current Status
- Started implementing Guided BERTopic for CS1301 class

## Self-Assessment with the progress
- It seems like making the process faster will help us to increase the quality of our result and give us chance to try more models. So I think it would be better for me to spend more time on VIP to make the process faster.

## Next Step
- Continue working on the implementation of BERTopic for our dataset. Complete the first draft by next week so that we can work on improving the model.

# Feb 20 - Feb 24
## Subteam Meeting on Feb 24:
## Conversation
- Peer evaluation and midterm notebook due today
- Shared Web-Dev team's goal with Dr.Lee
- Dr.Lee asked us if we need extra program and introduced PACE Computing resources option; we may need Google Colab Premium later, but we are good so far
    - PACE Computing resources option: https://pace.gatech.edu/participation
- Emily will try to narrow down the seeded topic to improve the quality of the model
- Jisan solved the issue with importing the library

## Current Status
- Done with the first draft of Guided BERTopic for CS1301 class and shared the result with the Data Science team members
- Had an issue because there was one row that has a non-string body, so created a new Excel file by removing that row; also shared this with the team members

## Self-Assessment with the progress
- Should start earlier to make slides from the second presentation
- Great job on the first presentation and the first draft of BERTopic model

## Next Step
- Should increase the accuracy of the model
    - Remove the irrelavent words such as "the", "are", "you" by data pre-processing
    - Narrow down the seeded topics
    - Try to adjust hyperparameters such as min_topic_size and n_gram_range

# Feb 27 - Mar 3
## Subteam Meeting on Mar 3:
## Conversation
- The seeded topics that Emily narrowed down seems to improve the accuracy of the Guided BERTopic model
- Jisan will help me out to find more appropriate seeded topics narrowed down for the model
- Rohan is going to work as a Data-Science team member
- Web-dev team is working on the dashboard UI

## Current Status
- Applied narrowed-down seeded topics
- Added pre-processing to increase the accuracy of the Guided BERTopic model
    - Added 'stopwords' downloaded from NLTK resource to remove irrelavent words
    - Converted contexts to lowercase, removed URLs/email addresses/punctuation
    - Made the model to ignore tense features

## Self-Assessment with the progress
- The improvement of the result is recognizable, so keep working in this phase would be good
- It seems like I need to contribute more on helping Emily and Rohan, as they are not very familiar of the working process

## Next Step
- Develop the seeded topic that Emily provided to fit more to the model
- Generate the result as .json file and hand to Web-dev team

# Mar 6 - Mar 10
## Subteam Meeting on Mar 10:
## Conversation
- Jisan became a new project manager
- Second presentation is next week. We divided the slides for each person. We should complete the slides by next Monday

## Current Status
- Added improved seeded topics to the model
- Generated the result as .json file and posted on our Teams channel

## Self-Assessment with the progress
- Should think about more ways to improve the model
    - One thing coming up to my mind at this point is removing numerical values and interjections in the texts

## Next Step
- Complete the presentation slides and prepare the script to share with other team members
- Start working on the Aspect-based Sentiment Analysis model. It is already there from the last semester. Try to improve the accuracy.

# Mar 13 - Mar 17
## Subteam Meeting on Mar 17:
## Conversation
- Our second presentation went well
- We shared the updated subteam goal chart
    - I will work on Aspect-based Sentiment Analysis model
    - Emily and Rohan will work on extracting data from Piazza and Ed Discussion to provide visualization for the dashboard(for the parts other than ABSA)

## Current Status
- Started reviewing ABSA code from the last semester

## Self-Assessment with the progress
- Should have a wide perspective to improve the accuracy of the model; not only review other pre-processing steps to add, but also review if there are other libraries we can utilize

## Next Step
- Explore examples of other ABSA models and see if there are features that we can apply to our model

# Mar 20 - Mar 24: Spring Break

# Mar 27 - Mar 31
## Subteam Meeting on Mar 31:
## Conversation
- Distributed the work more precisely between Data-Science team members. We are going to focus on extracting data needed for the dashboard
    - "Student" tab of the dashboard
        - post over time: CS6601(Emily)
        - post by students: CS1301, CS6601(Emily)
        - current class sentiment: CS1301, CS6601(Harriet)
        - total posts this week: CS1301, CS6601(Emily)
        - average score: CS1301, CS6601(Youngwook)
        - customized scores(CP code, frequency): CS1301(Youngwook)
        - top contributor: CS1301, CS6601(Emily)
    - "Teacher" tab of the dashboard
        - contributions by instructor: CS1301, CS6601(Emily)
        - average response time: CS6601(Rohan)
        - current unresolved posts: UNAVAILABLE
        - today’s average reply time(mins): CS6601(Rohan)
        - current unresolved posts: UNAVAILABLE
    - "Topics" tab of the dashboard(Harriet)

## Current Status
- Re-ran the ABSA model from the last semster, and encountered compatibility issue
    - Exception encountered when calling layer 'bert_abs_classifier_5'
    - Came up with the conclusion that it is not the issue with our code, it is issue of the library itself, so we might use another library for the model
- Explored examples of other ABSA models and figured out BERT-Sentiment library does similar job with our model
- Started implementing a new ABSA model with BERT-Sentiment library

## Self-Assessment with the progress
- Switching to another library was a nice transition since we don't have a lot of time, but it should have been better if I could explore deeper what was the error about with the previous library

## Next Step
- Keep implementing the ABSA model. Finish the first draft by next week

# Apr 3 - Apr 7
## Subteam Meeting on Apr 7:
## Conversation
- Each of us shared the code for extracting each data from the dataset
- It seems like we are all on the right track

## Current Status
- Done with the first draft of the ABSA model with BERT-Sentiment library
    - Generated Sentiment Analysis for both CS1301 and CS6601 classes
        - Stored the value(positive/neutral/negative) for each text in a new column named "score"
        - Calculated the current class sentiment and sentiment over time for each class
        - Set the interval of "post over time" as one week to get weekly anlysis
    - Generated Aspect-based Sentiment analysis for both CS1301 and CS6601 classes
        - Stored the value(positive/neutral/negative/not mentioned) for each text and each aspect in the new column named "aspect"
        - Set aspects based on the topics we got from the Guided BERTopic model
        - Added pre-processing of converting texts to lowercase and removing HTML tags(to look more like a human-written text), special characters, punctuations, and extra spaces
- Met with Emily individually to answer questions she has about extracting the data from the dataset

## Self-Assessment with the progress
- Did a lot of work this week. Let's do things in this phase to wrap up this semester successfully.

## Next Step
- Evaluate the accuracy of the result
- Generate visualization of the result

# Apr 10 - Apr 14
## Subteam Meeting on Apr 14:
## Conversation
- Final presentation is next week. Let's wrap up everything by Tuesday
- We divided the slides for each person. My part is presenting the result from Data-Science team this semster; especially about the result for the Guided BERTopic and the ABSA models.

## Current Status
- The accuracy of the model seems to be improved compared to the last semester. It seems like BERT-Sentiment works better to our dataset
- Generated visualization(pie chart) of the result of Aspect-based Sentiment analysis for each aspect
- Calculated the number of positives, neutrals, and negatives for each aspect, and the result seems reasonable

## Self-Assessment with the progress
- I was busy completing the model. It should have been better if I could think and try more to improve the accuracy more

## Next Step
- Generate the result as .json file and hand it to Web-dev team until today(Apr 4) so that they can have enough time to apply it on the dashboard before the final presentation
- Complete the slides for the final presentation by Monday and prepare the script
