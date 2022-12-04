# VIP Meeting Note For Fall 22

# 1st Week Meeting

- Each team members has introduced themselves and talked about what we covered on the last semester.
- For this semester, data science team will process on Aspect-based Sentimental Analysis. Web-dev team will develop a dashboard to show handful and useful information for discussion medium.
- [x]  ~~Find multiple implementations of Aspect-based sentiment analysis.~~
- [x]  Fill the data form.

# 2nd Week Meeting

- Found 3 GitHub source and 1 Kaggle article.
- Discussed what part of Aspect-based Sentimental Analysis can be helpful.
- The difference between Sentimental Analysis and ABSA is that ABAS is advanced version of SA, and it analyzed text data based on sentiment in multiple aspects.
- Alternative of the first presentation would be needed.
- [x]  Find and test 1 implementation of Aspect-based sentiment analysis on our data.

# 3rd Week Meeting

- We have to put aspects as an input. How do we choose words for aspects? - unsolved
- I was working to implement ABSA using our text data, but have a problem that our text data is not work for no reason. Needs to search deeply on the original code algorithm.
- Should discuss to divide presentation portion with Malav and Harriet
- [x]  Work with Harriet, reflect on comparative advantage, and divide the implementation bits
- [x]  Write code adapted to our Piazza data

# 4th Week Meeting

- Presentation 1: what we did in the last semester, and what is the our goal for this semester.
- The code problem solved by preprocessing our sample text data. (eliminating dots and array indexing error)
- Dividing our implementation bits with Harriet.
- After our implementation for ABSA properly works, we focus on pipelining to the dashboard on which web-dev team is working.
- Need to complete data preprocessing for our data when we get input data from a CSV file.
- [x]  Complete preprocessing for text data for Aspect-based sentiment.

# 5th Week Meeting

- Feedbacks for the first presentation
    - Dr. Lee mentioned focussed on prior work and she said what the new ideas are and how you plan to achieve them.
    - In the next presentation, keep in mind how the previous work is relevant to what we are doing now and how we are planning to add some current work.
    - She recommended adding our new ideas are and how we will achieve them in this semester.

- [x]  For now, try to run with small partial text(index 400 to 420) because it takes a lot of time to run the whole data.
- [x]  Visualize the results of Aspect Based Sentiment Analysis using

# 6th Week Meeting

- Visualized the result of ABSA in circle shape graph.
- Malav and I tried to run the ABSA model with the whole data.
    - It is stuck on GPU out of memory. → patch size is too big? so reduce the patch size.
- Web-dev team is creating graphs in the dashboard webpage.
- [x]  Get a solution to run the whole data for ABSA and try to apply it

# 7th Week Meeting

- Figured out the issue with memory is related to pre-processing.
    - too many token words were in the memory. We need to cut it off more. → try to use garbage collector
- Ideally solved the problem related out of memory. → but we have to purchase Google co-lab pro version to get extra memory, also it is much faster to train the model.
- Another problem showed up. The result of ABSA is unreliable. I think we need to work more on the ABSA pre-processing part in the future.
- [x]  Understand pre-processing and develop it.

# 8th Week Meeting

- The output would be CSV files.
    - topic distribution for Topic Modeling.
    - ABSA sentiment distribution
    - Actually not sure about the Cognitive presence output
- 2nd Presentation is upcoming.
    - Focusing on ABSA → what challenges we have been through and we have now.
    - Also get ready for graphs of ABSA.
- Still working on the pre-processing from the ABSA → creating stop_words and lemmatizing (reducing token words)
- [x]  Keep working on the pre-processing.
- [x]  Prepare 2nd Presentation.
- [x]  Create a CSV file for ABSA to give to web-dev team

# 9th Week Meeting

- I made for output CSV file as a demo to give data to web-dev team. It describes the ABSA output data to dashboard by a graph.
- The CSV file for ABSA would be used for drawing new graph in dashboard.
    - I just made the simple output form like sentiment distribution by aspects
    - Got feedback from members → make sentiment score distributions
- Our team has made goals for the remaining 4 weeks.
    - We are going to make a document for our research.
- [x]  Make a CSV file for sentiment score distribution by topics.

# 10th Week Meeting

- Template for document
    - This is not only team report for what we have done until now, but also guidance for new members for the next semester.
- We have a plan to send Piazza data to our model directly in real time.
- [x]  Find a way to get data into model directly from the Piazza API.
- [x]  Make a template for document - Harriet

# 11th Week Meeting

- Pratik will give us feedback for document.
- To access Piazza data in our view, we would need Piazza credential ID and password.
    - Malav asked to Dr. Jonna.
- If web-dev team needs more data, they will ask us to work on output.
- [x]  Add bullet points and resources.

# 12th Week Meeting

- I think we are not able to access to the Piazza data in real time.
    - because we need to be a TA for that class to access the Piazza discussion text data.
    - However, we can update the model  that in manually.
    - For the future work, when we get the new data, we should train the model again like a stack to increase the accuracy of model. (We made a pickle function to do this.) or we can just predict the output.
- got feedback from Pratik (document)
- We need to buy a co-lab pro subscription.
- [x]  Fill out how I implemented Topic modeling in document

# 13th Week Meeting

- Final Presentation : what we have done for this semester, what can be the future work.
- Need to wrap up documentation - think about when we first in this team, what we are good to know. → I think mostly the progress, why we need this model and what our next step is.
- [x]  wrap up documentation
- [x]  Prepare the last presentation