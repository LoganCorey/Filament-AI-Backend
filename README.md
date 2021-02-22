# Annotator Back End
Data annotation is an important activity used to generate the training data and metadata required for machine learning tasks.  Here I have created a simple text annotation tool that allows a user to create and maange text annotations for user-inputed text snippets. This is the backend portion for that tool.

## Prerequisites
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

The database is set up with the following four tables

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

## Testing
This project was tested using mocha and chai. ALl of the major API end points are tested however more tests can be added for the user route and weird inputs that a user may enter.  In order to execute the tests run the following command:
```sh
$ npm test
```
