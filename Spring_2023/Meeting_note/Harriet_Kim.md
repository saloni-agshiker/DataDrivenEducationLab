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
