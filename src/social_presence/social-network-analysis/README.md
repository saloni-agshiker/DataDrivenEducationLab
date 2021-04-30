## Social Presence Analysis
***

### Overview
This folder contains code for social network analysis based on discussion forums data
The path to data files (.csv) has to be provided in the main.py file in the sp-model folder.
As of now, it does 2 main things:
1. Create a graph representation of the interactions modeling users as nodes and interactions as edges
2. Plot some graphs showing the relationship between cognitive presence labels and interaction in threads


### File organization
All the relevant code is inside the sp-model folder. There are 3 files of importance here.
1. _main.py_: All the execution happens here
2. _sna_utils.py_: This contains functions for creating the graph representation called by main function
3. _plotting.py_: This will contain code for generating all the related functions plots and. 
   Right now it's done in the main.py file

### Requirements
The virtual environment for running this code can be created using the Pipfile and Pipfile.lock

### TODO
1. Once the relevant plots to be created are clear, make this a full-fledged package
2. Write the tests for all these modules and focus on test-driven development