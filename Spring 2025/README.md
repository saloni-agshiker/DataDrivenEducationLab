# Discussion Forum 2025 Srping Notebook

This folder contains the work done in 2025 Spring semester. See files folder for the codes and literature reviews

## Data Science

### Exploratory Data Analysis

- **`eda.ipynb`**  
  Performs initial exploratory data analysis on forum posts. Includes word frequency plots, basic sentiment metrics, and preprocessing pipelines.

- **`edaWithDate.ipynb`**  
  Enhances `eda.ipynb` by integrating timestamp information to track sentiment and engagement trends over time.

- **`eda3.ipynb`**  
  Updated version of EDA with improved preprocessing and more refined visualizations.

- **`edaSynthetic.ipynb`**  
  Applies EDA methods to synthetic datasets generated for model validation. Useful for benchmarking topic modeling and sentiment classifiers in a controlled setting.


### NLP Models

- **`VIP_LDA_Model_Test.ipynb`**  
  Applies Latent Dirichlet Allocation (LDA) for topic discovery. Includes coherence score evaluations and visualization of dominant topics.

- **`VIP_BERT.ipynb`**  
  Implements and evaluates BERT-based sentiment classifiers. Compares BERT’s performance to TF-IDF and LSTM models on student discussion data.


- **`anthonyDavis_modified.ipynb`**  
  A customized or experimental notebook, potentially for user-specific modeling or interactive sentiment analysis.

## Machine Learning

View detail notes in [Diya's Notebook](./Diya's%20Notebook.md)

### Models
- OpenAI API (Chat GPT)
- LLAMA-2

## Supporting Literature

- **`DF annotated bibliography.pdf`**  
  Summarizes relevant research articles and technical blogs. Covers:
  - Sentiment classification using BERT, LSTM, and VADER
  - Topic modeling with LDA and BERTopic
  - Engagement detection with BERT-CNN and GBM
  - Applications of synthetic datasets for model evaluation

## Dashboard
Interactive visualization is developed with React-Router, codes are in [this dashboard folder](../new%20Dashboard%20Spring%202025/dashboard_data_forum/)


## Use Cases
- Apply LDA and BERTopic to extract meaningful discussion themes
- Benchmark models on synthetic data to improve generalization
- Inform instructor interventions through topic modeling dashboards


## Technologies
- Python (Jupyter Notebooks)
- Libraries: 
  - `transformers` (Hugging Face)
  - `gensim`, `nltk`, `scikit-learn`
- NLP Models: BERT, LSTM, VADER
- Topic Modeling: LDA, BERTopic
- Clustering & Feature Engineering: k-means, TF-IDF, word embeddings

