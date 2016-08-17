# Express Movies - MEN Stack Code Along

## Table of Contents

* [Step 1 - Create the Project](#step-1---create-the-project)
* [Step 2 - Add Libraries](#step-2---add-libraries)
* [Step 3 - Test it out](#step-3---test-it-out)
* [Step 4 - Setup Git Repo](#step-4---setup-git-repo)
* [Step 5 - Add Bootstrap and jQuery to our index.ejs](#step-5---add-bootstrap-and-jquery-to-our-index.ejs)
* [Step 6 - WireUp Mongoose and Method Override](#step-6---wireup-mongoose-and-method-override)
* [Step 7 - Test it out and Save Work](#step-7---test-it-out-and-save-work)
* [Step 8 - Create Some Partials including a NavBar](#step-8---create-some-partials-including-a-navbar)
* [Step 9 - Create the _INDEX_ Route for our Movies](#step-9---create-the-_index_-route-for-our-movies)
* [Step 10 - Create a Movie Mongoose Model and a Seeds file](#step-10---create-a-movie-mongoose-model-and-a-seeds-file)
* [Step 11 - Use Mongoose Movie Model in INDEX route](#step-11---use-mongoose-movie-model-in-index-route)
* [Step 12 - Deploy to Heroku](#step-12---deploy-to-heroku)

## Step 1 - Create the Project

```bash
mkdir express-movies
cd express-movies
express -e
npm install
```

## Step 2 - Add Libraries

```bash
npm install --save method-override
npm install --save mongoose
bower install bootstrap
# copy static client-side assets to public folder
cp bower_components/bootstrap/dist/css/bootstrap.min.css public/stylesheets/
cp bower_components/bootstrap/dist/js/bootstrap.min.js public/javascripts/
cp bower_components/jquery/dist/jquery.min.js public/javascripts/
```

## Step 3 - Test it out

Edit `package.json` and replace `node` with `nodemon`

```bash
npm start
```

## Step 4 - Setup Git Repo

```bash
git init
touch .gitignore
echo bower_components >> .gitignore
echo node_modules >> .gitignore
git add -A
git commit -m "Project setup completed."
```

## Step 5 - Add Bootstrap and jQuery to our index.ejs

Add the following to the file `views/index.ejs`:

```html
<!-- add this link to the head section -->
<link rel='stylesheet' href='/stylesheets/bootstrap.min.css' />
.
.
.
<!-- add these scripts just after the body section -->
<script type="text/javascript" src="/javascripts/jquery.min.js" defer></script>
<script type="text/javascript" src="/javascripts/bootstrap.min.js" defer></script>
```

## Step 6 - WireUp Mongoose and Method Override

Edit `app.js` and add the following code:

```javascript
var mongoose = require('mongoose');
var methodOverride = require('method-override');
.
.
.
// Put these lines just after creating the `app`:
// Connect to database
mongoose.connect('mongodb://localhost/express-movies');
.
.
.
// Put this line just above your routes
app.use(methodOverride('_method'));
```

## Step 7 - Test it out and Save Work

```bash
npm start
```

Load / Refresh the browser tab and look for any console errors (check in browser and in Terminal)

```bash
git add -A
git commit -m "Added bootrap and jQuery links. Configured Mongoose and method-override."
```

## Step 8 - Create Some Partials including a NavBar

Add a Bootstrap NavBar:

8a. Create the partial files:

```bash
mkdir views/partials
touch views/partials/head.ejs
touch views/partials/header.ejs
touch views/partials/footer.ejs
```

8b. Set the contents of `views/partials/head.ejs` to the following:

```html
    <title>Express Movies</title>
    <link rel='stylesheet' href='/stylesheets/bootstrap.min.css' />
    <link rel='stylesheet' href='/stylesheets/style.css' />
```

8c. Set the contents of `views/partials/header.ejs` to the following:

```html
<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">
        <span class="glyphicon glyphicon glyphicon-tree-deciduous"></span>Express Movies
      </a>
    </div>
    <ul class="nav navbar-nav navbar-left">
      <li><a href="/">Home</a></li>
      <li><a href="/movies">Movies</a></li>
    </ul>
  </div>
</nav>
```

8d. Set the contents of `views/partials/footer.ejs` to the following:

```html
<p class="text-center text-muted">&copy; Copyright 2016 ATLANTA WDI</p>
```

8e. Set the contents of `views/index.ejs` with the following:

```html
<!doctype html>
<html lang="en">
<head>
  <% include partials/head %>
</head>

<body class="container-fluid">
  <header>
    <% include partials/header %>
  </header>

  <main>
    <div class="jumbotron">
      <h1>Welcome to Express Movies</h1>
  </main>

  <footer>
    <% include partials/footer %>
  </footer>

</body>
<script type="text/javascript" src="/javascripts/jquery.min.js" defer></script>
<script type="text/javascript" src="/javascripts/bootstrap.min.js" defer></script>
</html>
```

8f. Copy the Fonts

We are getting some 404s on our Bootstrap fonts so let's copy these files into the appropriate folder under `public`:

```bash
mkdir public/fonts
cp bower_components/bootstrap/dist/fonts/* public/fonts
```

## Step 9 - Create the _INDEX_ Route for our Movies

9a. Create a movies router file:

```bash
touch routes/movies.js
```

Put the following code inside `routes/movies.js`:

```javascript
var express = require('express');
var router = express.Router();

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

let movies = [
  {
    title: 'Star Wars',
    genre: 'Science Fiction',
    year:  1977
  },
  {
    title: 'Groundhog Day',
    genre: 'Comedy',
    year:  1993
  }
];

// INDEX
router.get('/', function(req, res, next) {
  res.render('movies/index', { movies: movies });
});

module.exports = router;
```

9b. Create the view for the Movies Index Route:

```bash
mkdir views/movies
touch views/movies/index.ejs
```

Add the following code to `views/movies/index.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <% include ../partials/head %>
</head>

<body class="container-fluid">
  <header>
    <% include ../partials/header %>
  </header>

  <main>
    <div>
      <h3>Movies:</h3>
      <% movies.forEach(function(movie) { %>
        <dl class="dl-horizontal">
          <dt>Title</dt><dd><%= movie.title %></dd>
          <dt>Genre</dt><dd><%= movie.genre %></dd>
          <dt>Year</dt><dd><%= movie.year %></dd>
        </dl>
      <% }) %>
    </div>
  </main>

  <footer>
    <% include ../partials/footer %>
  </footer>
</body>
</html>
```

9c. Add movies router to `app.js`:

```
var moviesRouter = require('./routes/movies');
.
.
.
app.use('/movies', moviesRouter);
```

## Step 10 - Create a Movie Mongoose Model and a Seeds file

```bash
mkdir models
touch models/movie.js
```

Add the following code to `models/movie.js`:

```javascript
var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  title: { type: String,  required: true },
  genre: { type: String,  required: true },
  year: Number
  },
  { timestamps: true }  // createdAt, updatedAt
);

module.exports = mongoose.model('Movie', MovieSchema);
```

Create the seeds file:

```bash
touch seeds.js
```

```javascript
var mongoose = require('mongoose');
var Movie = require('./models/movie');

mongoose.connect('mongodb://localhost/express-movies');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('removing old movies...');
Movie.remove({})
.then(function() {
  console.log('old movies removed');
  console.log('creating some new movies...');
  var starWars     = new Movie({ title: 'Star Wars',     genre: 'Science Fiction', year: 1977 });
  var groundhogDay = new Movie({ title: 'Groundhog Day', genre: 'Comedy', year: 1993 });
  var terminator   = new Movie({ title: 'Terminator',    genre: 'Science Fiction', year: 1986 });
  return Movie.create([starWars, groundhogDay, terminator]);
})
.then(function(savedMovies) {
  console.log('Just saved', savedMovies.length, 'movies.');
  return Movie.find({});
})
.then(function(allMovies) {
  console.log('Printing all movies:');
  allMovies.forEach(function(movie) {
    console.log(movie);
  });
  quit();
});
```

## Step 11 - Use Mongoose Movie Model in INDEX route

Make the following changes to `routes/movies.js`:

```javascript
var Movie = require('../models/movie');
.
.
.
// INDEX
router.get('/', function(req, res, next) {
  Movie.find({})
  .then(function(movies) {
    res.render('movies/index', { movies: movies });
  });
});
```

## Step 12 - Deploy to Heroku

12a. Create an Heroku Account

12b. Install the Heroku Toolbelt onto your computer:

[Heroku Toolbelt](https://toolbelt.heroku.com/)

12c. Configure this project for Heroku Deployment

```bash
heroku create
git remote -v     # Displays the newly creates Git remotes for Heroku
```

12d. Deploy project by Git pushing to Heroku

```bash
git push heroku master

# After that completes run:
heroku ps

# To investigate errors run:
heroku logs
```

12e. Add MongoLab to Project

```bash
heroku addons:create mongolab:sandbox
```

The above command will automatically set a heroku environment variable. To see the value, just run:

```bash
heroku config
```

Edit `app.js` and `seeds.js` and replace the existing DB connection code with the following:

```javascript
// Connect to database
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/express-movies');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});
```

Git commit the change and push to heroku:

```bash
git add -A
git commit -m "Updated DB connection code to use MongoLab when in Production"
git push heroku master
heroku ps
heroku open
```

Run the seeds file on the Heroku dyno:

```bash
heroku run node seeds.js
```

Test it out

```bash
heroku ps
heroku open
```
