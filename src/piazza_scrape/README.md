# Piazza Scraping
This directory contains code used to scrape Piazza and save the results for
development of our natural language processing app.

# How-To
1. copy piazza_creds_example.py to piazza_creds.py
2. edit piazza_creds.py to include your piazza username and password
3. find which course nids you'd like to include in the data dump:
    ```
    python piazza_scrape.py list_courses
    ```
4. add the nids to piazza_creds.py
5. collect data with:
    ```
    python piazza_scrape.py save_data FILENAME
    ```
    where FILENAME is the name of the file you'd like to save the data to.
6. Share data with OneDrive to Shawn (don't use attachments)