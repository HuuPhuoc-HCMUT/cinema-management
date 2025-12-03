const { pool } = require('../db/connection');

class Theater {
  static async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM theater ORDER BY name'
    );
    return rows;
  }

  static async findById(theaterId) {
    const [rows] = await pool.execute(
      'SELECT * FROM theater WHERE theater_id = ?',
      [theaterId]
    );
    return rows[0];
  }

  static async create(theaterData) {
    const { name, location, district, image_url } = theaterData;
    const [result] = await pool.execute(
      'INSERT INTO theater (name, location, district, image_url) VALUES (?, ?, ?, ?)',
      [name, location, district, image_url]
    );
    return result.insertId;
  }

  static async update(theaterId, theaterData) {
    const fields = [];
    const params = [];

    Object.keys(theaterData).forEach(key => {
      if (theaterData[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(theaterData[key]);
      }
    });

    if (fields.length === 0) return false;

    params.push(theaterId);
    const query = `UPDATE theater SET ${fields.join(', ')} WHERE theater_id = ?`;

    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
  }

  static async delete(theaterId) {
    const [result] = await pool.execute(
      'DELETE FROM theater WHERE theater_id = ?',
      [theaterId]
    );
    return result.affectedRows > 0;
  }

  static async getAuditoriums(theaterId) {
    const [rows] = await pool.execute(
      'SELECT * FROM auditorium WHERE theater_id = ? ORDER BY screen_number',
      [theaterId]
    );
    return rows;
  }
}

class Auditorium {
  static async create(auditoriumData) {
    const { theater_id, screen_number, seat_capacity, seat_map, formats } = auditoriumData;
    const [result] = await pool.execute(
      'INSERT INTO auditorium (theater_id, screen_number, seat_capacity, seat_map, formats) VALUES (?, ?, ?, ?, ?)',
      [theater_id, screen_number, seat_capacity, seat_map, formats]
    );
    return { theater_id, screen_number };
  }

  static async findById(theaterId, screenNumber) {
    const [rows] = await pool.execute(
      'SELECT * FROM auditorium WHERE theater_id = ? AND screen_number = ?',
      [theaterId, screenNumber]
    );
    return rows[0];
  }

  static async update(theaterId, screenNumber, auditoriumData) {
    const fields = [];
    const params = [];

    Object.keys(auditoriumData).forEach(key => {
      if (auditoriumData[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(auditoriumData[key]);
      }
    });

    if (fields.length === 0) return false;

    params.push(theaterId, screenNumber);
    const query = `UPDATE auditorium SET ${fields.join(', ')} WHERE theater_id = ? AND screen_number = ?`;

    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
  }
}

module.exports = { Theater, Auditorium };
