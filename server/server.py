#need to import 
from flask import Flask, request

server = Flask(__name__)

if __name__ == "__main__":
    server.run(port=5000, debug=True)