DROP TABLE IF EXISTS calories;
CREATE TABLE calories (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    myHeight INTEGER, 
    myWeight INTEGER, 
    age INTEGER, 
    fitnessLevel , 
    BMI, 
    calories INTEGER, 
    today DATE, 
    userId FORIGN KEY
    );

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255)
)