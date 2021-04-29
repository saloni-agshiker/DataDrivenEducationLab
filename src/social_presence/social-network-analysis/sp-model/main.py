import sna_utils
import plotting
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


# Path for the csv files containing the threads and comments
comments_path = ".data/edX Discussion Forums/Forum comment ferpa.csv"
threads_path = ".data/edX Discussion Forums/Forum thread ferpa.csv"

# Path for files having cognitive labels
spring21_piazza_data = ".data/Cognitive Presence Coding Results/Spring 2021 Coding Results_Piazza.xlsx"
spring20_edx_data = ".data/Cognitive Presence Coding Results/Spring 2020 Coding Results_edX.xlsx"
fall20_edx_data = ".data/Cognitive Presence Coding Results/Fall 2020 Coding Results_edX.xlsx"


def main():
    """
    Load datasets
    Generate social network graphs
    Relationship with cognitive presence
    Save plots

    :return: 0
    """
    # Load Datasets
    comment = pd.read_csv(comments_path).drop_duplicates()
    thread = pd.read_csv(threads_path).drop_duplicates()

    # Generate social network graphs
    forum_graph = sna_utils.generate_interaction_graph(thread, comment, savefile=True, fpath='forum_graph.gexf')

    # Relationship with cognitive presence

    #   # Load cognitive presence files
    sp21p_df = pd.read_excel(spring21_piazza_data, sheet_name="a4_coding1")
    sp21p_df.rename(columns={'Submission HTML Removed': 'body'}, inplace=True)

    sp20e_df_comments = pd.read_excel(spring20_edx_data, sheet_name="Comments")
    sp20e_df_thread = pd.read_excel(spring20_edx_data, sheet_name="Thread")

    fa20e_df = pd.read_excel(fall20_edx_data, sheet_name="Coding Results")
    train_combined = pd.concat([sp20e_df_thread[['body', 'CP Code']], sp20e_df_comments[['body', 'CP Code']],
                                fa20e_df[['body', 'CP Code']], sp21p_df[['body', 'CP Code']]])

    train_combined = train_combined[~train_combined['CP Code'].isin(['1A', '1B'])].drop_duplicates()

    merged_thread = pd.merge(train_combined, thread, left_on='body', right_on='body')
    merged_thread['CP Code'] = merged_thread['CP Code'].astype('int')

    merged_comment = pd.merge(train_combined, comment, left_on='body', right_on='body')
    merged_comment = merged_comment[merged_comment.body!='[deleted]']
    merged_comment['CP Code'] = merged_comment['CP Code'].astype('int')

    comments_grouped = merged_comment.groupby("thread_id")
    counts_df = comments_grouped[['CP Code']].count()
    mean_df = comments_grouped['CP Code'].agg([np.mean])

    merged_cp = pd.merge(counts_df, mean_df, on='thread_id')
    merged_cp = merged_cp.rename(columns={'CP Code': 'count'})

    thread_cp_merge = pd.merge(merged_thread, merged_cp, left_on='id', right_on='thread_id')
    thread_cp_merge['created_at'] = pd.to_datetime(thread_cp_merge['created_at'])

    # Create and save plots
    plt.scatter(merged_cp['mean'], merged_cp['count'])
    plt.savefig('Comments_MeanCP_vs_Count.png')

    plt.scatter(thread_cp_merge['CP Code'], thread_cp_merge['count'])
    plt.savefig('ThreadCP_vs_Count.png')

    plt.scatter(thread_cp_merge['CP Code'], thread_cp_merge['mean'])
    plt.savefig('ThreadCP_vs_Comments_MeanCP.png')

    return


if __name__ == '__main__':
    main()
