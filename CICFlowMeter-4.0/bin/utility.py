import numpy as np
import pandas as pd
import pickle as pk

import random

from sklearn.metrics import accuracy_score
from sklearn import preprocessing
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import Imputer


def read_csv(csv_path):
    df = pd.read_csv(csv_path)
    return df


def encode_label(Y):
    le = preprocessing.LabelEncoder()
    cls = le.fit(Y)
    cls = le.transform(Y)

    return cls


def split_test(num_data, percent):
    select_id = random.sample(range(num_data), int(num_data*percent))
    return select_id


def save_pk(data, pk_path):
    with open(pk_path, 'wb') as f:
        pk.dump(data, f)


def read_pk(pk_path):
    with open(pk_path, 'rb') as f:
        data = pk.load(f)
    return data


def random_split_test_save(num_data, pk_path, ratio=0.1):
    selected_id = split_test(num_data, ratio)
    save_pk(selected_id, pk_path)


def list_to_float(data):
    power = 0
    val = 0
    data = data[::-1]

    for d in data:
        val += int(d)*(10**power)
        power += len(d)
    return val


def X_preprocessing(X, scenario):
    # print ('X.shape = {}'.format(X.shape))
    r = X.shape[0]
    c = X.shape[1]

    # convert ip to float
    for i in range(r):
        for j in [0, 2]:
            if scenario == 'A':
                X[i, j] = list_to_float(X[i, j].split('.'))
            elif scenario == 'B':
                pass

    nan_idx = np.where(X == np.nan)[0]
    print ('nan_idx = {}'.format(nan_idx))
    inf_idx = np.where(X == 'Infinity')[0]
    print ('inf_idx = {}'.format(inf_idx))
    print('finite_idx = {}'.format(np.isfinite(X.all())))
    X[nan_idx] = 0
    X[inf_idx] = 0
    return X


if __name__ == '__main__':

    csv_path = '../../TorCSV/CSV/Scenario-A/merged_5s.csv'
    df = read_csv(csv_path)
    print ('read CSV !!!')
    df_mat = df.as_matrix()
    # get input X and label Y #
    X = df_mat[:, :-1]
    Y = df_mat[:, -1]

    X = X_preprocessing(X)
    # read the list idx to test #
    pk_path = 'selected_id.pkl'
    test_idx = read_pk(pk_path)

    # print (test_idx)
    # encode label #
    le = preprocessing.LabelEncoder()
    cls = le.fit(Y)
    Y = le.transform(Y)

    X_test = X[test_idx, :]
    Y_test = Y[test_idx]
    X_train = np.delete(X, test_idx, axis=0)
    Y_train = np.delete(Y, test_idx, axis=0)

    clf = RandomForestClassifier(max_depth=2, random_state=0)
    clf.fit(X_train, Y_train)

    Y_pred = clf.predict(X_test)
    print ('accuracy = {}'.format(accuracy_score(Y_test, Y_pred)))
    filename = 'randomForest.sav'
    pk.dump(clf, open(filename, 'wb'))
