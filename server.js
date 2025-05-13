const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Bill = require("./models/Bill");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Routes

function calculatePrice(units) {
  if (units <= 400) return units * 4.80;
  else if (units <= 500) return units * 6.45;
  else if (units <= 600) return units * 8.55;
  else if (units <= 800) return units * 9.65;
  else return units * 10.00; // Assume over 800 units at ₹10
}

app.post("/api/bill", async (req, res) => {
  const { previous, current } = req.body;
  const units = current - previous;
  const price = calculatePrice(units);

  const bill = new Bill({ previous, current, units, price });
  await bill.save();
  res.json(bill);
});


app.get("/api/bill", async (req, res) => {
  const bills = await Bill.find().sort({ date: -1 });
  res.json(bills);
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
