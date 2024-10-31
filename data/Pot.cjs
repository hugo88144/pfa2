const mongoose = require("mongoose");

const potSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Pot name (e.g., "Rainy Day Fund")
  theme: { type: String, required: true }, // Theme color (e.g., hex code or color name)
  target: { type: Number, required: true }, // Target amount to save
  total: { type: Number, default: 0 }, // Current saved amount (default 0)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
});

// Export the Pot model
const Pot = mongoose.model("Pot", potSchema);
module.exports = Pot;
