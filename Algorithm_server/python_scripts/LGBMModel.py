import pandas as pd
import numpy as np
from sklearn import preprocessing
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
import joblib

# Model Vars
learning_rate = 0.051
boosting_type = 'gbdt'
objective = 'binary'
metric = ['binary_logloss', 'auc']
sub_feature = 0.5721
num_leaves = 2040
min_data = 500
max_depth = 19
max_bin = 8000


def createLGBM():
    # Read dataset
    dataset = pd.read_json('C:\DataSet.json')
    dataset = dataset.drop(columns=['_id'])
    x = dataset.values  # returns a numpy array

    # Normalize Data
    min_max_scaler = preprocessing.MinMaxScaler()
    x_scaled = min_max_scaler.fit_transform(x)
    joblib.dump(min_max_scaler, "Saved_Scaler")
    dataset = pd.DataFrame(x_scaled)
    X = dataset.iloc[:, 0:8].values
    y = dataset.iloc[:, 8].values

    # Initiate LGBM
    x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)
    d_train = lgb.Dataset(x_train, label=y_train)
    params = {'task': 'train', 'learning_rate': learning_rate, 'boosting_type': boosting_type, 'objective': objective,
              'metric': metric, 'sub_feature': sub_feature, 'num_leaves': num_leaves, 'min_data': min_data,
              'max_depth': max_depth, 'max_bin': max_bin, 'num_threads': 7,'verbose': 0}

    clf = lgb.train(params, d_train, 5000, keep_training_booster=True)

    # Prediction
    y_pred = clf.predict(x_test)

    # convert into binary values
    for i in range(0, len(y_pred)):
        if y_pred[i] >= .5:  # setting threshold to .5
            y_pred[i] = 1
        else:
            y_pred[i] = 0

    # Accuracy
    accuracy = accuracy_score(y_pred, y_test)

    clf.save_model("lgb-model_" + str(accuracy) + ".txt")

    return "lgb-model_" + str(accuracy) + ".txt"


def testAlgo(filename):
    dataset = pd.read_json('C:\DataSet.json')
    dataset = dataset.drop(columns=['_id'])
    vals = dataset.values

    x = dataset.values  # returns a numpy array
    min_max_scaler = preprocessing.MinMaxScaler()
    x_scaled = min_max_scaler.fit_transform(x)
    joblib.dump(min_max_scaler, "Saved_Scaler")
    dataset = pd.DataFrame(x_scaled)
    vals = dataset.values
    X = dataset.iloc[:, 0:8].values
    y = dataset.iloc[:, 8].values

    clf = lgb.Booster(model_file=filename)
    # Prediction
    y_pred = clf.predict(X)

    # convert into binary values
    for i in range(0, len(y_pred)):
        if y_pred[i] >= .5:  # setting threshold to .5
            y_pred[i] = 1
        else:
            y_pred[i] = 0
    # Confusion matrix

    cm = confusion_matrix(y, y_pred)

    # Accuracy
    accuracy = accuracy_score(y_pred, y)

    print(accuracy)
    print(cm)
    return accuracy, cm.tolist()


def predict(data):
    data = np.asarray(data)
    print(data)
    min_max_scaler = joblib.load("Saved_Scaler")
    data = min_max_scaler.transform(data)
    data = data[:, 0:8]
    model = lgb.Booster(model_file='LGBModel0.7666321413492818.txt')
    print(data)
    pred = model.predict(data)
    print(pred)
    return pred.tolist()
