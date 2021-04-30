import cp_model
from cp_model import CognitivePresenceDataset, CognitivePresenceDataModule, CognitivePresenceTagger
import utils
from utils import preprocess, explain_predictions, get_train_test

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import rc
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import pytorch_lightning as pl

# Path for files having cognitive labels
spring21_piazza_data = ".data/Cognitive Presence Coding Results/Spring 2021 Coding Results_Piazza.xlsx"
spring20_edx_data = ".data/Cognitive Presence Coding Results/Spring 2020 Coding Results_edX.xlsx"
fall20_edx_data = ".data/Cognitive Presence Coding Results/Fall 2020 Coding Results_edX.xlsx"

# Setting plot parameters
sns.set(style='whitegrid', palette='muted', font_scale=1.2)
HAPPY_COLORS_PALETTE = ["#01BEFE", "#FFDD00", "#FF7D00", "#FF006D", "#ADFF02", "#8F00FF"]
sns.set_palette(sns.color_palette(HAPPY_COLORS_PALETTE))

# Define directories for data and labels
DATA_PATH = "data/"
LABEL_PATH = "labels/"
OUTPUT_DIR = "v2/"

# Training parameters
LABEL_COLUMNS = 'CP Code'

N_EPOCHS = 10
BATCH_SIZE = 32


def main():

    """
    Load the dataset
    Clean the dataset
    Train test split
    Setup Data Module
    Load Model
    Train Model
    Save checkpoint

    TODO:
    Make predictions
    Model Explanations

    :return: 0
    """

    # Load cognitive presence files

    sp21p_df = pd.read_excel(spring21_piazza_data, sheet_name="a4_coding1")
    sp21p_df.rename(columns={'Submission HTML Removed': 'body'}, inplace=True)

    sp20e_df_comments = pd.read_excel(spring20_edx_data, sheet_name="Comments")
    sp20e_df_thread = pd.read_excel(spring20_edx_data, sheet_name="Thread")

    fa20e_df = pd.read_excel(fall20_edx_data, sheet_name="Coding Results")
    train_combined = pd.concat([sp20e_df_thread[['body', 'CP Code']], sp20e_df_comments[['body', 'CP Code']],
                                fa20e_df[['body', 'CP Code']], sp21p_df[['body', 'CP Code']]])

    train_combined = train_combined[~train_combined['CP Code'].isin(['1A', '1B'])].drop_duplicates()

    # Clean the dataset
    train_combined['body'] = train_combined['body'].apply(lambda x: preprocess(x))

    # Train test split
    X = train_combined["body"]
    y = train_combined["CP Code"]

    train, test = utils.get_train_test(X, y, test_size=0.1, random_state=42)

    # Setup data module
    data_module = CognitivePresenceDataModule(train, test, batch_size=BATCH_SIZE)
    data_module.setup()

    # Model initialization
    model = CognitivePresenceTagger(
        n_classes=5,
        steps_per_epoch=len(train) // BATCH_SIZE,
        n_epochs=N_EPOCHS
    )

    # Train the model
    trainer = pl.Trainer(max_epochs=N_EPOCHS, gpus=1, progress_bar_refresh_rate=30)
    trainer.fit(model, data_module)

    pred = trainer.test()

    # Save checkpoint
    trainer.save_checkpoint("last-checkpoint.ckpt")

    return


if __name__ == '__main__':
    main()
