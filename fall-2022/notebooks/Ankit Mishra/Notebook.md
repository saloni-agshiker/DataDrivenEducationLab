Link to code: https://github.gatech.edu/C21U/vip-nlp/blob/master/Dashboard%20(Important%20Code%20Only).zip

# Week 1 (Sept 5 – 9)

> Had the first sub-team meeting.

> Introduced to all the members of the team and their roles in the subteam.

> Introduced to the project and what parts of the projects have been accomplished until last semester.

> Learnt the goals of the project team for this semester and what my role is exactly (Front-end web developer).

> My work is to use REACT in order to translate a Figma mockup of the dashboard into an actual webapp. Then connect the backend database to the dashboard to produce graphs and scores.

> Goals:
>> Learn React and start building a new prototype of dashboard locally.

# Week 2 (Sept 12 – 16)

> Looked at the Figma mock-ups for the front-end and started to learn React to produce those webpages.

> Met with Gautam and looked at the backend code for the project and looked at the different databases that needs to be connected to produce real time graphs in the front-end web page.

> Learnt grid layout in REACT and started creating the second page of the dashboard.
>> Learnt from: https://isamatov.com/react-grid-layout-tutorial/

> Goals: 
> >Make the second page of the webapp. Separate the page into different blocks just like in the Figma mockups.

# Week 3 (Sept 19 – 23)

> Made the front-end for second page of the dashboard and used grid layout in react to make the webpage look exactly like the Figma design.

> Met with Gautam to get update about his meeting with James Lohse. Gautam told us that we are all by yourselves to make this project and we need to learn everything ourselves.

> Presented the webpage in subteam meeting and got good feedback for it. 

> Goal:
>>To create and third and fourth page of the webapp and make sure that navigation between them works.

>>Learn react router to implement page navigation between second, third and fourth page.

# Week 4 (Sept 26 – 30)

> Created the third and fourth pages of the dashboard in react and made it look exactly like the Figma designs.

> Learnt routing in react and implemented it to connect the different pages of dashboard. This made it possible to navigate to other pages of the dashboard from any one page. 

>> REFERENCES

>> https://www.youtube.com/watch?v=aZGzwEjZrXc&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=22&ab_channel=TheNetNinja

>> https://www.youtube.com/watch?v=EmUa_tcSM-k&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=23&ab_channel=TheNetNinja

>> https://www.youtube.com/watch?v=EmUa_tcSM-k&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=23&ab_channel=TheNetNinja

> Goals:
>> Create slides for the subteam presentation. My slides talk about the current progress of the webdev team and I will present this during the subteam presentation.

>> Complete the peer evaluations and midterm notebook.

# Week 5 (Oct 3 - 7)

> Presented the second, third and fourth page of dashboard along with the working page navigation in the subteam meeting.

> Presented the current progress of the webdev team during the subteam presentations.

> From our subteam, Ritika was not present and Gautam presented slides on the UX part that was completed last semester.

> Completed the peer evaluations and the notebooks for midterm evaluation.

> Goals: 
>>Get the first page from Gautam and add it to the dashboard. With this, the layout of all the pages for the dashboard will be complete.

>>Replace the current react webapp/ dashboard file in github with my local webapp file so the webdev team can build on those files.

# Week 6 (Oct 10 - 14)

> Met with Gautam to get the first page to the dashboard. At first, I could not add the first page to my dashboard code. However, Gautam and I debugged it together to finally add it to the code I had.

> We formatted the first pages, added images and made the first page look exactly like the figma. 

> We added first page to the React router to ensure that we can reach other pages from the first page and vice versa.

> Goals:
>> Learn how to add graphs (piecharts, bargraphs and line graphs) to the dashboard.

# Week 7 (Oct 17 - 21) - Work Day Reflection

> Met with Gautam and Ritika to research react libraries and technologies that would help us produce the piecharts, line graphs and bar graphs. 

> Initially, we created the graphs using plotly.js library, however, it was difficult to format the chart element such as graph colors, axes labels, etc. Then, we recreated graphs using chart.js and canvas.js. We decided to use Canvas.js among the three libraries because it was easier to use and compatible with our goal of eventually connecting the graphs with database created by data science team.

> For now, we have created these graphs with dummy data.

> Goals:
>> To research more react libraries to find if there is a better library than Canvas.js. 

>> Discuss the format and information we want to put in the documentation for the future web dev team.

>> Start working on the slides for sub team presentation with Gautam and Ritika.

# Week 8 (Oct 24 - 28)

> Met with Gautam and Ritika to divide the slides.
>> Me and Gautam --> Current progress of the dashboard and comparision with Figma to show what percentage of the dashboard is done.

>> Ritika --> Challenges faced while working on the dashboard and the next steps for us.

> Presented the slides during subteam presentation on October 26.

> Completed research on the react libraries for graphing and decided with Gautam and Ritika to stick with Canvas.js library for all graphs.

> Goals 
>> Finalize all the graphs with proper formatting.

# Week 9 (Oct 31 - Nov 4)

> Finishes producing all the graphs with proper formatting that matches the figma mockups.

> Researched way to create tables efficiently. We tried HTML table and React tables and we decided to use HTML tables because of its easy implementation.

> Filled all grids in the dashboard with dummy data to make the dashboard look exactly like the Figma.

> Brainstormed ideas for documentation and planned a rough outline.

> Goals 
>> Meet with all subteam members to present the dashboard and discuss any changes that could be made. Discuss if we could replace some of the information with more useful informations.

# Week 10 (Nov 7 - 11)

> Met with data science team to discuss about the new output they produced using their ABSA research. We decided to change our current Topics page to accommodate ate this new information. The new information is about the sentiment of students which is helpful information for professors.

> Goals
>> Create a new Topics page that displays the new data.

>> Work on the progress of documentation.

# Week 11 (Nov 14 - 18)

> We created a new page for the topics page because of the new data we planned to display. Our new topics page is divided into 6 grids, each with a piechart. Each piechart has data about the student's sentiment towards a certain aspect of the class. This is useful data for the professors.

> I and Gautam worked on coding the new grid layout and created the piecharts using Canjas.js. We used dummy data for the charts.

> Made significant progress with the docuentation.

> Goals

> Work with Gautam and Ritika to connect the graphs on Topics page to the real ABSA data provided by the data science team.

# Week 12 (Nov 21 - 25) 

> Ritika worked on finalizing documentation and I and Gautam worked on making the finishing changes for the dashboard.

> Gautam and I met and searched ways to connect our graphs in Topics page to the ABSA data csv file generated by the data science team. However, despite trying several ways we found on the internet, we were not able to do that.

> So, we converted the csv file into a json file and connected the topics page to the json file and it worked. The graphs of Topics page now run on real ABSA results generated by data science team.

> We also formatted the whole dashboard like centering text, matching background colors, font sizes, etc and finalized the dashboard.

> Now we have a product we can present to instructors. The code is uploaded on github. Link to code: https://github.gatech.edu/C21U/vip-nlp/blob/master/Dashboard%20(Important%20Code%20Only).zip

> Goals
>> Finish the slides for final presentation.

>> Finish final notebook and peer evaluations.


# Week 13 (Nov 28 - 30)

> We worked on last sub-team presentation. The work was divided among us. Gautam worked on the outcomes of dashboard, Ritika worked on outcome of documentation and I worked on the reflection part (challenges, things that worked, things that could be improved and future goals).

> We did our final presentation on 30th November. I completed the peer evaluations on the same day.
