require("dotenv").config({ path: `${__dirname}/.env` });

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Transaction = require("./data/Transaction.cjs");

const Pot = require("./data/Pot.cjs");
const Budget = require("./data/Budget.cjs");

const app = express();
const port = 9000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// User model
const User = mongoose.model("User", userSchema);

// Middleware for CORS and parsing JSON
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json()); // To parse JSON request bodies

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// User login
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    // Return the token as part of the response
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

// User registration
app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Optionally generate a token for the new user
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    // Respond with success message and token
    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.error("Token verification error:", err); // Added for debugging
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = user; // Store user data from token
    next();
  });
}

// Example protected route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! This is protected data.` });
});

// Endpoint to handle new transactions
app.post("/api/transactions", authenticateToken, async (req, res) => {
  const newTransaction = new Transaction({
    ...req.body,
    userId: req.user.userId, // Ensure this is correct
  });
  try {
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ error: "Failed to save transaction" });
  }
});

// Endpoint to handle new pots
app.post("/api/pots", authenticateToken, async (req, res) => {
  const newPot = new Pot({
    ...req.body,
    userId: req.user.userId, // Ensure this is correct
  });
  try {
    const savedPot = await newPot.save();
    res.status(201).json(savedPot);
  } catch (error) {
    console.error("Error saving pot:", error);
    res.status(500).json({ error: "Failed to save pot" });
  }
});
// Endpoint to handle new Budget
app.post("/api/budgets", authenticateToken, async (req, res) => {
  console.log("Received new budget data:", req.body);

  const newBudget = new Budget({
    ...req.body,
    userId: req.user.userId, // Ensure this is correctly setting the user ID from the token
  });

  try {
    // Try to save the budget to the database
    const savedBudget = await newBudget.save();
    console.log("Budget saved successfully:", savedBudget);
    res.status(201).json(savedBudget);
  } catch (error) {
    // Log the error in detail
    console.error("Error saving budget:", error.message);
    res.status(500).json({ error: "Failed to save budget" });
  }
});

// DELETE endpoint to remove a pot by ID
app.delete("/api/pots/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to delete the pot
    const deletedPot = await Pot.findByIdAndDelete(id);
    // Check if the pot was found and deleted
    if (!deletedPot) {
      return res.status(404).json({ message: "Pot not found" });
    }
    res.status(200).json({ message: "Pot deleted successfully", deletedPot });
  } catch (error) {
    console.error("Error deleting pot:", error);
    res.status(500).json({ error: "Failed to delete pot" });
  }
});
//Delete endpoint to remove to pot by ID
app.delete("/api/budgets/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Error deleting Budget:", error);
    res.status(500).json({ error: "Failed to delete Budget" });
  }
});

// PUT endpoint to update a pot by ID

// PUT endpoint to update a pot by ID
app.put("/api/pots/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Attempt to find the pot by ID and update it
    const updatedPot = await Pot.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Validate the updated data against the schema
    });

    // Check if the pot was found and updated
    if (!updatedPot) {
      return res.status(404).json({ message: "Pot not found" });
    }
    res.status(200).json(updatedPot); // Respond with the updated pot
  } catch (error) {
    console.error("Error updating pot:", error);
    res.status(500).json({ error: "Failed to update pot" });
  }
});

app.put("/api/budgets/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // This should contain the fields you want to update

  try {
    const updatedBudget = await Budget.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the updated fields
    });

    if (!updatedBudget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json(updatedBudget);
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ error: "Failed to update budget" });
  }
});

// GET endpoint to retrieve all transactions
app.get("/api/transactions", authenticateToken, async (req, res) => {
  // Ensure authentication is applied
  try {
    const transactions = await Transaction.find({ userId: req.user.userId }); // Fetch transactions for the authenticated user
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// Endpoint to handle API responses
app.get("/api", authenticateToken, async (req, res) => {
  try {
    // Fetch user-specific transactions
    const transactions = await Transaction.find({ userId: req.user.userId });
    const pots = await Pot.find({ userId: req.user.userId });
    const budgets = await Budget.find({ userId: req.user.userId });

    const response = {
      balance: {}, // Calculate or fetch user balance as needed
      transactions: transactions,
      budgets: budgets, // Fetch user budgets if necessary
      pots: pots, // Fetch user pots if necessary
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
