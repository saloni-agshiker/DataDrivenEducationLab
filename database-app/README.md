# Flask Web App #

This Flask app uses the data from the flair model. To use the application, you will need to follow the following steps:

## Database ## 
The application uses SQLite3 to configure and store the data. The database should be placed in this folder ("database-app") and be named "data.db". The table should have the following attributes:
- table should be named "FLAIR"
- columns should be:
    - "Week_No", INTEGER type
    - "Date-Time", TEXT type
    - "Text", TEXT type
    - "Sentiment_with_flair", TEXT type
    - "Polarity_Score", REAL type
    - "Subjectivity_Score", REAL type

## Running the App ##
Make sure to have python3 installed. Then, navigate to the database-app folder and then run `. venv/bin/activate` to activate the virtual environment (venv). The venv should contain all of the external Python libraries installed, but if that doesn't work, then use `pip` to install matplotlib, Flask, and SQLAlchemy. After all the dependencies are installed, run `app.py` in Terminal to start the Flask server. It should start a Flask instance and point you to a localhost server (probably http://127.0.0.1:5000/).