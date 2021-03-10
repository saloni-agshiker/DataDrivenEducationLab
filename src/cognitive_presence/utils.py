""" Note that different csv's have different data, and must be treated differently """

def load_piazza_csv(path):
    '''
    Load the CSV form of Piazza data without any external library
    :param path: the path of the csv file
    :return:
        data: 
        labels: A list containing labels of cognitive presence
    '''
    data = []
    labels = []
    with open(path, 'r') as fp:
        row = fp.readlines()

        for example in row:
            data.append(x)
            labels.append(y)
    return data, labels

def load_edx_csv(path):
    pass
