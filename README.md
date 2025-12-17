# Data Driven Education Lab 📈

## 🤝 Contributers

Saloni Agshiker, Ethan Lu, Zilu Zhu, Diya Jain, Harikesh Tambareni, Clara Murray | GT VIP Research Program 2025 - 2026

***

## 🚀 Inspiration & Goals

Georgia Tech utilizes a variety of digital platforms to foster education from our learning management systems (LMS) to Piazza discussion forums to MOOC platforms such as Coursera and edX. These platforms generate myriad data points about the trajectory of learning, ranging from content and video consumption to forum participation to assessments of learning to background characteristics of the learners. However, much of this information goes unused both in terms of research for understanding learners and for improving instruction.

This team focuses on the effects that data are having in shaping education, on how new, rich, educational data sources can be used to improve content, instruction, and learning. Specifically, we look to the vast array of data that can be collected around educational opportunities at Georgia Tech and how those data shape educational practice.

***

## 🎯 What it Does

We built two NLP models using Pandas and Gensim: (1) **Term Frequency–Inverse Document Frequency (TF-IDF)**, which represents documents as numerical vectors by weighting words based on their importance within a document relative to the full corpus, and (2) **Latent Dirichlet Allocation (LDA)**, a probabilistic topic-modeling algorithm that identifies latent topics across a collection of documents. A corpus of approximately 40,000 discussion-forum comments from Georgia Tech CS 1301 and ISYE 6501 courses was processed through the TF-IDF model to identify high-importance terms, and through the LDA model to uncover common thematic structures across the comments.

We developed a **sentiment analysis model** using DistilBERT, a lightweight, distilled version of BERT, to classify approximately 40,000 discussion-forum comments as positive, negative, or neutral. DistilBERT was selected over the standard BERT architecture due to its faster training time and improved performance on smaller, labeled datasets, while still retaining strong contextual language understanding. The model was trained on a manually annotated subset of 1,000 comments, with a 70/15/15 train–validation–test split. After training, we evaluated model performance using a confusion matrix to compute key metrics including accuracy, precision, and F1 scores, which helped identify class imbalance effects and areas for further fine-tuning. 

***

## 📽 Demo


