"""
Source: Structure matters: Adoption of structured classification
approach in the context of cognitive presence classification
(Waters et. al)

Features 

1. Entity Count
is the number of entities within a post as found by the Stanford CoreNLP Named
Entity Recognition (NER) tool. The rationale behind using this feature is that
discussion participants posting exploration comments are more likely to
introduce a number of entities through their exploration of ideas.

2. First Post and Last Post
are boolean features that are set to true when a post is the first and last in
a discussion respectively. This feature represents the implicit structure of
the discussion, where it is intuitive to believe that most Triggering phases
occur at the start of a discussion.

3. Comment Depth
is the number assigned to a post based on its chronological order within a
discussion thread.

4. Post Similarity of the previous and next post in a discussion
is calculated by obtaining the cosine similarity of two tf-idf weighted
vectors. the post similarity features assist in incorporating the local
structure of the discussions, where it is expected that some phases of
cognitive presence differ significantly from one another, and some only
slightly.

5. word and sentence counts
capture the number of words and sentences within a particular post. it is
expected that when a discussion is reaching the integration and resolution
phases, there is a lot more content due to the synthesis and integration of
ideas.

6. number of replies to a post
which provides the classifier with the in- tuition that the earlier
phases of cognitive presence (triggering and explo- ration) will have
more replies than the later phases. additionally, this feature also
helps model the implicit structure within a discussion, giving the clas-
sifier an indication of how large the discussion is. the rationale
behind this feature is that the triggering and exploration phases would
generally have more replies than the integration and resolution phases.

Sources:
    https://nlp.stanford.edu/software/CRF-NER.html#Download
        Extensions: Packages by others using Stanford NER
        Stanford Tagger

"""
import nltk
from nltk.tag import StanfordNERTagger
from nltk.tokenize import word_tokenize

class DiscussionContextFeature():
    def __init__(self, ner_classification_path, ner_jar_path, nltk_path):
        nltk.data.path = [nltk_path]
        self.ner_tagger = StanfordNERTagger(ner_classification_path, ner_jar_path, encoding='utf-8')

        ''' Example
        text = 'While in France, Christine Lagarde discussed short-term stimulus efforts in a recent interview with the Wall Street Journal.'

        tokenized_text = word_tokenize(text)
        classified_text = self.ner_tagger.tag(tokenized_text)

        print(classified_text)
        '''

    def extract(self, data):
        '''
        extract discussion context features from the data and store in a csv
        :param model: the data
        '''
        pass
    
    def entity_count(self, data):
        pass
