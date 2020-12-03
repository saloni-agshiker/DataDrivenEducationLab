import pandas as pd
import numpy as np
import logging, torch, os
from sklearn.model_selection import train_test_split
from fast_bert.data_cls import BertDataBunch
from fast_bert.learner_cls import BertLearner
from fast_bert.metrics import accuracy
################################################################################
#                       REQUIRED DIRECTORY STRUCTURE                           #
# - SomeFolder
#             - Combined Phases.csv
#             - labels
#                     - labels.csv (file with all possible label values on each line)
#                           - e.g. "0\n1\n2\n"
################################################################################


# Define directories for data and labels and model type
try:
    os.mkdir("data")
except FileExistsError:
    pass
DATA_PATH = "data/"
LABEL_PATH = "labels/"
PRETRAINED_MODEL = "bert-base-uncased" # can be GTP2, big bert, XLNet etc... (link to models)

combined = pd.read_csv("Combined Phases.csv")
# Uncomment to test with smaller data set
# combined = combined.head(50)

# get dependent variable X and independent variable y
X = combined["Text"]
y = combined["CP Score"]

# Create test and train data for x and y
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2020, shuffle=True)

# Combine train and test into single DataFrame and reset index
train = pd.concat([X_train, y_train], axis = 1)
train.index = list(range(train.shape[0]))
test = pd.concat([X_test, y_test], axis = 1)
test.index = list(range(test.shape[0]))

# Write to respective directories
train.to_csv(DATA_PATH + "Combined Phases Train.csv", index_label = "Index")
test.to_csv(DATA_PATH + "Combined Phases Test.csv", index_label = "Index")

# Make directories for each epoch and for test results
try:
    os.mkdir("epoch_tests")
except FileExistsError:
    pass

for e in range(4, 21, 2):
    try:
        os.mkdir(f"epoch_tests/epochs_{e}")
    except FileExistsError:
        pass
try:
    os.mkdir("test_results")
except FileExistsError:
    pass

# Create data bunch object
databunch = BertDataBunch(DATA_PATH, LABEL_PATH,
                          tokenizer=PRETRAINED_MODEL,
                          train_file='Combined Phases Train.csv',
                          val_file='Combined Phases Test.csv',
                          label_file='labels.csv',
                          text_col='Text',
                          label_col='CP Score',
                          batch_size_per_gpu=2, # Can change if computing power is available
                          max_seq_length=32, # Can change if computing power is available
                          multi_gpu=True,
                          multi_label=True, # Very important!
                          model_type='bert') # adjust as necessary for other model types

# Train and validate model for each epoch value
for e in range(4, 21, 2):
    # Initialize output directory, logger, device (cpu or cuda), and metrics
    OUTPUT_DIR = f"epoch_tests/epochs_{e}/"
    logger = logging.getLogger()
    device = torch.device("cpu")
    metrics = [{'name': 'accuracy', 'function': accuracy}]

    # Create learner object from pretrained model
    learner = BertLearner.from_pretrained_model(databunch,
                    pretrained_path=PRETRAINED_MODEL,
                    metrics=metrics,
                    device=device,
                    logger=logger,
                    output_dir=OUTPUT_DIR,
                    finetuned_wgts_path=None,
                    warmup_steps=500,
                    multi_gpu=False,
                    is_fp16=True,
                    multi_label=True,
                    logging_steps=50)

    # Uncomment if you want to search for learning rate
    # learner.lr_find(start_lr=1e-5,optimizer_type='lamb')
    try:
        1/0
        # lr = float(input("Enter learning rate value"))
    except:
        lr = 2e-2
    # learner.plot(show_lr=lr)

    learner.fit(epochs=e,
                lr=lr,
                validate=True,  # Evaluate the model after each epoch
                schedule_type="warmup_cosine",
                optimizer_type="lamb")

    learner.save_model()

    # Save predictions to test_results directory
    y_pred = learner.predict_batch([i for i in X_test.values])
    test["First Prediction"] = np.array([int(i[0][0]) for i in y_pred])
    test["Second Prediction"] = np.array([int(i[1][0]) for i in y_pred])
    test["Third Prediction"] = np.array([int(i[2][0]) for i in y_pred])
    test["Forth Prediction"] = np.array([int(i[3][0]) for i in y_pred])
    test["Fifth Prediction"] = np.array([int(i[4][0]) for i in y_pred])
    test.to_csv(f"test_results/epochs_{e}.csv",index=False)
