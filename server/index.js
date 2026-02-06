const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// communication between frontend and backend
app.use(cors());
app.use(express.json()); // parse recieved json requests

// connecting database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('DB Connection Error:', err));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Issue occured!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));