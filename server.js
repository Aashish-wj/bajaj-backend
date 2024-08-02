const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors = require("cors");

// Allow all origins by default
app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// POST endpoint
app.post("/bfhl", (req, res) => {
  console.log(req.body);
  const data = req.body.data;
  console.log(data);

  // To check whether given input is of array format
  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, error: "Invalid data format" });
  }

  // Separate numbers and alphabets
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));

  // Convert all characters to lowercase for uniform comparison
  const normalizedAlphabets = alphabets.map((c) => c.toLowerCase());

  // Find the highest alphabet (lexicographically)
  const highestAlphabet =
    normalizedAlphabets.length > 0
      ? [Math.max(...normalizedAlphabets.map((c) => c.charCodeAt(0)))]
      : [];

  // Prepare the response
  const response = {
    is_success: true,
    user_id: "aashishkumar_07072003",
    email: "aashishkumar.wj101@gmail.com",
    roll_number: "RA2111028010057",
    numbers,
    alphabets,
    highest_alphabet:
      highestAlphabet.length > 0
        ? [String.fromCharCode(...highestAlphabet)]
        : [],
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
