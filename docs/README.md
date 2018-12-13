# Director DB

## What is it
 An API for exploring movie directors and their movies

## Features
- User authentication
- Ability to create music labels
- Quickly obtain label information

# How to Interact

## Requests
Make all requests to: `https://director-db.herokuapp.com/api`

## Objects
### Director
```
{
   name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  birthday: {
    type: Date
  },
  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }]
}
```
### Movie
```
{
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  directors: {
    type: Schema.Types.ObjectId,
    ref: 'Director',
  },
  description: {
    type: String,
  }
}
```
## Authentication
In order to use any of the API features you must first register as a user and obtain a token
### Sign Up
Route: `POST /auth/signup`

Takes a JSON argument with a user and password

Returns a cookie with authentication

Example:
```
POST https://director-db.herokuapp.com/api/auth/signup
send: {
  username: 'user',
  password: 'pass'
}
```
### Login
Route: `POST /auth/login`

Takes a JSON argument with a user and password

Returns a cookie with authentication

Example:
```
POST https://director-db.herokuapp.com/api/auth/login
send: {
  username: 'user',
  password: 'pass'
}
```
### Logout
Route: `GET /auth/logout`

No data needed to pass

Returns nothing

Example:
```
GET https://director-db.herokuapp.com/api/auth/logout
send: {}
```
## Director
### Get all directors
Route: `GET /directors/`

No data needed to pass

Returns a list of all directors

Example:
```
GET https://director-db.herokuapp.com/api/directors/
send: {}
```
### Get a director
Route: `GET /directors/:directorId`

Pass the directorId as a url parameter

Returns the single director

If director not found returns status 404 and 'Director not found'

Example:
```
GET https://director-db.herokuapp.com/api/directors/1234567
send: {}
```
### Create a new director
Route: `POST /directors`

Takes a JSON argument with required attributes and any optional attributes

Returns the director added

Example:
```
Post https://director-db.herokuapp.com/api/directors/
send: {
      name: 'Quentin Tarantino',
      bio: 'Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee. Quentin moved with his mother to Torrance, California, when he was four years old.',
      birthday: 'Mar 27 1963',
    }
```
## Movies
### Get all of a director's movies
Route: `GET /directors/:directorId/movies`

Pass the directorId as a url parameter

Returns all the movies of a director

Example:
```
Post https://director-db.herokuapp.com/api/directors/:directorId/movies
send: {}
```
### Get a single movie
Route: `GET /directors/:directorId/movies/:movieId`

Pass the directorId and movieId as url parameters

Returns a single movie

Example:
```
Post https://director-db.herokuapp.com/api/directors/:directorId/movies/:movieId
send: {}
```
### Add a new movie
Route: `GET /directors/:directorId/movies`

Pass the directorId as a url parameter

Returns the director the movie was added to

Example:
```
Post https://director-db.herokuapp.com/api/directors/:directorId/movies/
send: {}
```
### Add a new director to a movie
Route: `GET /directors/:directorId/movies/:movieId/:newDirectorId`

Pass the directorId, movieId, and newDirectorId as url parameters

Returns the movie changed

Example:
```
Post https://director-db.herokuapp.com/api/directors/:directorId/movies/:movieId/:newDirectorId
send: {}
```
### Removes a single movie
Route: `DELETE /directors/:directorId/movies/:movieId`

Pass the directorId and movieId a url parameters

Returns the movie deleted

Example:
```
DELETE https://director-db.herokuapp.com/api/directors/:directorId/movies/:movieId/
send: {}
```
