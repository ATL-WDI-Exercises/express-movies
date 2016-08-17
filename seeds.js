var mongoose = require('mongoose');
var Movie = require('./models/movie');

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
