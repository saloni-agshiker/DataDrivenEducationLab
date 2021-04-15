import argparse
import yaml
import os
from pathlib import Path
import pandas as pd
from feature_extraction.discussion_context_features import DiscussionContextFeature
from feature_extraction.taaco import TAACO

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

    


if __name__ == '__main__':
    main()
