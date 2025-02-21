require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Allow frontend access

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "http://localhost:5000"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "http://localhost:5000"],
      },
    },
  })
);

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;

// Sample data (for GET request response)
const sampleResponse = {
  is_success: true,
  user_id: "Namita_Munjal_27072004",
  email: "namitamunjal27@gmail.com",
  roll_number: "22BCT10082",
  numbers: [], // Default empty array
  alphabets: [],
  highest_alphabet: []
};

// GET endpoint (Returns hardcoded response)
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 200 });
});

// POST endpoint (Processes the input)
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid input format" });
  }

  const numbers = data.filter(item => !isNaN(item)); // Extract numbers
  const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item)); // Extract alphabets

  const highestAlphabet = alphabets.length > 0 ? (() => {
    const sortedAlphabets = alphabets.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    const maxAlphabet = sortedAlphabets[sortedAlphabets.length - 1]; // Get the last (highest) element
    return sortedAlphabets.filter(letter => letter === maxAlphabet); // Return all instances of the highest letter
  })() : [];
  

  res.json({
    is_success: true,
    user_id: "Namita_Munjal_27072004",
    email: "namitamunjal27@gmail.com",
    roll_number: "22BCT10082",
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet
  });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
