const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transcribeRoutes = require('./routes/transcribe');
const processRoutes = require('./routes/process');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/transcribe', transcribeRoutes);
app.use('/api/process', processRoutes);

app.listen(PORT, () => {
  console.log(`CourtScribe backend listening on port ${PORT}`);
});
