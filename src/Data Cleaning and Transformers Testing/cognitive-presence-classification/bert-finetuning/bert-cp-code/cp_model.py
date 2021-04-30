from abc import ABC

import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer, BertModel, AdamW, get_linear_schedule_with_warmup
from sklearn.model_selection import train_test_split
import pytorch_lightning as pl
from pytorch_lightning.metrics.functional.classification import auroc, precision, recall
from pytorch_lightning.metrics import ConfusionMatrix, AUROC, F1

import seaborn as sns
from pylab import rcParams
import matplotlib.pyplot as plt
from matplotlib import rc

# Initial parameters
LABEL_COLUMNS = 'CP Code'
BERT_MODEL_NAME = "bert-base-uncased"
tokenizer = BertTokenizer.from_pretrained(BERT_MODEL_NAME)

RANDOM_SEED = 42
np.random.seed(RANDOM_SEED)
torch.manual_seed(RANDOM_SEED)


class CognitivePresenceDataset(Dataset):
    """
    Prepares the dataset for loading into Pytorch lightning module
    """

    def __init__(self, data: pd.DataFrame, tokenizer: BertTokenizer, max_token_len: int = 128):

        self.data = data
        self.tokenizer = tokenizer
        self.max_token_len = max_token_len

    def __len__(self):
        return len(self.data)

    def __getitem__(self, index: int):

        data_row = self.data.iloc[index]

        comment_text = data_row.body
        labels = data_row[LABEL_COLUMNS]

        encoding = tokenizer.encode_plus(
            comment_text,
            add_special_tokens=True,
            max_length=self.max_token_len,
            return_token_type_ids=False,
            padding="max_length",
            truncation=True,
            return_attention_mask=True,
            return_tensors="pt"
        )

        return dict(
            comment_text=comment_text,
            input_ids=encoding["input_ids"].flatten(),
            attention_mask=encoding["attention_mask"].flatten(),
            # labels=torch.IntTensor(labels) #TODO,
            labels=labels
        )


class CognitivePresenceDataModule(pl.LightningDataModule):
    """
    Prepares dataset for training with BERT
    """

    def __init__(self, train_df, test_df, tokenizer=tokenizer, batch_size=8, max_token_len=128):
        super().__init__()
        self.train_df = train_df
        self.test_df = test_df
        self.tokenizer = tokenizer
        self.batch_size = batch_size
        self.max_token_len = max_token_len

    def setup(self):
        self.train_dataset = CognitivePresenceDataset(
            self.train_df,
            self.tokenizer,
            self.max_token_len
        )

        self.test_dataset = CognitivePresenceDataset(
            self.test_df,
            self.tokenizer,
            self.max_token_len
        )

    def train_dataloader(self):
        return DataLoader(
            self.train_dataset,
            batch_size=self.batch_size,
            shuffle=True,
            num_workers=4
        )

    def val_dataloader(self):
        return DataLoader(self.test_dataset, batch_size=1, num_workers=4)

    def test_dataloader(self):
        return DataLoader(self.test_dataset, batch_size=1, num_workers=4)


class CognitivePresenceTagger(pl.LightningModule):
    """
    Model trainer: BERT fine-tuning
    """

    def __init__(self, n_classes: int, steps_per_epoch=None, n_epochs=None):
        super().__init__()

        self.bert = BertModel.from_pretrained(BERT_MODEL_NAME, return_dict=True)
        self.classifier = nn.Linear(self.bert.config.hidden_size, n_classes)
        self.steps_per_epoch = steps_per_epoch
        self.n_epochs = n_epochs
        # self.criterion = nn.BCELoss() TODO
        self.criterion = nn.CrossEntropyLoss()
        self.auroc = AUROC(num_classes=5)

    def forward(self, input_ids, attention_mask, labels=None):
        output = self.bert(input_ids, attention_mask=attention_mask)
        output = self.classifier(output.pooler_output)
        # output = nn.LogSoftmax(output, dim=1)
        # output = torch.sigmoid(output) TODO
        loss = 0
        if labels is not None:
            # loss = self.criterion(output, labels.long()) #TODO
            loss = self.criterion(output, labels)
        return loss, output

    def training_step(self, batch, batch_idx):
        input_ids = batch["input_ids"]
        attention_mask = batch["attention_mask"]
        labels = batch["labels"]
        loss, outputs = self.__call__(input_ids, attention_mask, labels)

        self.log("train_loss", loss, prog_bar=True, logger=True)

        return {"loss": loss, "predictions": outputs, "labels": labels}

    def validation_step(self, batch, batch_idx):
        input_ids = batch["input_ids"]
        attention_mask = batch["attention_mask"]
        labels = batch["labels"]
        loss, outputs = self.__call__(input_ids, attention_mask, labels)

        self.log("val_loss", loss, prog_bar=True, logger=True)

        return loss

    def test_step(self, batch, batch_idx):
        input_ids = batch["input_ids"]
        attention_mask = batch["attention_mask"]
        labels = batch["labels"]
        loss, outputs = self.__call__(input_ids, attention_mask, labels)

        self.log("test_loss", loss, prog_bar=True, logger=True)
        self.log("predictions", outputs, prog_bar=True, logger=True)

        return loss, outputs

    def training_epoch_end(self, outputs):

        labels = []
        predictions = []

        for output in outputs:
            for out_labels in output["labels"].detach().cpu():
                labels.append(out_labels)

            for out_predictions in output["predictions"].detach().cpu():
                predictions.append(out_predictions)

        labels = torch.stack(labels)
        predictions = torch.stack(predictions)

    def configure_optimizers(self):

        optimizer = AdamW(self.parameters(), lr=2e-5)

        warmup_steps = self.steps_per_epoch // 3
        total_steps =  self.steps_per_epoch * self.n_epochs - warmup_steps

        scheduler = get_linear_schedule_with_warmup(
            optimizer,
            warmup_steps,
            total_steps
        )

        return [optimizer], [scheduler]
