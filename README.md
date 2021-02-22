# Annotator Back End
Data annotation is an important activity used to generate the training data and metadata required for machine learning tasks.  Here I have created a simple text annotation tool that allows a user to create and manage text annotations for user-inputed text snippets. This is the backend portion for that tool.

## View the App
You can view the app by navigating to the following url https://gracious-wescoff-b9c656.netlify.app/

## Pre-requisites
The Annotator backend requires:
* Node v12+
* NPM v7+
* psql (Postgress) v13+
* knex (installed globally) v^0.21.17

## Installation
Install the dependencies and start a server with the following commands(from the root directory of the project).
```sh
$ npm install 
$ npm start
```
All of the api commands can be found initially on PORT 8000 which can be configured via the .env file in the root or the knexfile.js.


## Intializing Database

Before a database is initialized make sure knexfile.js in the root directory is correctly configured for development.  This means assigning a correct: host, user, password and database.  There doesn't need to be anything in this database just ensure that it is accessible.  Next in the root directory of your database you can create the tables and seed data (configurations located in the knex folder) with the following commands:
```sh
$ knex migrate:latest
$ knex seed:run
```

The database is set up with the following four tables:

### users

| Column Name   | Column Type   |
| ------------- | ------------- |
| id            | integer       |
| email         | string        |
| phone         | string        |
| password      | string        |
| created_at    | string        |
| updated_at    | string        |

### tags

| Column Name   | Column Type   |
| ------------- | ------------- |
| id            | integer       |
| tag           | string        |
| userid        | integer       |
| created_at    | string        |

### snippets

| Column Name   | Column Type   |
| ------------- | ------------- |
| id            | integer       |
| snippet       | string        |
| userid        | integer       |
| created_at    | string        |
| updated_at    | string        |


### annotations

| Column Name   | Column Type   |
| ------------- | ------------- |
| id            | integer       |
| annotation    | string        |
| snippetid     | integer       |
| userid        | integer       |
| created_at    | string        |
| updated_at    | string        |

As you can see there is some extra data being tracked with these tables that is currently not in use.  The reason for this is so that in the future if we wish to extend this app to be user specific or gain insights on whose using the app we can easily make those additions.

## Features

#### Annotations
While a user has the abillity to add annotations to snippets special care needs to be made for words inside of other words.  As an example if a user wishes to annotate 'an' if there is a word such as 'Canada' then should 'an' be highlighted in 'Canada'?  I opted to make this not be annotated meaning that the word has to be solely by itself to be highlighted.

### Error Handling
All error handling gets resolved through a global error handler middleware and an AppError class which can be customized to display either an error message and status code or an error with all developer required information to resolve the error.  I use the first scenario (lots of information in development) and the second scenario (message and status code) in production.  As a note, error handling in development is more verbose than in production simply to protect it from any possible attacks. Additionaly this global error handling mechanism makes it easy to not only resolve errors and display and appropriate messages, but it also lets error handling code not pollute the api end point making the code easier to work with in the long run.

### Authentication
Authentication was done using a jwt and bcrypt.  Once a user signs in the ORM will encrypt the password and store it in the database.  I have create controller functions to protect routes based off of if the user is signed in and if the user is an admin.  This is easily added to routes by adding the middleware I create for both and can be extended based off of the admin flag in the database.

### Functionality
At a base level the api can do all the major requirements however I have made every endpoint capable of the CRUD operations.


## Testing
This project was tested using mocha and chai. All of the major API end points are tested however, more tests can be added for the rotues in genereal as well as more tests for diverse/unexpected inputs.  In order to execute the tests run the following command:
```sh
$ npm test
```
