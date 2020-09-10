import pandas as pd
import numpy as np
import os
from matplotlib import pyplot as plt

data_dir = '.data'

# Get Comment Data
pdf_comments = pd.read_csv(os.path.join(data_dir, 'Forum comment ferpa.csv'))

# Let's get one class' post time
big_class = 'course-v1:GTx+CS1301x+1T2017'
big_class_mask = pdf_comments['course_id'] == big_class
comments_big_class = pdf_comments.loc[big_class_mask]
post_times = pd.to_datetime(comments_big_class['created_at'])

# Convert to date
post_dates = post_times.apply(lambda x: x.date())

# Remove posts from 2019
post_dates = post_dates[post_dates.apply(lambda x: x.year == 2017)]

# Get density of posts
post_density = post_dates.value_counts()
post_density = post_density.rename('num_posts')


# Get the first at last post time from this class
first_post_date = post_dates.min()
last_post_date = post_dates.max()


# Make a daily index
possible_post_days = pd.date_range(first_post_date, last_post_date, freq='D')

# Populate daily index with values
all_days_density = post_density[possible_post_days].fillna(0)

# A plot of posts per day
all_days_density.plot(title='Posts Per Day 2017', legend=True)
plt.savefig('sample_scripts/post_density/CS1301x1T2017_post_density_17.png')

all_days_density.to_csv('.data/CS1301x1T2017_post_density_17.csv')

