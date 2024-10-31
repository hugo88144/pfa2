const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  maximum: { type: Number, required: true },
  theme: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Ensure userId is present
});

const Budget = mongoose.model("Budget", budgetSchema);
module.exports = Budget;
