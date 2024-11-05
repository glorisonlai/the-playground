from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

app = Flask(__name__, instance_relative_config=True)

app.config.from_pyfile('config.py', silent=True)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

from models import BooksModel, TagsModel

@app.route('/search', methods = ['GET'])
def search():
    cars = query.all()
    results = [
        {
            "": car.name,
            "model": car.model,
            "doors": car.doors
        } for car in cars]

    return {"result": results}

@app.route('/search/<name>', methods = ['GET'])
def search_name(name):
    return f'Hello {name}!'

if __name__ == '__main__':
    app.run()
