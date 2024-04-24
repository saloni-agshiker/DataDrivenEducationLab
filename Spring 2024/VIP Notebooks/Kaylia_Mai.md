# Week 1

### In-class / Accomplished:
* Introductions between new team members
* Introduce new members to GitHub, get acquainted with current GitHub resources.

## TODO:
* Decide between Ed and Piazza data. Previously used Piazza data and looked into Ed 3rd party software, but was unable to find official or good 3rd party software for Ed
* Look more into accessing Ed statistics and APIs
* Read journal club article and complete slide deck
    * plan is to practice at next team meeting
* FERPA and IRB training

# Week 2

### In-class / Accomplished:
* Learned about different subteams, which is a review
    * decided I wanted to continue with Discussion Forums
* Met with subteams, decided subteam meetings will be Mondays @5pm
* Met new members for Discussion Forums, will be working with Diya

## TODO:
* Go over Journal Club presentation during the subteam meeting.
* Complete and practice journal club slides
* Get access to data

# Week 3

### In-class / Accomplished:
* Met with other subteam members in class and talked about previous accomplishments
    * I'm still not too familiar with the current codebase, so would need to review that
* Presented journal club presentation, and I covered the summary and analytics of the article

## TODO:
* Put together goals for this semester for webdev team, working with Diya
* Prepare for 1st subteam presentation

# Week 4 

### In-class / Accomplished:
* No sub-team meeting this week due to medical emergency
* Nihaar sent the subteam presentation 1 slides and I was assigned to work on webdev with Diya, it is very similar to the last subteam presentation from last semester

## TODO:
* Finish my part of the presentation, catch up Diya on what webdev team has been doing and help her with her slides as well
* Finalize/outline goals for the semester for webdev team, planning on following the TA feedback from last semester
  
# Week 5

### In-class / Accomplished:
* Finished a long practice runthrough to of the presentation, which went overtime
    * Need to cut content and speak quicker
* Decided to use GitHub to add and check off tasks to do, so that we can stay on track

## TODO: 
* Talk to Diya about webdev team, get her caught up on the current progress from previous semsters
* Talk with Nihaar about next steps for subteam

# Week 6

### In-class / Accomplished:
* Practiced with presentation again, have a pretty good idea of flow now
* Spoke more about interview results and what we need to do for the semester
    * need to start it small and simple so that it will definitely get done

## TODO: 
* Look into clear action items for the webdev team
    * A lot of previous feedback would need some sort of integration, such as with mail to send email reminders about unanswered posts. Could easily become very complicated
    * Research on feasibility for goals
* Review codebase and figure out how it currently works, so that it will be easier to build off of
      
# Week 7

### In-class / Accomplished:
* Decided to use Piazza data some more because Ed is hard to find a good 3rd party API for
    * need to do research with Diya on feasibility of data usage
* Tentatively made action items about unanswered posts - reminders if they go unanswered as well as manual exclusion from the dataset since some posts are purposefully unanswered

## TODO: 
* Need to talk to data team to get a good model
* Need to talk to Diya to get her up to speed with webdev, as well as actually listing out our goals on the GitHub

# Week 8

### In-class / Accomplished:
* Guest lecturer in class today about software development and accessibility
    * concerns about legal standards in software design
    * software devlopment process of development, deployment, testing, and improvement
* Worked with Diya and added action items for webdev subteam
* Reviewed TA feedback to narrow down goals for the rest of the semester

## TODO:
* Understand code of the dashboard
    * Last semester there was talk about hardcoded values and how the Dashboard is not yet a functional product - look into that
    * Figure out how data is getting integrated with Dashboard visuals
* Narrow down todos for rest of semester

# Week 9 / Working Day

### Working day / Accomplished:
* Met with Diya during the working day to work on action items, had many issues with dependencies and local build
    * Diya and I are both relatively inexperienced with webdev, so need time to get used to the code and js before moving forwards
* Built Dashboard locally using Ubuntu, updated various node-modules which were out of date and causing dependency issues
    * Discovered a lot of hardcoded values / data, which is why Dashboard is non-functinoal for parsing new data
    * wrote some preliminary code about excluding posts that instructors do not want to answer on Teacher tab, but needs work
* Talked with Nihaar about subteam presentation and webdev goals for the semester
    * Improve webdev codebase to have less hardcoded values

## TODO:
* Look into more dataset data and how to integrate it
    * contact Nihaar about new data and how to integrate with old data on existing dashboard
    * work will Data subteam on how we will get data to integrate it into Dashboard
* Prepare subteam presentation for next week's class, brief Diya on webdev accomplishments and tasks
    * Figure out building the dashboard locally and help Diya with it
    * Write preliminary code for action items, doesn't necessarily need to work but should have the framework done

# Week 10

### In-class / Accomplished:
* Subteam presentation in subteam meeting, went over the code that we developed and what issues webdev team is currently facing
    * During the presentation, I focused on the code that we are currently developing and how that integrates with existing code
    * feedback is that we need to talk faster and be more brief about code
* no other major work until after Spring Break

## TODO:
* Diya's local build is still broken, so I need to help her get the Dashboard running on her device
* Restructure action items
    * previous action items about new features for Teacher tab are lower priority than fixing the hardcoded data
    * need to prioritize dynamic data reading, therefore need to work more closely with Data team to figure out what data we are getting and in what format
* practice for the subteam presentation

# Week 12

### In-class / Accomplished:
* worked with Diya on making a timeline for todos for the rest of the semester. Detailed below in order of priority:
    * get Data from Data team and dynamically read it into the graphs displayed on Dashboard
    * experiment with different display types for most effective presentation of data
        * other frontend experimental work about Dashboard organization
    * AI team is making some sort of data too - figure out what they are doing
    * Finish debugging preliminary code that we made before spring break

## TODO:
* Replace hardcoded data on the dashboard with dynamic data reading
    * Identify all places where data is hardcoded so that we won't have loose ends after trying to replace data
    * Make sure new data from Data team is not missing anything (needs data for both Python and AI course)
* Look into how graphs are currently integrated into the dashboard - I believe it might be using the pandas library but more research is needed

# Week 13

### In-class / Accomplished:
* Too many unexpected errors with the code that we are developing
    * Not sure why it will not build on Diya's computer, we tried reinstalling the dependencies from scratch
    * updated some documentation to reflect the issues we faced and how to resolve them, hopefully will not run into it again in future semesters
* Since action items were moved around last week, some confusion between subteams on what we need to work on next
    * waiting on Data team to give us their results so that we can import it into the Dashboard

## TODO:
* Work with Diya on building the Dashboard for her locally, so that I am not the only one who can see the code properly
    * Write json parsers for data, I don't think this will be difficult so it is do-able
* Figure out what Data and AI subteams are doing and how we would integrate it into the Dashboard
    * Talk with Nihaar to be more clear about goals and action items, currently is very hard to tell what we are meant to be doing since we don't even have access to the data to display

# Week 14

### In-class / Accomplished:
* Found out "live" data updates to dashboard are actually not possible due to delays on getting data / privacy concerns
    * Still need dynamic data reading for dashboard; only thing changing is that it should be reading from a downloaded report rather than an API

## TODO:
* Meet with Diya to work on Dashboard, I believe our only concrete todos are the dynamic graph development
    * This is the most important deliverable of the semester, which easily sets up webdev team for future semesters
* Talk to Nihaar about webdev last actions and what is practical within the short timeframe

# Week 15

### In-class / Accomplished:
* Created the posts graphs with dynamically updating data on the Dashboard
    * should work with any dataset in a similar format as what Data team gave us this semester
* Completed final presentation and presented it
    * main takeaway is that we got dynamic graph data working on the dashboard
    * did not finish all of the action items we planned this semester, but did finish a good portion that sets us up for next semester

## Notes for future semesters / last items:
* Figure out integration for heatmap, which apparently works independently but causes major issues when trying to integrate with Dashboard
    * Likely needs frontend overhaul for dynamic course data so that each course page is not an entirely seperate files, should probably use some sort of inheritance structure
* AI team has some sort of deliverable that webdev team should integrate, but they did not communicate with us so it is very unclear what we should be building
* Overall good work and progress this semester with a lot of webdev updates, preliminary new feature code, and dynamic code updates
