const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || 5432,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  ...(process.env.PGPASSWORD && { password: process.env.PGPASSWORD })
});

module.exports = pool;
