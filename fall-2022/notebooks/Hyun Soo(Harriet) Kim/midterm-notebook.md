# Sep 7 - Sep 14
## Subteam Meeting on Sep 9:
## Conversation
- Did team introduction
- Gave new members access to resources (Github, Slack, Google Drive)
- Overview of aspect-based sentiment analysis, cognitive presence, and topic modeling

## Current Status
- Read document about aspect-based sentiment analysis
- Learned basic logic/grammar for numPy

## Self-Assessment with the progress
- Understood the basic concept of the aspect-based sentiment analysis, but not sure how to modify the sample code to use in our project. Should search more examples to actually understand the code workflow.

## Next Step
- As I switched position from backend developer to data scientist, I should take a look at the work from the previous semester and understand how the codes work

# Sep 14 - Sep 21
## Subteam Meeting on Sep 16:
## Conversation
- Reflections for the journal club presentation on this Wednesday
    - Summarizing the paper and answering the given questions were fine and kept the time limit
    - It would have been better if we distributed part earlier before the presentation
- First presentation will be on 9/28
    - Could interfere with CS Career fair, so alternatives to be explored
    - Pratik to share the template by 21st, slides to be completed by 26th

## Current Status
- Created a 1-pager guide (google docs) for future members based on my understanding of sentiment analysis code from the last semester -> Explained my work to other sub-team members during the meeting
    - document link: https://docs.google.com/document/d/11WZxsoJbCR2694sgP2E1gbZkrthSQ4JhVXBWgKMWJOw/edit
- Ran the sentiment analysis model from the last semester on Google Colab

## Self-Assessment with the progress
- Nice understanding with the sentiment analysis model
- There was an error with importing the model on Google Colab -> should check if it is the problem with my set-up or if it is the problem with the code itself

## Next Step
- Test 1 implementation of Aspect-based sentiment analysis
- Complete slides for the first presentation by 26th

# Sep 21 - Sep 28
## Subteam Meeting on Sep 23:
## Conversation
- Presentation rescheduled to 5th October -> Pratik will pre-record and share
- VIP notebooks on github + Peer-evaluations coming up
- Make sure to have access to data

## Current Status
- Tested the implementation of Aspect-based sentiment analysis. Works on the source data, but doesn’t directly work on our Piazza data due to mismatching keywords

## Self-Assessment with the progress
- Great job on re-structing the example code from https://pypi.org/project/aspect-based-sentiment-analysis/
- Should look deeper into the code to check where it sources keywords

## Next Step
- Write code adapted to Piazza data if the keyword mismatch issue is sorted

# Sep 28 - Oct 5
## Subteam Meeting on Sep 30:
## Conversation
- Discussed presentation flow
    - Pratik + Malav (Intro)
    - Jisan (DS - Past)
    - Harriet (DS - This sem)
    - Gautam (UX)
    - Ankit + Ritika (Web-dev)
    - Conclusion (Pratik)

## Current Status
- Keyword mismatch issue resolved
- Received Piazza data(.csv file) into our code
- Wrote code adapted to Piazza data (tested texts from 1 sample post from the Piazza data), got result
    - Low accuracy -> accuracy is the second problem. Focus on completing the code
    - Not sure which "aspect" to use -> keywords from topic-modeling is one of the options

## Self-Assessment with the progress
- Correcting errors and substituting actual data was a good achievement

## Next Step
- Generate the .csv output for sharing with Web-dev team
- Jisan will complete preprocessing for text data for Aspect-based sentiment

# Oct 5 - Oct 12
## Subteam Meeting on Oct 7:
## Conversation
- Peer evaluation and midterm notebook due today
- Feedback on first presentation
    - The presentation went well and the flow was good. We were able to cover everything.
    - Dr. Lee mentioned that we focussed on prior work and she said what the new ideas are and how you plan to achieve them.
    - She recommended adding our new ideas are and how we will achieve them in this semester.
    - In the next presentation, keep in mind how the previous work is relevant to what we are doing now and how we are planning to add some current work.

## Current Status
- Done with Aspect-based sentiment analysis for 30 samples with 7 aspects we set
- Generated the .csv output for the result to share with Web-dev team

## Self-Assessment with the progress
- Good job on working with Aspect-based sentiment analysis
- Should think about ways to upgrade the result in some way

## Next Step
- Build pipeline to automate the process from receiveing data and generating output file
    - Run the backend scripts to update the data in the database until next week
