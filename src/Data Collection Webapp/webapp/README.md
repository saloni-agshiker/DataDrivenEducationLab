# Cognitive presence comment classification web app

## Goal

The goal of this web app is to accelerate the data collection process for the discussion forums subteam. Follow the instructions below to first install source code, dependencies, and run the application.

## Source code installation

Simply download the directory titled webapp which has the following structure and save in a convenient location.

- webapp
    - static
        - styles.css
    - templates
        - index.html
    - app.py
    - input_file.csv (or whatever file name)
    - README.md
    - requirements.txt

After installing, open the command line (Terminal for Mac or Command Prompt for Windows) and navigate to the webapp location using cd. An example is provided below.

```cd C:/Users/djons/School/GT/Fall2020/VIP/webapp```

## Dependencies

Under the assumption that python 3 is installed and recognized as an environment variable through the command line, the dependency installation can be completed by executing the following command inside of the web app directory.

```pip install -r requirements.txt```

Or

```pip3 install -r requirements.txt```

If python is not installed on your system, (download the latest version of python)[https://www.python.org/downloads/] (python 3.6 or higher) and make sure to add python to your path, since the app will be started using the command line. Once python is installed verify that python is recognized as an environment variable by opening the command line and executing ```python -V``` or ```python3 -V```. The resulting value should be the same as the version downloaded from python's website. If an error occurs and you cannot resolve the problem, please send me an email at djonson@gatech.edu, otherwise download the dependencies using the commands above.

## Starting the app

- Step 1:
    - Copy and paste the input csv file that has columns labeled columns thread_id, user_id, title, and body into the webapp directory

- Step 2:
    - Start the application by executing the following command

        ```python app.py "input_file.csv" "output_file.csv"```

        Or

        ```python3 app.py "input_file.csv" "output_file.csv"```

- Step 3:
    - Open Google Chrome or Firefox and access the local server hosted at http://127.0.0.1:5000/

- Step 4:
    - Begin using the app, it's pretty intuitive :)

- Step 5:
    - Once the data labeling is complete, a file named output_file.csv (or whatever file name with a .csv extension) should store the labeled data with any associated feedback.
    - Let me know if you have any issues and I'll be happy to help. Thanks!
