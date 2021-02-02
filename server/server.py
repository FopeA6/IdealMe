#need to import 
from flask import Flask, request, jsonify, g
from db import get_db
from flask_cors import CORS
import hashlib


server = Flask(__name__)
CORS(server)

def hash_salt(input):
    return hashlib.sha256(input.encode()).hexdigest()


@server.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def init_db():
    with server.app_context():
        db = get_db()
        with server.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()


@server.route('/')
def welcome():
    return jsonify({"msg": "Welcome to the IdealMe server!"})


#this route is only to test the server is working
@server.route('/user', methods=['GET'])
def all_users():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    #print(users)
    return jsonify({"users": users})

#user height in meters
#user weight in kg
#BMI = kg/m(sqared2)

@server.route('/auth/register', methods=['POST'])
def check_user():
    name = request.get_json()['name']
    email = request.get_json()['email']
    password = request.get_json()['password']
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT COUNT(*) FROM users WHERE name=?", (name, ))
    count = cursor.fetchone()[0]

    if count > 0:
        message = "User with this name already exists. Please pick another"
        return jsonify({"error": message})
    
    hashed_password = hash_salt(password)
    cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, hashed_password))
    db.commit()
    message="Welcome test server user"
    return jsonify({"msg": message})


@server.route('/auth/login', methods=['POST'])
def is_user():
    name = request.get_json()['name']
    password = request.get_json()['password']

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT COUNT(*) FROM users WHERE name=?", (name,))
    count = cursor.fetchone()[0]
    if count > 0:
        cursor.execute("SELECT * FROM users WHERE name=?", (name,))
        user_data = cursor.fetchone()
        if hash_salt(password) == user_data[2]:
            user_id = user_data[0]
            user_email = user_data[3]
            return jsonify({"userId": user_id, "name": name, "userEmail": user_email})
        else:
            message = "Incorrect password"
            return jsonify({"err": message})
    else:
        message = "This username is incorrect or does not exist"
        return jsonify({"err": message})


# learn from last time and send new daily data with data from client
@server.route('/details/<string:user>', methods=['GET'])
def get_details(user):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        SELECT calories.* from calories
        INNER JOIN users
        ON calories.userId = users.id
        WHERE users.name = (?)
        ORDER BY calories.id DESC;"""
        , (user,))
    
    user_date = cursor.fetchall()
    if len(user_date) > 0:
        colname = [ d[0] for d in cursor.description ]
        user_dictionary = [ dict(zip(colname, r)) for r in user_date ]
        
        return jsonify(user_dictionary)
    return jsonify({"err": "user details not found"})


@server.route('/new-details', methods=['POST'])
def new_details():
    db = get_db()
    cursor = db.cursor()

    height = request.get_json()['height']
    weight = request.get_json()['weight']
    age = request.get_json()['age']
    fitness = request.get_json()['fitness']
    calories_goal = request.get_json()['caloriesGoal']
    calories_consumed = request.get_json()['caloriesConsumed']
    today = request.get_json()['today']
    user_id = request.get_json()['userId']

    cursor.execute(
        "INSERT INTO calories (myHeight, myWeight, age, fitnessLevel, caloriesGoal, caloriesConsumed, today, userId) VALUES (?,?,?,?,?,?,?, ?);",
        (height, weight, age, fitness, calories_goal, calories_consumed, today, user_id)
    )
    db.commit()
    return jsonify({"msg": "Your data has been entered"})


#should there be a column for calories consumed in that day for progress
@server.route('/progress/<string:name>', methods=['GET'])
def my_progress(name):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        SELECT calories.myWeight, calories.today from calories
        INNER JOIN users
        ON calories.userId = users.id
        WHERE users.name = (?)
        ORDER BY calories.id DESC;"""
        , (name,))
    user_date = cursor.fetchall()
    if len(user_date) > 0:
        return jsonify(user_date)
    return jsonify({"err": "user details not found"})


@server.route('/update-count', methods=['PATCH'])
def calories_count():
    db = get_db()
    cursor = db.cursor()

    today = request.get_json()['today']
    calories_consumed = request.get_json()['caloriesConsumed']
    user_id = request.get_json()['userId']

    cursor.execute("UPDATE calories SET caloriesConsumed = caloriesConsumed + (?) WHERE today = (?) AND userId = (?)", (calories_consumed, today, user_id))
    db.commit()
    return jsonify({"msg": "calories have to added"})

@server.route('/update', methods=['POST'])
def update_data():
    db = get_db()
    cursor = db.cursor()
    
    height = request.get_json()['height']
    weight = request.get_json()['weight']
    age = request.get_json()['age']
    fitness = request.get_json()['fitness']
    calories_goal = request.get_json()['caloriesGoal']
    calories_consumed = request.get_json()['caloriesConsumed']
    today = request.get_json()['today']
    user_id = request.get_json()['userId']
    #print(height, weight, age, fitness, calories_goal, calories_consumed)
    cursor.execute("SELECT * FROM calories WHERE today=? AND userId=?", (today, user_id))
    todays_data = cursor.fetchone()[0]
    if todays_data > 0:
        cursor.execute("""UPDATE calories SET
            myHeight = ?,
            myWeight = ?,
            age = ?,
            fitnessLevel = ?,
            caloriesGoal = ?,
            caloriesConsumed =?
            WHERE today = ? AND userId = ?
            """, 
            (height, weight, age, fitness, calories_goal, calories_consumed, today, user_id))
        return jsonify({"msg": "Data updated"})

    return jsonify({"msg": "Data not found"})



if __name__ == "__main__":
    server.run(port=5000, debug=True)