const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Route per registrare o aggiornare i dati
app.post('/register', (req, res) => {
    const { firstName, lastName, phone, email, selectedCourses } = req.body;

    // Log per debug
    console.log('Dati ricevuti:', req.body);

    if (!firstName || !lastName || !phone || !email || !selectedCourses) {
        return res.status(400).send('Tutti i campi sono obbligatori');
    }

    const query = `
        INSERT INTO users (first_name, last_name, phone, email, selected_courses)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            selected_courses = VALUES(selected_courses)
    `;
    const values = [firstName, lastName, phone, email, selectedCourses.join(', ')];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Errore durante l\'inserimento o l\'aggiornamento:', err);
            return res.status(500).send('Errore durante la registrazione');
        }
        console.log('Risultato della query:', results);
        res.status(200).send('Registrazione o aggiornamento avvenuto con successo');
    });
});

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
