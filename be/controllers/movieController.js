const Movie = require('../models/Movie');

//get all movies
exports.getAllMovies = async (req, res, next) => {
  try {
    const { status, genre, search } = req.query;
    
    const movies = await Movie.getAll({ status, genre, search });
    console.log(`Retrieved ${movies.length} movies with filters - Status: ${status}, Genre: ${genre}, Search: ${search}`);

    res.json({
      count: movies.length,
      movies
    });
  } catch (error) {
    next(error);
  }
};

//get movie by ID
exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      console.log(`Movie with ID ${req.params.id} not found`);
      return res.status(404).json({ error: 'Movie not found' });
    }

    console.log(`Movie with ID ${req.params.id} retrieved`);
    res.json({ movie });
  } catch (error) {
    next(error);
  }
};

//ongoing movies
exports.getOngoing = async (req, res, next) => {
  try {
    const movies = await Movie.getOngoing();
    
    console.log(`Retrieved ${movies.length} ongoing movies`);
    res.json({
      count: movies.length,
      movies
    });
  } catch (error) {
    next(error);
  }
};

//create movie (Staff only)
exports.createMovie = async (req, res, next) => {
  try {
    const movieData = {
      ...req.body,
      user_id: req.user.userId
    };

    const movieId = await Movie.create(movieData);

    const movie = await Movie.findById(movieId);

    console.log(`Movie with ID ${movieId} created successfully`);

    res.status(201).json({
      message: 'Movie created successfully',
      movie
    });
  } catch (error) {
    next(error);
  }
};

//update movie (Staff only)
exports.updateMovie = async (req, res, next) => {
  try {
    const movieData = req.body;

    const updated = await Movie.update(req.params.id, movieData);

    if (!updated) {
      console.log(`Movie with ID ${req.params.id} not found for update`);
      return res.status(404).json({ error: 'Movie not found' });
    }

    const movie = await Movie.findById(req.params.id);
    console.log(`Movie with ID ${req.params.id} updated successfully`);

    res.json({
      message: 'Movie updated successfully',
      movie
    });
  } catch (error) {
    next(error);
  }
};

//delete movie (Staff only)
exports.deleteMovie = async (req, res, next) => {
  try {
    const deleted = await Movie.delete(req.params.id);

    if (!deleted) {
      console.log(`Movie with ID ${req.params.id} not found for deletion`);
      return res.status(404).json({ error: 'Movie not found' });
    }

    console.log(`Movie with ID ${req.params.id} deleted successfully`);
    res.json({
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
