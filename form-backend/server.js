const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configurazione del database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'testAimage',
    database: 'startech'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connesso a MySQL');
});

// Route per registrare i dati
app.post('/register', (req, res) => {
    const { firstName, lastName, phone, email, selectedCourses } = req.body;
    const query = 'INSERT INTO utenti (first_name, last_name, phone, email, selected_courses) VALUES (?, ?, ?, ?, ?)';
    const values = [firstName, lastName, phone, email, selectedCourses.join(', ')];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Errore durante l\'inserimento:', error);
            res.status(500).send('Errore durante la registrazione');
        } else {
            res.status(200).send('Registrazione avvenuta con successo');
        }
    });
});

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
