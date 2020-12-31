## React Django TODO App
The app is based on  https://wsvincent.com/django-rest-framework-react-tutorial/

## Setup Django
Setup a python virtual environment using python3 -m venv cmle_env
pip install the following packages
Django==3.1.4
django-cors-headers==3.6.0
djangorestframework==3.12.2
django runs on 
Our react app running on localhost:3000 calls django API running on localhost:8000
To enable cross original resource sharing, CORS package is used

## Setup React
Create a ui folder to include the code related to javascript SPA
Install npm. 7.3.0 is installed by default
npm install -g create-react-app
Launch the app using npm start

##Launch Django
python manage.py runserver launches the django API at localhost:8000

##Launch React
npm start launches the react App at localhost:3000

