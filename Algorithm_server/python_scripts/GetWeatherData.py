import requests
import pandas as pd
from datetime import datetime
from pymongo import MongoClient
import json

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


def getWeatherForLocation(lat, lon):
    """
    The function get weather forecast for the wanted location
    :param lat: wanted latitude
    :param lon: wanted longitude
    :return: the weather forecast
    """
    weatherApiEndpoint = 'https://api.openweathermap.org/data/2.5/onecall?lat={}&lon={}&exclude=current,minutely,hourly&appid=98a3ac27dffdddb3c4676b97af528b70&units=metric'\
        .format(lat, lon)

    res = requests.get(weatherApiEndpoint)
    weather = res.json()
    return weather


def predictFireForLocation(lat, lon, data, doy):
    """
    The function decorate the weather data and send it to prediction algorithm
    :param lat: wanted latitude
    :param lon: wanted longitude
    :param data: the forecast data to predict on
    :param doy: the day of the year of the forecast data
    :return: the probability of fire at the wanted location
    """
    kelvin_degrees = 273.15

    temp = data['temp']['day'] + kelvin_degrees
    temp_min = data['temp']['min'] + kelvin_degrees
    temp_max = data['temp']['max'] + kelvin_degrees
    wind_speed = data['wind_speed']
    humidity = data['humidity']

    weatherForPrediction = {
        "DOY": doy,
        "Humidity": humidity,
        "LATITUDE": lat,
        "LONGITUDE": lon,
        "Tair_f": temp,
        "Tair_f_min": temp_min,
        "Tair_f_max": temp_max,
        "Wind_f": wind_speed,
        "time": str(datetime.utcfromtimestamp(int(data['dt'])))
    }

    prediction = requests.post('http://localhost:5002/predict', json=weatherForPrediction)
    weatherForPrediction["Probability"] = prediction.text.split('[')[1].split(']')[0]

    return weatherForPrediction


def saveLog(log, path):
    """
    The function save wanted log at the wanted file
    :param log: The wanted log message to save
    :param path: The wanted log file path
    :return: None
    """
    file = open(path, "a+")
    file.write(str(log))


def savePredictionToDb(dbCollectionClinet, data):
    """
    The function save the wanted prediction alert to the db
    :param dbCollectionClinet: the connection to the db
    :param data: the wanted prediction to save
    :return: None
    """
    probability = float("%.2f" % (float(data["Probability"]) *100))
    severity = "high"

    if (probability < 50.0):
        severity = "low"
    elif (probability < 65.0):
        severity = "moderate"

    currentAlert = {
        "location": {
            "lat": data["LATITUDE"],
            "lng": data["LONGITUDE"]
        },
        "severity": severity,
        "time": data["time"],
        "probability": str(probability) + "%",
        "confirmed": "undefined"
    }

    dbCollectionClinet.insert_one(currentAlert)


# Main Section

# Files path decleration
latsFile = 'C:/Users/cs702/PycharmProjects/FireBuster/GetForecastData/NoahLats (1).csv'
lonsFile = 'C:/Users/cs702/PycharmProjects/FireBuster/GetForecastData/NoahLons (1).csv'
top1000File = 'C:/Users/cs702/PycharmProjects/FireBuster/GetForecastData/Top1000FireLocations.csv'
logsFile = 'C:/Users/cs702/PycharmProjects/FireBuster/GetForecastData/logs.txt'


# calculate tomorrow and the day after Day Of Year
day_of_year = datetime.now().timetuple().tm_yday
day_of_year_tomorrow = day_of_year + 1

# Initialize locations data
lats, lons, top1000 = loadInitialData(latsFile, lonsFile, top1000File)

# Db connection configuration
client = MongoClient('localhost', 23777)
db = client['AllAlerts']
currentAlertsCollection = db['CurrentAlerts']

# Start process log
startLog = "\n" + "Start get weather at: " + str(datetime.now())
saveLog(startLog, logsFile)

# Run over all top 1000 wanted locations
for index, row in top1000.iterrows():
    X_tile = (top1000.iloc[index][1])
    Y_tile = (top1000.iloc[index][2])

    # find the wanted location at the mapped location
    currentLatitude = lats.iloc[int(X_tile)][0]
    currentLongitude = lons.iloc[int(Y_tile)][0]

    # Get the forecast weather for the current location
    dataTwoDays = getWeatherForLocation(currentLatitude, currentLongitude)

    # Separate forecast data for tomorrow and the day after
    dataFirstDay = dataTwoDays['daily'][1]
    dataSecondDay = dataTwoDays['daily'][2]

    # Predict probability to wild fire for tomorrow adn the day after at the current location
    # and save result on db
    weatherForPrediction = predictFireForLocation(currentLatitude, currentLongitude, dataFirstDay, day_of_year)
    savePredictionToDb(currentAlertsCollection, weatherForPrediction)

    weatherForPrediction = predictFireForLocation(currentLatitude, currentLongitude, dataSecondDay, day_of_year_tomorrow)
    savePredictionToDb(currentAlertsCollection, weatherForPrediction)

# Close the connection to the db
client.close()

# End process log
endLog = "\n" + "Finishing get weather at: " + str(datetime.now())
saveLog(endLog, logsFile)
