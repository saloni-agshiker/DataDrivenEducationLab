import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

import networkx as nx


def generate_interaction_graph(thread_df, comments_df, savefile=True, fpath='forum_graph.gexf'):

    # Creating the graph with users as nodes and the dependencies as edges
    forum_graph = nx.MultiDiGraph()

    users_ids = pd.Series(thread_df.user_id.value_counts().keys())

    def create_tuples(uid):
        return tuple([uid, {"count": thread_df.user_id.value_counts()[uid]}])

    user_nodes = users_ids.apply(create_tuples)
    forum_graph.add_nodes_from(list(user_nodes))

    thread_dict = {k: v for k, v in thread_df.iloc[:, [0, 1]].values}

    def add_edge_to_graph(user_id, thread_id, comment_id):
        if thread_id in thread_dict:
            forum_graph.add_edge(user_id, thread_dict[thread_id], key=comment_id)

    comments_df.apply(lambda row: add_edge_to_graph(row.user_id, row.thread_id, row.id), axis=1)

    if savefile:
        nx.write_gexf(forum_graph, fpath)

    return forum_graph
