## Cognitive Presence Classification
***

### Overview
This folder contains code for cognitive presence classification based on discussion forums data.
The path to data files (.csv) has to be provided in the main.py file in the bert-cp-code folder.
As of now, it does 2 main things:
1. Classify comments into 1 of the 5 cognitive presence classes using BERT model
2. Generate classification report and explain predictions using LIME

### File organization
All the python module files are inside the bert-cp-code folder. There are 3 files of importance here.
1. _main.py_: All the execution happens here
2. _cp_model.py_: This contains functions for data preparation and classification as required by BERT model. 
   PyTorch Lightning framework is used.
3. _utils.py_: This contains utility functions required and called by the main function

Apart from these, there's a jupyter notebook where this code was originally written and executed.
The _**Cognitive_presence_analysis_v1.ipynb**_ file is present in the jupyter-notebooks folder. 
The results of classification and LIME explainer can be seen there.
I've removed the outputs where explicitly data from csv files was visible, but the processed intermediate 
and classification results can be seen.

### Requirements
The virtual environment for running this code can be created using the Pipfile and Pipfile.lock

If you want to run it in Google colab, the dependencies can be installed using the requirements.txt file.
Also, you'll need to create a remote connection with onedrive to access the data. 
Follow this video for instructions: https://www.youtube.com/watch?v=U6YPgARhRzA&ab_channel=BoostUpStation

### TODO
1. Make this a full-fledged package after some restructuring
2. Write the tests for all these modules and focus on test-driven development
3. Add BERT Based regression module (since this is ordinal classification)
4. The prediction and LIME Based explainer code is still present in the jupyter notebook.
Make it a proper python module.