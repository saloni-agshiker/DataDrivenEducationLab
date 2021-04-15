Set up the environment
======================

#. Create the environment from the ``environment.yml`` file:

   .. code::

      conda env create -f environment.yml

Connect to DB
=============
Data is stored in [PostgreSQL](https://www.postgresql.org/). We connect to the database through db.py using the [psycopg2](https://www.psycopg.org/) library.

#. Create a ``.credentials`` folder in ``root/``.

#. Copy and paste your credentials into ``.credentials/db_cred.txt``. It should look like this:

   .. code::

      Host: <url>
      Port: <number>
      Database: <name>
      User: <string> Password: <string>

Feature Extraction
==================

Named Entity Recognition
------------------------

Note that nltk.tokenize requires Java JDK. Ensure that the filepath to the java executable is correct in ``main.py``. An example of this is as follows:

    .. code::

        os.environ['JAVAHOME'] = '/home/david/Downloads/jdk-16/bin/java'

For additional instructions, please follow follow the [nltk documentation](http://www.nltk.org/api/nltk.tag.html#module-nltk.tag.stanford). It is likely to be necessary to convert the NER Filepath variables at the top of `main.py` to the code runs correctly.

LIWC2015
--------


TAACO
-----

Download [TAACO](https://www.linguisticanalysistools.org/taaco.html). 

Resources
=========
https://nlp.stanford.edu/software/CRF-NER.shtml#Download

http://www.nltk.org/api/nltk.tag.html#module-nltk.tag.stanford

https://pythonprogramming.net/named-entity-recognition-stanford-ner-tagger/

https://developers.google.com/machine-learning/crash-course/representation/feature-engineering

https://machinelearningmastery.com/how-to-one-hot-encode-sequence-data-in-python/

https://stackoverflow.com/questions/37292872/how-can-i-one-hot-encode-in-python

