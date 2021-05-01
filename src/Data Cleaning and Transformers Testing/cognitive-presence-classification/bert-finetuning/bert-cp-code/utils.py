import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
import seaborn as sns
from cleantext import clean

from lime import lime_text
from lime.lime_text import LimeTextExplainer


def preprocess(sentence):
    """
    Cleans the text string by removing stopwords, numbers, punctuation etc.
    :param sentence: The text to be cleaned
    :return: Cleaned sentence
    """
    return clean(str(sentence), extra_spaces=True, punct=True, stopwords=True, numbers=True).lower().strip()


def get_train_test(X, y, test_size=0.1, random_state=42):
    """
    Splits into training and test data

    :param X: Feature set
    :param y: Labels
    :param test_size: Fraction of data to be taken as test set
    :param random_state: seed
    :return: Train dataset, Test dataset
    """

    x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=random_state)

    # Combine train and test into single DataFrame and reset index
    train = pd.concat([x_train, y_train], axis=1)
    train.index = list(range(train.shape[0]))
    test = pd.concat([x_test, y_test], axis=1)
    test.index = list(range(test.shape[0]))

    return train, test


def explain_predictions(text, tokenizer, model):
    pass


def generate_classification_report():
    pass
