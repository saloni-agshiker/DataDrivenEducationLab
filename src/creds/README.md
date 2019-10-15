# Creds
Creates a docker image with the python library creds installed. This allows you to connect to a database incredibly easily once your credentials have been input into creds.

# Setup
1. change directory to creds
2. copy creds_example.py to creds.py or use creds.py that I provided
3. 
3. edit creds.py to contain your credential information
4. return to this directory
5. build a new docker image:
```
docker build -t nlp_creds .
```