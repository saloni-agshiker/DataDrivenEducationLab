# Import and download stopwords from NLTK.
from nltk.corpus import stopwords
from nltk import download
download('stopwords')  # Download stopwords list.
stop_words = stopwords.words('english')

def preprocess(sentence):
    return [w for w in sentence.lower().split() if w not in stop_words]


# Set up gensim
import gensim.downloader as api
model = api.load('word2vec-google-news-300')


# Get data
import pandas as pd
import numpy as np
import os
data_dir = '.data'

pdf_comments = pd.read_csv(os.path.join(data_dir, 'Combined Phases.csv'))
pdf_comments['embedding'] = pdf_comments['Text'].apply(lambda x: preprocess(x))
pdf_comments = pdf_comments.drop('Text', axis=1)


# Function to split dataset
from sklearn.model_selection import train_test_split

X = pdf_comments['embedding']
y = pdf_comments['CP Score']
# Split before we impute or min_max scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.2, random_state=0)



# What is a better voting model?
def voter(n):
    return 5 - n

# Distance model
def dists(x_0, X_database, dist_func=model.wmdistance, vote=voter):
    # Get distance metric
    dists = X_database.apply(lambda x: dist_func(x, x_0))
    dists = dists.replace(np.inf, 5)


# Build knn model
def lazy_knn(n_neighbors, text, X_database, y_database, dist_func=model.wmdistance, vote=voter):
    # Get distance metric
    dists = X_database.apply(lambda x: dist_func(x, text))

    # Get top n matching classes
    top_n = dists.sort_values()[:n_neighbors]
    top_n_classes = y_database[top_n.index]

    # We can go with outright winner
    counts = top_n_classes.value_counts()

    if len(counts) == 0:
        return -1

    if len(counts) == 1:
        return counts.index[0]

    if counts.iloc[0] != counts.iloc[1]:
        return counts.index[0]

    # Voting method
    vote_values = top_n.apply(lambda x: voter(x))
    vote_values.index = top_n_classes
    election_results = vote_values.groupby(level=0).sum().sort_values(ascending=False)
    return election_results.index[0]

n_neighbors = 1
X_database = X_train
y_database = y_train
vote = voter
x_0 = X_test.values[1]

# easy test
y_0 = lazy_knn(n_neighbors, x_0, X_database, y_database)

# hard test
y_pred = [lazy_knn(n_neighbors, text, X_database, y_database) for text in X_test.values]

from sklearn import metrics
# Print the confusion matrix
print(metrics.confusion_matrix(y_test, y_pred))

# Print the precision and recall, among other metrics
print(metrics.classification_report(y_test, y_pred, digits=3))

# Cohen Kappa
print(metrics.cohen_kappa_score(y_test, y_pred))

# Explicit F1
print(metrics.f1_score(y_test, y_pred, average='weighted'))
