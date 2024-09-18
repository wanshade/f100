const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

// Path ke file data JSON
const dataFilePath = path.join(__dirname, 'data.json');
let data = [];

// Load data dari file JSON
try {
    data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
} catch (error) {
    console.error("Error loading data file:", error);
}

// Middleware untuk log semua request
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
});

// Middleware untuk parsing JSON dan CORS
app.use(express.json());
app.use(cors());

// Route untuk informasi API
app.get('/', (req, res) => {
    res.send(`
        <h1>Family 100 API</h1>
        <p>This API was made by Wandaem.</p>
        <h2>Endpoints:</h2>
        <ul>
            <li><strong>GET /api/questions</strong> - Get all questions</li>
            <li><strong>GET /api/questions/random</strong> - Get a random question</li>
        </ul>
    `);
});


// Route untuk mengambil semua pertanyaan
app.get('/api/questions', (req, res) => {
    res.json({
        "status": 200,
        "total": data.length,
        "end_point": "/api/questions",
        "method": "GET",
        "data": data
    });
});


// Route untuk mengambil pertanyaan secara acak
app.get('/api/questions/random', (req, res) => {
    console.log("Received request for /api/questions/random");

    if (data.length === 0) {
        return res.status(404).json({
            "status": 404,
            "end_point": "/api/questions/random",
            "method": "GET",
            "error": 'No questions available'
        });
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    console.log("Random index generated:", randomIndex);

    const randomQuestion = data[randomIndex];

    if (randomQuestion && randomQuestion.pertanyaan && randomQuestion.jawaban && randomQuestion.opsi) {
        res.json({
            "status": 200,
            "end_point": "/api/questions/random",
            "method": "GET",
            "data": {
                "pertanyaan": randomQuestion.pertanyaan,
                "jawaban": randomQuestion.jawaban,
                "opsi": randomQuestion.opsi
            }
        });
    } else {
        console.error("Invalid question data:", randomQuestion);
        res.status(404).json({
            "status": 404,
            "end_point": "/api/questions/random",
            "method": "GET",
            "error": 'Invalid question data'
        });
    }
});

// Route debug
app.get('/api/debug', (req, res) => {
    res.json({
        "status": 200,
        "message": "Debug endpoint is working"
    });
});



// Route untuk menambah pertanyaan
app.post('/api/questions', (req, res) => {
    const { pertanyaan, jawaban, opsi } = req.body;

    // Validasi input
    if (!pertanyaan || !jawaban || !opsi || !Array.isArray(opsi)) {
        return res.status(400).json({
            "status": 400,
            "end_point": "/api/questions",
            "method": "POST",
            "error": "Invalid input. Please provide 'pertanyaan', 'jawaban', and 'opsi' (opsi should be an array)."
        });
    }

    // Tambahkan pertanyaan ke data
    const newQuestion = { pertanyaan, jawaban, opsi };
    data.push(newQuestion);

    // Simpan data kembali ke file JSON
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Error saving data to file:", err);
            return res.status(500).json({
                "status": 500,
                "end_point": "/api/questions",
                "method": "POST",
                "error": "Internal server error while saving data"
            });
        }

        res.status(201).json({
            "status": 201,
            "end_point": "/api/questions",
            "method": "POST",
            "data": newQuestion
        });
    });
});


// Route untuk menghapus pertanyaan berdasarkan teks pertanyaan
app.delete('/api/questions', (req, res) => {
    const { pertanyaan } = req.body;

    if (!pertanyaan) {
        return res.status(400).json({
            "status": 400,
            "end_point": "/api/questions",
            "method": "DELETE",
            "error": 'Missing "pertanyaan" in request body'
        });
    }

    // Temukan index pertanyaan yang sesuai
    const questionIndex = data.findIndex(q => q.pertanyaan === pertanyaan);

    if (questionIndex === -1) {
        return res.status(404).json({
            "status": 404,
            "end_point": "/api/questions",
            "method": "DELETE",
            "error": 'Question not found'
        });
    }

    // Hapus pertanyaan dari array
    const removedQuestion = data.splice(questionIndex, 1)[0];

    // Simpan data yang sudah diupdate ke file JSON
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error("Error saving data to file:", err);
            return res.status(500).json({
                "status": 500,
                "end_point": "/api/questions",
                "method": "DELETE",
                "error": 'Internal server error while saving data'
            });
        }

        res.json({
            "status": 200,
            "end_point": "/api/questions",
            "method": "DELETE",
            "data": removedQuestion
        });
    });
});


// Mulai server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
