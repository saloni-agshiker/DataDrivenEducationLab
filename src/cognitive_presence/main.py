import argparse
import yaml
import os
from pathlib import Path
import pandas as pd
from feature_extraction.discussion_context_features import DiscussionContextFeature

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

    sheet1 = pd.read_excel('./.data/data.xlsx', sheet_name=0)
    sheet2 = pd.read_excel('./.data/data.xlsx', sheet_name=1)
    sheet3 = pd.read_excel('./.data/data.xlsx', sheet_name=2)
    sheet4 = pd.read_excel('./.data/data.xlsx', sheet_name=3)
    Path("./.data/TAACO/sheet1").mkdir(parents=True, exist_ok=True)
    Path("./.data/TAACO/sheet3").mkdir(parents=True, exist_ok=True)
    Path("./.data/TAACO/sheet4").mkdir(parents=True, exist_ok=True)

#    os.mkdir('./.data/TAACO')
#    os.mkdir('./.data/TAACO/sheet1')
#    os.mkdir('./.data/TAACO/sheet3')
#    os.mkdir('./.data/TAACO/sheet4')
    

#    print(sheet1.columns)
#    print(sheet2.columns)
#    print(sheet3.columns)
#    print(sheet4.columns)

    
    for sheet_name, sheet in [("sheet1", sheet1), ("sheet3", sheet3), ("sheet4", sheet4)]:
        sheet['Submission HTML Removed'] = sheet['Submission HTML Removed'].fillna('')
        for i, comment in enumerate(sheet['Submission HTML Removed'].tolist()):
            f = open('./.data/TAACO/' + sheet_name + '/' + str(i + 1) + ".txt","w+")
            f.write(comment)
            f.close()

#    dcf = DiscussionContextFeature(NER_CLASSIFICATION_FILEPATH, NER_JAR_FILEPATH, NLTK_DATA_FILEPATH)
#    dcf.extract(data)


if __name__ == '__main__':
    main()
