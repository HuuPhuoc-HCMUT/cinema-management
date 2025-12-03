const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  let connection;
  
  try {
    // Connect to MySQL without specifying database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      multipleStatements: true
    });

    console.log('Connected to MySQL server');

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Use the specified database
    const dbName = process.env.DB_NAME || 'cinema_db';
    await connection.query(`USE ${dbName}`);
    console.log(`Using database: ${dbName}`);
    
    console.log('Executing database schema...');
    
    // Remove CREATE DATABASE and USE statements from schema
    const schemaWithoutDbCreation = schema
      .replace(/CREATE DATABASE.*?;/gs, '')
      .replace(/USE.*?;/g, '');
    
    await connection.query(schemaWithoutDbCreation);

    console.log('Database initialized successfully!');
    console.log('Database name:', dbName);
    
  } catch (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run initialization
initializeDatabase();
