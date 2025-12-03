const Seat = require('../models/Seat');

//get seats by auditorium
exports.getSeatsByAuditorium = async (req, res, next) => {
  try {
    const { theater_id, screen_number } = req.query;

    if (!theater_id || !screen_number) {
      console.log('theater_id and screen_number are required');
      return res.status(400).json({ error: 'theater_id and screen_number are required' });
    }

    const seats = await Seat.getByAuditorium(theater_id, screen_number);

    console.log(`Retrieved ${seats.length} seats for theater_id ${theater_id} and screen_number ${screen_number}`);
    res.json({
      count: seats.length,
      seats
    });
  } catch (error) {
    next(error);
  }
};

//get booked seats for showtime
exports.getBookedSeats = async (req, res, next) => {
  try {
    const { theater_id, screen_number, start_time, end_time, date } = req.query;

    if (!theater_id || !screen_number || !start_time || !end_time || !date) {
      console.log('Missing required showtime composite key fields');
      return res.status(400).json({ 
        error: 'Missing required showtime composite key fields' 
      });
    }

    const bookedSeats = await Seat.getBookedSeats(
      theater_id,
      screen_number,
      start_time,
      end_time,
      date
    );
    console.log(`Retrieved ${bookedSeats.length} booked seats for showtime in theater_id ${theater_id}, screen_number ${screen_number} on ${date} from ${start_time} to ${end_time}`);
    
    res.json({
      count: bookedSeats.length,
      bookedSeats
    });
  } catch (error) {
    next(error);
  }
};
