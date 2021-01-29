#need to import 
from flask import Flask, request, jsonify
from db import get_db
from flask_cors import CORS
import hashlib


server = Flask(__name__)
CORS(server)


@server.route('/')
def welcome():
    return jsonify({"msg": "Welcome to the IdealMe server!"})


#user height in meters
#user weight in kg
#BMI = kg/m(sqared2)

if __name__ == "__main__":
    server.run(port=5000, debug=True)