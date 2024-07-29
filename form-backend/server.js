const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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

// Chiave segreta per JWT
const JWT_SECRET = 'testAimage';
const JWT_EXPIRATION = '1h'; // Durata del token di accesso
const JWT_REFRESH_EXPIRATION = '7d'; // Durata del token di refresh

// Funzione per generare un token JWT
const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

// Funzione per generare un token di refresh JWT
const generateRefreshToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
};

// Middleware per verificare il token
const authenticateToken = (req, res, next) => {
    console.log('Entering authenticateToken middleware');
    const authHeader = req.headers['authorization'];
    console.log('authHeader:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    console.log('token:', token); // Assicurati che ci sia console.log

    if (!token) {
        console.log('No token found');
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        console.log('Token verified, user:', user);
        next();
    });
};

// Endpoint di login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Username:', username);
    console.log('Password:', password);

    if (username === 'testAimage' && password === 'testAimage') {
        const user = { username };
        const accessToken = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        
        res.json({ accessToken, refreshToken });
    } else {
        res.status(401).send('Credenziali non valide');
    }
});



// Endpoint per registrare e/o aggiornare i dati
app.post('/register', (req, res) => {
    const { firstName, lastName, phone, email, selectedCourses } = req.body;

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
        res.status(200).send('Registrazione o aggiornamento avvenuto con successo');
    });
});

// Endpoint per il refresh del token
app.post('/token', (req, res) => {
    const { refreshToken } = req.body;
    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const newAccessToken = generateToken({ username: user.username });
        res.json({ accessToken: newAccessToken });
    });
});


// Endpoint protetto per recuperare i dati
app.get('/data', authenticateToken, (req, res) => {
    const query = 'SELECT * FROM users';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Errore durante il recupero dei dati:', err);
            return res.status(500).send('Errore durante il recupero dei dati');
        }
        res.json(results);
    });
});

// Endpoint per esportare i dati raccolti (protetto da JWT)
app.get('/export', authenticateToken, (req, res) => {
    const query = 'SELECT * FROM users';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Errore durante l\'esportazione dei dati:', err);
            return res.status(500).send('Errore durante l\'esportazione dei dati');
        }
        
        // Creazione di un file CSV (opzionale)
        const csv = results.map(row => Object.values(row).join(',')).join('\n');
        
        res.header('Content-Type', 'text/csv');
        res.attachment('data.csv');
        res.send(csv);
    });
});

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
