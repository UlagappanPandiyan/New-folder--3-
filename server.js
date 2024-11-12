const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ok',
  password: 'Joker123#',
  port: 5432,
});

// API to add a student
app.post('/add-student', async (req, res) => {
  const { student_name, dept_id, year_of_enrollment, email } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Students (student_name, dept_id, year_of_enrollment, email) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [student_name, dept_id, year_of_enrollment, email]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding student' });
  }
});

// API to get all students
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM Students`);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching students' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
