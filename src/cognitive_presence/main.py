import argparse
import yaml
import os
import time
from pathlib import Path
import pandas as pd
from feature_extraction.discussion_context_features import DiscussionContextFeature
from feature_extraction.taaco import TAACO
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

parser = argparse.ArgumentParser(description='Cognitive Presence')
parser.add_argument('--config', default='./config/config_default.yaml')


"""NER FILEPATHS"""
NER_CLASSIFICATION_FILEPATH = './feature_extraction/stanford-ner-4.2.0/classifiers/english.all.3class.distsim.crf.ser.gz'
NER_JAR_FILEPATH = './feature_extraction/stanford-ner-4.2.0/stanford-ner.jar'
NLTK_DATA_FILEPATH = './feature_extraction/stanford-ner-4.2.0/nltk_data'
os.environ['JAVAHOME'] = '/home/david/Downloads/jdk-16/bin/java'
""""""


def main():
    global args
    args = parser.parse_args()
    with open(args.config) as f:
        config = yaml.load(f, Loader=yaml.FullLoader)

    for key in config:
        for k, v in config[key].items():
            setattr(args, k, v)

    '''Convert csv to batch text files for TAACO consumption'''
#    taaco = TAACO('./.data/data.xlsx')
#    taaco.convert_csv_to_text()

#    dcf = DiscussionContextFeature(NER_CLASSIFICATION_FILEPATH, NER_JAR_FILEPATH, NLTK_DATA_FILEPATH)
#    dcf.extract(data)

    # load all data 
    liwc3 = pd.read_csv('./.data/LIWC2015/LIWC2015_sheet3.csv',)
    liwc4 = pd.read_csv('./.data/LIWC2015/LIWC2015_sheet4.csv')

    taaco3 = pd.read_csv('./.data/TAACO/sheet3/results3.csv')
    taaco4 = pd.read_csv('./.data/TAACO/sheet4/results4.csv')

    sheet3 = pd.read_excel('./.data/data.xlsx', sheet_name=2)
    sheet4 = pd.read_excel('./.data/data.xlsx', sheet_name=3)

    # Remove the last two rows of sheet 4, they are not data rows
    liwc3.drop(liwc3.tail(2).index, inplace=True)
    taaco3.drop(taaco3.tail(2).index, inplace=True)
    sheet3.drop(sheet3.tail(2).index, inplace=True)

    liwc4.drop(liwc4.tail(2).index, inplace=True)
    taaco4.drop(taaco4.tail(2).index, inplace=True)
    sheet4.drop(sheet4.tail(2).index, inplace=True)

    # Drop liwc source columns
    liwc3.drop(columns=['Source (A)', 'Source (B)', 'Source (C)', 'Source (D)',
        'Source (E)', 'Source (F)', 'Source (G)', 'Source (H)', 'Source (I)',
        'Source (J)', 'Source (K)', 'Source (L)', 'Source (M)'], inplace=True)
    liwc4.drop(columns=['Source (A)', 'Source (B)', 'Source (C)', 'Source (D)',
        'Source (E)', 'Source (F)', 'Source (G)', 'Source (H)', 'Source (I)',
        'Source (J)', 'Source (K)', 'Source (L)', 'Source (M)'], inplace=True)

    # Drop taaco indexing and filename columns
    taaco3.drop(columns=['0', 'Filename'], inplace=True)
    taaco4.drop(columns=['0', 'Filename'], inplace=True)

    '''
    print('liwc3', liwc3.shape, liwc3.columns)
    print('liwc4', liwc4.shape, liwc4.columns)

    print('taaco3', taaco3.shape, taaco3.columns)
    print('taaco4', taaco4.shape, taaco4.columns)

    print('sheet3', sheet3.shape, sheet3.columns)
    print('sheet4', sheet4.shape, sheet4.columns)
    print(sheet4.iloc[-2,:])
    print(sheet4.iloc[-1,:])
    '''

    # combine the data horizontally
    c3 = pd.concat([liwc3, taaco3], axis=1)
    c4 = pd.concat([liwc4, taaco4], axis=1)

    # combine the data vertically
    X = pd.concat([c3, c4], axis=0)

    # Get the labels
    ytest = pd.concat([sheet3, sheet4], axis=0)
    y = pd.concat([sheet3, sheet4], axis=0)['CP Code']


    for i, a in enumerate(y.isnull()):
        if a:
            print(i, a, y[i])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=0)

    print("Training...")
    start_training_time = time.time()
    clf = RandomForestClassifier(n_estimators=10000, max_depth=20, random_state=0)
    clf.fit(X_train, y_train)
    print("Completion Time:", time.time() - start_training_time)

    y_pred= clf.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))




if __name__ == '__main__':
    main()
