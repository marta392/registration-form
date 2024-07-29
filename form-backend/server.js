// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

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

// Endpoint di login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifica credenziali (questo è un esempio, usa un metodo sicuro in produzione)
    if (username === 'testAimage' && password === 'testAimage') {
        const user = { username };
        const accessToken = generateToken(user);
        const refreshToken = generateRefreshToken(user);
        
        res.json({ accessToken, refreshToken });
    } else {
        res.status(401).send('Credenziali non valide');
    }
});

// Middleware di autenticazione
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

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

// Endpoint per recuperare i dati raccolti (protetto da JWT)
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
