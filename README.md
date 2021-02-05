# idealMe (Client side)

[![License: MIT](https://img.shields.io/badge/Licence-MIT-green.svg)](https://opensource.org/licenses/MIT)

A calorie tracking app to allow users to be the person they want to see in the mirror.

![idealMe](https://github.com/rajtandel21/IdealMe/blob/dev/idealme.gif)

To visit the website click [here](https://)

## To use

### Client
Clone down the repo and cd into client `npm install` to download the packages
To start the app, use `npm start`
*Please note that you will need to set up an `.env` file in the client folder and obtain API keys to run our programm*

APP_ID = xxx from https://developer.edamam.com/edamam-recipe-api-demo
APP_KEY = xxx from https://developer.edamam.com/edamam-recipe-api-demo
YOUR_API_KEY = xxx from https://calorieninjas.com/





### Server
_Note: make sure you have [pipenv installed](https://github.com/getfutureproof/fp_guides_wiki/wiki/Virtual-Environment) before continuing._

- `cd` into server
- `pipenv install -r requirements.txt` to install dependencies
- `pipenv shell` to activate your virtual environment for the project
- `python server.py` to run the script

## Technologies used

- Figma
- HTML
- CSS
- JavaScript
- React
- Python
- Sqlite

## Process

Project started with some research on calorie counting and weight management apps and aligning them with the given project brief. Figma was used to generate a wireframe for both the redux data flow and the architecture of the app.
Coding was done in the whole team, smaller sub groups and individually for smaller subsets of problems.
Working code was pushed regularly to the development branch here on github.

## General Features

- App design optimised for mobile devices
- Welcome page with general instructions, login and register component (user stays logged in as it is envisioned that users are likely to use the app on their phone, so that it makes the app more user friendly to allow them to stay logged in)
- Logged-in users gain access to a private route, where they can access their user details, goals, calorie consumption for the day, search for recipes and their stats

### App Features:

> App allows users to register and log in to use the app

> Onboarding requires users to enter their details: height, age, gender, current weight, their activity level, and their goals regarding their weight. These can be adjusted later at any time.

> App calculates the calorie goal for each day; goal resets each day

> Users can enter calories they have consumed to be subtracted from their daily goal, or they can type in the food they had (e.g. "one apple and a tablespoon of peanut butter") and the app will automatically calculate the nutrient composition for them and incorporate them into their calorie goal.

> If users need some food inspiration, they can go to the Recipe page and enter a food they feel like eating and an API will fetch some recipe ideas. The ideas display the calorie count, the ingredients and a picture. If the user wants to make the recipe, they can navigate to the site the recipe is from.


## Future Features

- Add an exercise tracking section
- Add option to allow users to log in through social media Accounts

## Licence

[MIT Licence](https://opensource.org/licenses/mit-license.php)
