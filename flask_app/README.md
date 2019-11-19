# NLP Piazza Analysis Web App
This web app is in the beginning stages of development. The credential home page has been implemented in
templates/home.html.

## Environment Setup
1. Have Python installed.
2. Create a .txt file that when run with `pip install -r <example.txt>` will install all necessary libraries and
dependencies.

## Running Locally
Use `flask run` to run the application or if you are developing in PyCharm, press the play button located on the 
top right of the dashboard and navigate to the localhost output by the terminal.

## Tasks To Be Completed
1. save the username and password from the text input boxes to use in the piazza scrape
2. determine if the user will need to input the class id (referred to as NID in the piazza_creds file)
3. integrate the existing .py files and juypter notebook
4. using i-frames and the piazza API or other means, create a data dashboard that the application will navigate to once
proper credentials are input.

## Things to Think About
1. handling of invalid credentials
2. making this an LTI so that the credentials page becomes unnecessary and the user will be shown data when the
tool is launched

## Helpful Links
https://plot.ly/python/ (plot.ly documentation)
https://community.canvaslms.com/community/ideas/blog/2018/11/16/instui-instructure-s-style-guide-20 (style guide for
canvas)

## A Word Of Warning
The layout/structure of this application may be apt to change as the analysis is updated or as the developer sees
fit.
