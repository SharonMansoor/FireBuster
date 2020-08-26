from datetime import datetime
from pymongo import MongoClient
import numpy as np
import pandas as pd


def loadInitialData(latFilePath, lonFilePath, topLocationFilePath):
    """
    The function load the initial data of all mapped locations and top 1000 wanted locations
    :param latFilePath: mapped latitudes file path
    :param lonFilePath: mapped longitude file path
    :param topLocationFilePath: top 1000 wanted locations file path
    :return: mapped latitudes, mapped longitudes and top 1000 wanted locations
    """
    lats = pd.read_csv(latFilePath, header=None)
    lons = pd.read_csv(lonFilePath, header=None)
    top1000 = pd.read_csv(topLocationFilePath, header=None)

    return lats, lons, top1000


def loadRealTimeFires(lats, lons):
    """
    The function loads the Real Time Fires from NASAs MODIS satellite for the last week
    :param lats: mapped latitudes array
    :param lons: mapped longitude array
    :return: a dataset with all fires in the last 7 days
    """
    # Filter irrelevant fires.
    dataset = pd.read_csv(
        'https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_USA_contiguous_and_Hawaii_7d.csv')
    dataset = dataset[dataset['confidence'] >= 90]
    dataset = dataset[dataset['latitude'] <= 53]
    dataset = dataset[dataset['latitude'] >= 25]
    dataset = dataset[dataset['longitude'] >= -125]
    dataset = dataset[dataset['longitude'] <= -67]
    x = []
    y = []
    i = 0

    # Change Lats and Lons to Tile Indexes
    for indexes, fire in dataset.iterrows():
        lat_idx = np.abs(lats[0] - fire['latitude']).argmin()
        lon_idx = np.abs(lons[0] - fire['longitude']).argmin()
        x.append(lat_idx)
        y.append(lon_idx)
        i = i + 1

    dataset['X_tile'] = x
    dataset['Y_tile'] = y
    dataset = dataset[['X_tile', 'Y_tile', 'acq_date']]

    return dataset


def truePositive(prediction, dbContex):
    """
    Add a single prediction document with true positive outcome to Mongo
    :param prediction: prediction document
    :param dbContex: Mongo collection for inserting
    """

    prediction['acctual'] = 1
    prediction['predicted'] = 1
    dbContex.insert_one(prediction)


def falsePositive(prediction, dbContex):
    """
    Add a single prediction document with false positive outcome to Mongo
    :param prediction: prediction document
    :param dbContex: Mongo collection for inserting
    """
    prediction['acctual'] = 0
    prediction['predicted'] = 1
    dbContex.insert_one(prediction)


def falseNegative(prediction, dbContex):
    """
    Add a single prediction document with false negative outcome to Mongo
    :param prediction: prediction document
    :param dbContex: Mongo collection for inserting
    """
    prediction['acctual'] = 1
    prediction['predicted'] = 0
    dbContex.insert_one(prediction)


def trueNegative(prediction, dbContex):
    """
    Add a single prediction document with true negative outcome to Mongo
    :param prediction: prediction document
    :param dbContex: Mongo collection for inserting
    """
    prediction['acctual'] = 0
    prediction['predicted'] = 0
    dbContex.insert_one(prediction)


def addFireToDataset(entry, dbContex):
    """
    Add a fire entry to DB.
    :param prediction: Fire entry
    :param dbContex: Mongo collection for inserting
    """
    entry['IS_FIRE'] = 1
    dbContex.insert_one(entry)


def addNotFireToDataset(entry, dbContex):
    """
    Add a not fire entry to DB.
    :param prediction: Not Fire entry
    :param dbContex: Mongo collection for inserting
    """
    entry['IS_FIRE'] = 0
    dbContex.insert_one(entry)


# Files path decleration
latsFile = 'C:/Users/cs702/PycharmProjects/FireBuster/GetForecastData/NoahLats (1).csv'
lonsFile = 'C:/Users/cs702/PycharmProjects/FireBuster/GetForecastData/NoahLons (1).csv'
top1000File = 'C:/Users/cs702/PycharmProjects/FireBuster/GetForecastData/Top1000FireLocations.csv'
logsFile = 'C:/Users/cs702/PycharmProjects/FireBuster/GetForecastData/logs.txt'

# Initialize locations data
lats, lons, top1000 = loadInitialData(latsFile, lonsFile, top1000File)

predictions = loadRealTimeFires(lats, lons)

# calculate tomorrow and the day after Day Of Year
current_day_of_year = datetime.now()

# Db connection configuration
client = MongoClient('localhost', 23777)
db = client['AllAlerts']
PendingPredictions = db['Pending']
PredictionsOutcomes = db['PredictionOutcomes']
PredictionData = db['PredictionData']
cursor = PendingPredictions.find({})

for Prediction in cursor:
    predictionDate = datetime.strptime(Prediction['time'], '%Y-%m-%d %H:%M:%S').date()
    day_diff = (current_day_of_year.date() - predictionDate).days
    if 7 >= day_diff >= 1:
        # Convert Lats & Lons to Grid Tiles.
        lat_idx = np.abs(lats[0] - Prediction['LATITUDE']).argmin()
        lon_idx = np.abs(lons[0] - Prediction['LONGITUDE']).argmin()
        filteredDF = predictions[(predictions.X_tile == lat_idx) &
                                 (predictions.Y_tile == lon_idx) &
                                 (predictions.acq_date == str(predictionDate))]

        # Create Prediction outcome entry
        predOutcome = {
            "time": Prediction["time"],
            "latitude": Prediction["LATITUDE"],
            "longitude": Prediction["LONGITUDE"],
            "prediction": Prediction["prediction"],
        }

        # Create dataset entry
        predForDataset = {
            "LATITUDE": Prediction["LATITUDE"],
            "LONGITUDE": Prediction["LONGITUDE"],
            "Tair_f": Prediction["Tair_f"],
            "Tair_f_min": Prediction["Tair_f_min"],
            "Tair_f_max": Prediction["Tair_f_max"],
            "Wind_f":Prediction["Wind_f"],
            "DOY": Prediction["DOY"],
            "Humidity": Prediction["Humidity"],
        }

        if len(filteredDF) != 0:
            if float(Prediction['prediction']) < 0.5:
                falseNegative(predOutcome, PredictionsOutcomes)
            else:
                truePositive(predOutcome, PredictionsOutcomes)
            addFireToDataset(predForDataset, PredictionData)
        else:
            if float(Prediction['prediction']) < 0.5:
                trueNegative(predOutcome, PredictionsOutcomes)
            else:
                falsePositive(predOutcome, PredictionsOutcomes)
            addNotFireToDataset(predForDataset, PredictionData)
        deleteDoc = {"_id": Prediction['_id']}
        PendingPredictions.delete_one(deleteDoc)
