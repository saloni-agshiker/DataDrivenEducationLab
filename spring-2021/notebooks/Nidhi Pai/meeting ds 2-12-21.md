# Code Review with John

2/12/21

- make a .data folder and add to git ignore - put in the root and John used that for his analyses
- no cognitive presence is the most common - and a model might attempt to label everything 0 and then you get 30-40% accuracy
  - posts that have no words in embedding space
- 70% accuracy for 0 vs 1 where 1 indicates cognitive presence -> then maybe try filtering out 0's and attempt model with 1's only
- language models don't know how to handle code and edx posts have a lot of code
  - how could we remove code from the text field?
- stack overflow url and picture links can be replaced wtih something to embed in the space -> marginally better accuracy
- recommends working on piazza data
- can we tell if a post is instructor vs. non-instructor? 
- model text with regression? output one number instead of classes
- see what models work on reddit posts