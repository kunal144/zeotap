// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

app.use(cors());

// Middleware to parse JSON payloads
app.use(bodyParser.json());

// Optionally serve static files from a "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Import the ingest route and mount it under /api/ingest
const ingestRoute = require("./routes/ingest");
app.use("/api/ingest", ingestRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
