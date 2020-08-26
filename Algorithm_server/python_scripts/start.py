from flask import Flask, request
from flask_restful import Resource, Api
from json import dumps
from flask import jsonify
import LGBMModel
from waitress import serve

app = Flask(__name__)
api = Api(app)


class LGBM(Resource):
    def get(self):
        return jsonify(LGBMModel.createLGBM())


class Test(Resource):
    def get(self):
        return jsonify(LGBMModel.testAlgo('lgb-model_0.803330225042296.txt'))


@app.route("/predict", methods=['POST'])
def predict():
    req_data = request.get_json()
    data = []
    data.append(float(req_data["LATITUDE"]))
    data.append(float(req_data["LONGITUDE"]))
    data.append(float(req_data["Tair_f"]))
    data.append(float(req_data["Tair_f_min"]))
    data.append(float(req_data["Tair_f_max"]))
    data.append(float(req_data["Wind_f"]))
    data.append(int(req_data["DOY"]))
    data.append(float(req_data["Humidity"]))
    data.append(0)
    return jsonify(LGBMModel.predict([data]))


api.add_resource(LGBM, '/LGNMModel')  # Route_1
api.add_resource(Test, '/TestGe')  # Route_1

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5002)
