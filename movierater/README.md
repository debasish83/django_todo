## Udemy Django + React course 
movie app is based on udemy course on django, react web app and 
react native mobile app

## High Level Movie App Requirements
- store movies in DB (title and description)
- see a list of movies
- create new Movie
- update existing movie
- remove movies from DB
- Able to rate movie (0 - 5 stars, limited one per user)
- Register user and login
- Authorize and restrict the app to login users only

## App Outputs
- Back-end API
- Web single page application
- Mobile applications (iOS and Android)

## Technology overview
- Python, Django & DRF
- Javascript & React
- Javascript & React Native for mobile apps
https://hotframeworks.com show the growing popularity of Django and React

## IDE
- Intellij pyCharm
- Visual Studio Code
- Text Editors atom, bracket.io and sublime
- For debugging use browser developer tools and standard python debugging

## Django App
In model we are using a FileField/ImageField to upload a thumbnail image 
assoicated with a movie. 
For using ImageField in a form/model use Pillow

## Django REST framework
Using DRF we can setup an API that handle get, post, put, delete
get will fetch all records from the model
get with a specific id with fetch specific record from the model
post we can create a new record in the database with a new movie
put will add specific fields in the record with a given identifier 

- To get the authorization key, do a POST call on auth endpoint with 
2 params in the body - username and password. Use postman to test retrieving
the authentication token

- We created API end points that can create user with tokens, authorize users 
on different views using token, create users, movies and ratings. We also 
restrict create and update operations on rating and enable the ratings to get 
updated using a custom function rate_movie defined in MovieViewSet

- Use fontawesome to use React components as font. Use styled-component to use css
in the javascript components and style the buttons. We can use style-component directly
from material-ui, semantic-ui or microsoft-ui as well

- Allow rate updates on a movie and also let our users create, update and delete new 
movies using form

- MovieRater UI is a typical CRUD application with create, read, update and delete 
workflows. Now we need to support user authentication and user registering

- Style the application and do some refactoring. Here we plan to use material-ui or
similar component library

- For GCP and AWS Deployment of React/Django apps, idea is to use GCP App Engine / AWS Elastic 
Beanstalk using hosted mysql, use hosted services like pub-sub/kinesis, cloud-functions/aws-lambda
for async processing, Bigquery/Redshift for datawarehouse, bigtable/dynamo-db for no-sql store and 
ai-platform/sagemaker for machine learning.
If BQ/Redshift cost becomes a concern for then plan to use django, spark & tf on kubernetes.
