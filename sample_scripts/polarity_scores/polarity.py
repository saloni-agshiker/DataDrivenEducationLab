import pandas as pd
import numpy as np
import os
from pathlib import Path
from textblob import TextBlob

data_dir = os.path.join(Path(os.getcwd()).parent.parent, '.data')

# Get Comment Data
pdf_comments = pd.read_csv(os.path.join(data_dir, 'Forum comment ferpa.csv'))

#create columns for polarity and subjectivity
pdf_comments['polarity'] = np.nan
pdf_comments['subjectivity'] = np.nan

#do sentiment analysis on each sentence and record its polarity and subjectiviy
for i in range(pdf_comments.body.size):
    wiki = TextBlob(pdf_comments.body[i])
    pdf_comments['polarity'][i] = wiki.sentiment.polarity
    pdf_comments['subjectivity'][i] = wiki.sentiment.subjectivity
