## React Django Todo+Leads App
The app is based on 3 tutorial
1. https://wsvincent.com/django-rest-framework-react-tutorial/
2. https://www.valentinog.com/blog/drf/
3. As the React App increases in size, consider deploying ui and backend separately
and use session/JWT based authentication https://www.valentinog.com/blog/webpack-django/

## Setup Django
Setup a python virtual environment using python3 -m venv cmle_env
pip install the following packages
Django==3.1.4  
django-cors-headers==3.6.0  
djangorestframework==3.12.2  

- Our react app running on localhost:3000 calls django API running on localhost:8000
To enable cross original resource sharing, CORS package is used
- Create a todo app using django-admin startapp todos
It's possible to create multiple apps in django
We can create leads app using django-admin startapp leads

## Database Migration
For each app we have a set of associated models
With the updated model we create a migration by running
python manage.py makemigrations app=todos/leads
Finally migrate the database with: python manage.py migrate

## Django Testing
There is not point in testing a vanilla Django model or Django ORM
If we have added a custom method to Django model test it
If we have added a custom view test it
pip install coverage and run the coverage using: coverage run --source='.' manage.py test
generate the report using: coverage html
see the report on cmdline using: coverage report

## Django and React Together
There are many different ways for setting up Django project with react. There are few patterns
- Option 1: React in its own "frontend" django app: load a single html template and let react 
manage the frontend (difficult: medium)
- Option 2: Django REST as a standalone API and React as standalone SPA (difficulty: hard, it involves
some form of token-based authentication)
- Option 3: Mix & Match: mini React apps inside Django templates (difficult: simple but not so maintainable
in the long run)

We will setup react SPA as a "ui" Django app following Option2.
Keeping React closer to Django makes easier to reson about authentication. We can use Django builtin 
authentication for registering and logging in users.
If we are building a OKTA enabled app then most likely we will need tokens and JWT for enterprise isolation 

## Setup React
- Create a ui folder to include the code related to javascript SPA
Install npm. 7.3.0 is installed by default
npm install -g create-react-app
Launch the app using npm start
- Prepare a directory structure for holding React compeonts: mkdir -p ./ui/src/components
Add the static files inside mkdir -p ./ui/{static, templates}/ui
Install webpage and webpack cli: npm i webpack webpack-cli --save-dev
We open up package.json and configure two scripts for production and development
Let's install babel for transpiling our code:
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
Pull in react using: npm i react react-dom --save-dev
After that we configure babel with a .babelrc inside ./ui

## Launch Django
python manage.py runserver launches the django API at localhost:8000

## Launch React
npm start launches the react App at localhost:3000
packaging react app using webpack and load it from django app need some more steps as detailed in 
https://www.valentinog.com/blog/drf/
To learn further about the challanges with webpack and django in bigger project the following
resource is useful to understand https://www.valentinog.com/blog/webpack-django/ (for javascript bunndle 
larger than 200 kb)
As projects grow it make more sense to decouple backend and frontend. WE need to think about authentication
as well. If frontend and backend are in the same domain (or same server) we can use authentication based on
session. If they are in different domain then we need tokens/JWT 


