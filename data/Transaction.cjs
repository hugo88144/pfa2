const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  recurring: { type: Boolean, required: true },
  avatar: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

// Export the Transaction model
const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction; // Make sure to export the model
