const express = require('express');
const { body } = require('express-validator');
const showtimeController = require('../controllers/showtimeController');
const { auth, isStaff } = require('../middlewares/auth');
const validate = require('../middlewares/validate');

const router = express.Router();

// Validation rules
const showtimeValidation = [
  body('movie_id').isInt().withMessage('Valid movie ID is required'),
  body('theater_id').isInt().withMessage('Valid theater ID is required'),
  body('screen_number').isInt().withMessage('Valid screen number is required'),
  body('start_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).withMessage('Valid start time is required (HH:MM:SS)'),
  body('end_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/).withMessage('Valid end time is required (HH:MM:SS)'),
  body('date').isISO8601().withMessage('Valid date is required')
];

// Public routes
router.get('/', showtimeController.getAllShowtimes);
router.get('/movie/:movieId', showtimeController.getShowtimesByMovie);
router.get('/theaters', showtimeController.getAllTheaters);
router.get('/:id', showtimeController.getShowtimeById);

// Staff routes
router.post('/', auth, isStaff, showtimeValidation, validate, showtimeController.createShowtime);
router.put('/:id', auth, isStaff, showtimeController.updateShowtime);
router.delete('/:id', auth, isStaff, showtimeController.deleteShowtime);

module.exports = router;
