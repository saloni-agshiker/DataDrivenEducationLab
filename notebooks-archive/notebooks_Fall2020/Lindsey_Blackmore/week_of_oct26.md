## Week In Review ##
 * attempted onboarding of the Engageli platform
   * ran into a lot of issues with lag, audio, and chat functionality
   * seems like a promising alternative to Zoom and BluJeans once all the bugs
     are worked out
 * attempted to boostrap the existing csv files into relational tables
   * ran into issues with the formatting of the csv files or the size of them
   * John offered to look over the issues as he has experience with data
     engineering
 * decided to create mini versions of the comments and threads tables by manual
   insert
   * sent the sql scripts to Sambhav so he can begin attempting to integrate it
     into the web app with sqlalchemy
 * volunteered to attempt adding React components into the web app
   * after playing around with the code, I feel there exists an issue with the
     current app structure
   * since Flask is running everything, it will be difficult to modify the front
     end
   * follow this tutorial https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project
     to create a React front end and Flask back end
