# Classifying Reddit Posts

Our problem statement: We have discussion forum posts, some have labels, and we want to classify those without labels into buckets based on cognitive presence.

Reddit classification problem: classify posts into their subreddit

- Random forest model based on word frequency and importance of words in posts (TFIDF) (both methods worked about the same) to classify posts into one of two subreddits: https://towardsdatascience.com/how-to-build-an-engine-that-classifies-the-content-of-a-reddit-post-an-application-of-natural-6306cfe94742
- Logistic regression with TFIDF vectorization: https://www.kdnuggets.com/2019/09/reddit-post-classification.html
- Lemmatization, count vectorization, random forest: https://levelup.gitconnected.com/classifying-reddit-posts-with-natural-language-processing-and-random-forest-classifier-af2d8fa77bd3
- Lemmatization: https://www.datacamp.com/community/tutorials/stemming-lemmatization-python
  - Finding the root word of words in a sentence (ex play of playing)
- TFIDF vectorization: https://www.geeksforgeeks.org/tf-idf-model-for-page-ranking/
  - term frequency - inverse document frequency
  - tf-idf(t, d) = frequency of t in d / terms in d * log(num documents/ documents with t)







